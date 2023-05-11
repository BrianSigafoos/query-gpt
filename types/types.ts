export type OpenAIModel = 'gpt-3.5-turbo' | 'gpt-4'

export interface GenerateBody {
  queryLanguage: string
  querySchema: string
  question: string
  model: OpenAIModel
  apiKey: string
}
