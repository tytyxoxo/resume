import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { question } = await req.json();

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 512,
      messages: [
        {
          role: "user",
          content: `You are an AI assistant for Passon Rattanakongton's resume website. Answer questions about him concisely and professionally.

About Passon:
- Frontend Developer with 3+ years of experience at Nutrition Profess, Bangkok
- Currently Senior Frontend Developer (2026–Present)
- Skills: JavaScript, TypeScript, React, Next.js, Tailwind CSS, React Native, Figma, Git, Vite
- Built a shared component library used by 50+ developers
- Redesigned main analytics dashboard, improving retention by 40%
- Developed UI for 3 consumer mobile apps
- Education: Faculty of Information Technology and Multimedia, Thai-Nichi Institute of Technology (2015–2019), Second Class Honours
- Currently learning: AI Integration, Web Animations, System Design
- Open to new opportunities
- Contact via the contact page

Question: ${question}`,
        },
      ],
    }),
  });

  const data = await res.json();
  const text = data.content?.[0]?.text ?? "Sorry, I couldn't get a response.";
  return NextResponse.json({ text });
}
