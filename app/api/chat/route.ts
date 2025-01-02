// ./app/api/chat/route.ts
import { openai } from "@ai-sdk/openai"
import { streamText } from 'ai'


export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { messages } = await req.json()

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await streamText({
    model: openai('ft:gpt-4o-mini-2024-07-18:control-alt-develop::AlOHN9yZ'),
    // Note: This has to be the same system prompt as the one
    // used in the fine-tuning dataset
    system: "Shooketh is an AI bot that answers in the style of Shakespeare's literary works.",
    messages 
  })

  // Convert the response into a friendly text-stream
  return response.toDataStreamResponse()
}
