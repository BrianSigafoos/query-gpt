import { OpenAIModel } from '@/types/types'
import { FC } from 'react'

const languageModels = [
  { value: 'gpt-3.5-turbo', label: 'OpenAI GPT-3.5' },
  { value: 'gpt-4', label: 'OpenAI GPT-4' }
]

interface Props {
  model: OpenAIModel
  onChange: (model: OpenAIModel) => void
}

export const ModelSelect: FC<Props> = ({ model, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as OpenAIModel)
  }

  return (
    <select
      className='text-sm txt-input'
      value={model}
      onChange={handleChange}
    >
      {languageModels
        .sort((a, b) => a.label.localeCompare(b.label))
        .map((model) => (
          <option key={model.value} value={model.value}>
            {model.label}
          </option>
        ))}
    </select>
  )
}
