import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ginanjar Saiful Ihsan | Frontend Developer",
    template: "%s | Ginanjar Saiful Ihsan",
  },
  description: "Portofolio Ginanjar Saiful Ihsan, Frontend Developer yang ahli dalam React, Next.js, Vue, dan membangun antarmuka web modern yang responsif dan imersif.",
  keywords: ["Frontend Developer", "Web Developer", "ReactJS", "Next.js", "Vue.js", "Ginanjar Saiful Ihsan", "Portofolio Frontend", "Indonesia", "UI/UX"],
  authors: [{ name: "Ginanjar Saiful Ihsan" }],
  creator: "Ginanjar Saiful Ihsan",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://my-web-gamma-roan.vercel.app/", // Replace with actual domain
    title: "Ginanjar Saiful Ihsan | Frontend Developer",
    description: "Membangun antarmuka modern yang imersif dengan performa tinggi. Jelajahi portofolio dan proyek inovatif saya.",
    siteName: "Ginanjar Saiful Ihsan Portfolio",
    images: [
      {
        url: "/og-image.jpg", // Create this image in public/ folder later for social sharing
        width: 1200,
        height: 630,
        alt: "Ginanjar Saiful Ihsan - Frontend Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ginanjar Saiful Ihsan | Frontend Developer",
    description: "Portofolio Ginanjar Saiful Ihsan, Frontend Developer yang fokus membangun antarmuka web yang interaktif.",
    creator: "@kibuellyoi34",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${outfit.variable} ${jakarta.variable} antialiased`}
    >
      <body className="min-h-screen text-foreground bg-background font-jakarta">{children}</body>
    </html>
  );
}
