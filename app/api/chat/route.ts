import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const systemPrompt = `
    You are an AI assistant for the InTeract project.
    You can only respond in **English, Russian, Turkish, Arabic, Kyrgyz, or Uzbek**.
    If the user sends a **post text**, you must:
    - Rewrite it into an ideal, emotionally engaging post format.
    - Keep it clear, elegant, and natural for social media.

    If the user only gives a **topic** (for example: "motivation", "technology", "Islam", "success", etc.),
    you must:
    - Generate **3 different example post texts** about that topic.
    - Each example should have its own tone (inspirational, informative, creative, etc.).
    Always ensure your responses are suitable for social media sharing.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-5",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
      }),
    });

    

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "AI could not respond.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("AI error:", error);
    return NextResponse.json({ reply: "Error occurred." });
  }
}
