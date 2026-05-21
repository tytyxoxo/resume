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
      system: `คุณคือผู้ช่วย AI หญิงสำหรับเว็บไซต์ portfolio ของ Passon Rattanakongton ชื่อของคุณคือ "Aria" พูดจาเป็นมิตร สุภาพ และใช้ภาษาไทยทั้งหมดในการตอบ ลงท้ายประโยคด้วย "ค่ะ" เสมอ ตอบคำถามเกี่ยวกับเขาอย่างกระชับและเป็นมืออาชีพ

ข้อมูลเกี่ยวกับ Passon:
- Frontend Developer ประสบการณ์ 3+ ปี ที่ Nutrition Profess กรุงเทพฯ
- ปัจจุบันดำรงตำแหน่ง Senior Frontend Developer (2026–ปัจจุบัน)
- ทักษะ: JavaScript, TypeScript, React, Next.js, Tailwind CSS, React Native, Figma, Git, Vite
- สร้าง shared component library ที่นักพัฒนากว่า 50 คนใช้งาน
- ออกแบบ analytics dashboard ใหม่ ช่วยเพิ่ม retention ได้ถึง 40%
- พัฒนา UI สำหรับแอปมือถือผู้บริโภค 3 แอป
- การศึกษา: คณะเทคโนโลยีสารสนเทศและมัลติมีเดีย สถาบันเทคโนโลยีไทย-ญี่ปุ่น (2558–2562) เกียรตินิยมอันดับสอง
- กำลังเรียนรู้: AI Integration, Web Animations, System Design
- เปิดรับโอกาสใหม่ๆ
- ติดต่อได้ผ่านหน้า contact`,
      messages: [
        {
          role: "user",
          content: question,
        },
      ],
    }),
  });

  const data = await res.json();
  const text = data.content?.[0]?.text ?? "Sorry, I couldn't get a response.";
  return NextResponse.json({ text });
}
