import { NextResponse } from "next/server";

export const runtime = "edge";

import axios from "axios";

export async function POST(req: Request) {
  console.log("request come");
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that generates fun, safe, and engaging questions.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    const message =
      response.data.choices?.[0]?.message?.content ?? "No suggestion generated";

    return NextResponse.json({ suggestions: message }); // ✅ plain text stream
  } catch (error) {
    //console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Stream response with Vercel AI SDK
// const result = await streamText({
//   model: openai.chat("gpt-4o-mini"),
//   messages: [
//     {
//       role: "system",
//       content:
//         "You are a helpful assistant that generates fun, safe, and engaging questions.",
//     },
//     { role: "user", content: prompt },
//   ],
// });
//console.log(result.toTextStreamResponse());
