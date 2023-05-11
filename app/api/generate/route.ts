import { GenerateBody } from '@/types/types'
import { OpenAIStream } from '@/lib/openai'

export const runtime = 'edge'

export async function POST (req: Request): Promise<Response> {
  try {
    const { queryLanguage, dataSchema, question, model, apiKey } =
      (await req.json()) as GenerateBody

    const stream = await OpenAIStream(
      queryLanguage,
      dataSchema,
      question,
      model,
      apiKey
    )

    return new Response(stream)
  } catch (error) {
    console.error(error)
    return new Response('Error', { status: 500 })
  }
}
