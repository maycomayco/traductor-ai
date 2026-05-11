import OpenAI from "openai"
import { TranslationSchema } from "@/lib/schemas"
import type { Translation } from "@/types"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const SYSTEM_PROMPT = `
You are an AI that translates Spanish text into American English.
Return only a valid JSON object with exactly these keys:
- writing
- speaking
- coloquial

No markdown. No explanation. No extra keys.

Examples:
Input: Hola como estan?
Output: {"writing":"Hi, how are you all doing?","speaking":"Hi, how are you guys doing?","coloquial":"Hey, how's everyone doing?"}

Input: Estoy trabajando en una app donde estoy aprendiendo Next.JS para mi proximo proyecto!
Output: {"writing":"I'm working on an application where I'm learning Next.JS for my upcoming project!","speaking":"I'm working on an app where I'm learning Next.JS for my next project!","coloquial":"I'm working on an app where I'm picking up Next.JS for my upcoming project!"}
`.trim()

type Props = {
  query: string
}

export async function createTranslation({ query }: Props) {
  if (query === "") {
    throw new Error("Query is empty")
  }

  try {
    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `Translate this text: ${query}`,
        },
      ],
    })
    const responseContent = response.output_text

    if (!responseContent) {
      throw new Error("Response content is undefined")
    }

    const parsedJson: unknown = JSON.parse(responseContent)
    const parsedResponse = TranslationSchema.safeParse(parsedJson)

    if (!parsedResponse.success) {
      throw new Error("Invalid translation response format")
    }

    const translation: Translation = parsedResponse.data
    return translation
  } catch (error) {
    console.log(error)
    throw new Error("Error creating translations")
  }
}
