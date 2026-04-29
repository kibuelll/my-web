import { NextRequest } from "next/server";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const MODEL = "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `Kamu adalah asisten AI portofolio Ginanjar Saiful Ihsan, Frontend Developer Indonesia.
Jawab ramah, ringkas, pakai emoji seperlunya. Jawab sesuai bahasa penanya (ID/EN).

DATA:
- Role: Frontend Web Developer
- Stack: React, Next.js, Vue.js, Nuxt.js, TypeScript, Tailwind CSS, Ant Design, Node.js, PostgreSQL
- Kerja: PT DUIT INVESTECH (Jan 2023-skrg), Self Employed (Agu 2022-skrg)
- Proyek: HANUDNAS (Vue2/Nuxt2), SMARTFARMING (Next.js), NAGITEC (Next.js), Kalaras Prima Landing (Next.js), GSN Landing (Next.js), PERJADIN/Bank Tanah (Next.js), C-Art marketplace (React/Node/Socket.io) [deprecated], Rent-me dating app (Vue/Node) [deprecated]
- Kontak: LinkedIn linkedin.com/in/ginanjarsaifulihsan | GitHub github.com/kibuelll | GitLab gitlab.com/kibuelll | IG instagram.com/kmportant | X x.com/kibuellyoi34
- Untuk kolaborasi: gunakan form kontak di website atau LinkedIn

Jika tidak tahu, sarankan hubungi langsung via LinkedIn atau IG. Jangan mengarang info.`;

export async function POST(req: NextRequest) {
  if (!GROQ_API_KEY) {
    return new Response("Groq API Key is missing", { status: 500 });
  }

  try {
    const { messages } = await req.json();

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages
        ],
        stream: true,
        max_tokens: 512,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Groq API Error");
    }

    // Proxy the stream from Groq to the client
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) return;

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const message = line.replace(/^data: /, "").trim();
            if (message === "" || message === "[DONE]") continue;

            try {
              const parsed = JSON.parse(message);
              const content = parsed.choices[0]?.delta?.content;
              if (content) {
                controller.enqueue(new TextEncoder().encode(content));
              }
            } catch (e) {
              console.error("Error parsing stream chunk", e);
            }
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });

  } catch (error: any) {
    console.error("Chat API error:", error);
    
    if (error.message?.includes("rate limit")) {
      return new Response(
        "Maaf, kuota API sedang penuh. Silakan coba sesaat lagi! 🙏",
        { status: 429 }
      );
    }

    return new Response("Internal server error", { status: 500 });
  }
}
