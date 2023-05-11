import endent from 'endent'
import {
  createParser,
  ParsedEvent,
  ReconnectInterval
} from 'eventsource-parser'

const createPrompt = (
  queryLanguage: string,
  dataSchema: string,
  question: string
) => {
  return endent`
  You are a world class software engineer specializing in ${queryLanguage}.
  Given the "Data schema:" and "Question:", return a valid ${queryLanguage} query. Do not include \`\`\`.

  Data schema:
  ${dataSchema}

  Question:
  ${question}

  Output:
  ${queryLanguage} code (no \`\`\`):
  `
}

export const OpenAIStream = async (
  queryLanguage: string,
  dataSchema: string,
  question: string,
  model: string,
  key: string
) => {
  const prompt = createPrompt(queryLanguage, dataSchema, question)
  console.log('--- System prompt ---', prompt)

  const system = { role: 'system', content: prompt }

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key || process.env.OPENAI_API_KEY}`
    },
    method: 'POST',
    body: JSON.stringify({
      model,
      messages: [system],
      temperature: 0,
      stream: true
    })
  })

  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  if (res.status !== 200) {
    const statusText = res.statusText
    const result = await res.body?.getReader().read()
    throw new Error(
      `OpenAI API returned an error: ${
        decoder.decode(result?.value) || statusText
      }`
    )
  }

  const stream = new ReadableStream({
    async start (controller) {
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === 'event') {
          const data = event.data

          if (data === '[DONE]') {
            controller.close()
            return
          }

          try {
            const json = JSON.parse(data)
            const text = json.choices[0].delta.content
            const queue = encoder.encode(text)
            controller.enqueue(queue)
          } catch (e) {
            controller.error(e)
          }
        }
      }

      const parser = createParser(onParse)

      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk))
      }
    }
  })

  return stream
}
