import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

// Kept concise to minimize token usage on free tier
const SYSTEM_PROMPT = `Kamu adalah asisten AI portofolio Ginanjar Saiful Ihsan, Frontend Developer Indonesia.
Jawab ramah, ringkas, pakai emoji seperlunya. Jawab sesuai bahasa penanya (ID/EN).

DATA:
- Role: Frontend Web Developer
- Stack: React, Next.js, Vue.js, Nuxt.js, TypeScript, Tailwind CSS, Ant Design, Node.js, PostgreSQL
- Kerja: PT DUIT INVESTECH (Jan 2023-skrg), Self Employed (Agu 2022-skrg)
- Proyek: HANUDNAS (Vue2/Nuxt2), SMARTFARMING (Next.js), NAGITEC (Next.js), Kalaras Prima Landing (Next.js), GSN Landing (Next.js), PERJADIN/Bank Tanah (Next.js), C-Art marketplace (React/Node/Socket.io) [deprecated], Rent-me dating app (Vue/Node) [deprecated]
- Kontak: LinkedIn linkedin.com/in/ginanjarsaifulihsan | GitHub github.com/kibuelll | GitLab gitlab.com/kibuelll | IG instagram.com/kmportant | X x.com/kibuellyoi34
- Untuk kolaborasi: form kontak di website atau LinkedIn

Jika tidak tahu, sarankan hubungi langsung. Jangan mengarang info.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response("Invalid request body", { status: 400 });
    }

    // async function checkAvailableModels() {
    //   const apiKey = process.env.GEMINI_API_KEY; // Pastikan API Key Anda sudah diatur

    //   try {
    //     const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    //     const data = await response.json();

    //     // Ini akan menampilkan semua model yang didukung di terminal Anda
    //     console.log("Model yang tersedia:");
    //     data.models.forEach((m: any) => {
    //       console.log(`- Nama: ${m.name.replace('models/', '')} | Method: ${m.supportedGenerationMethods.join(', ')}`);
    //     });
    //   } catch (error) {
    //     console.error("Gagal mengambil daftar model:", error);
    //   }
    // }

    // checkAvailableModels();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash", // Higher RPM on free tier (15 RPM) compared to 2.0 lite
      systemInstruction: SYSTEM_PROMPT,
    });

    // Convert message history to Gemini format.
    // Gemini requires: history must start with role "user", and use "model" (not "assistant").
    const allHistory = messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Drop leading "model" messages (e.g. the initial greeting) — Gemini disallows this
    const firstUserIdx = allHistory.findIndex((m: { role: string }) => m.role === "user");
    const history = firstUserIdx >= 0 ? allHistory.slice(firstUserIdx) : [];

    const chat = model.startChat({ history });
    const lastMessage = messages[messages.length - 1].content;

    // Stream the response
    const result = await chat.sendMessageStream(lastMessage);

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) {
            controller.enqueue(new TextEncoder().encode(text));
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

    // Handle rate limit (429) gracefully
    if (error?.status === 429) {
      return new Response(
        "Maaf, asisten AI sedang sibuk karena terlalu banyak permintaan. Silakan coba lagi dalam beberapa detik ya! 🙏",
        { status: 429 }
      );
    }

    return new Response("Internal server error", { status: 500 });
  }
}

