import { OpenAIModel } from '@/types/types'
import { FC } from 'react'

import { LANGUAGE_MODELS } from '@/lib/constants'

interface Props {
  model: OpenAIModel
  onChange: (model: OpenAIModel) => void
}

export const ModelSelect: FC<Props> = ({ model, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as OpenAIModel)
  }

  return (
    <select className='txt-input text-sm' value={model} onChange={handleChange}>
      {LANGUAGE_MODELS.sort((a, b) => a.label.localeCompare(b.label)).map(
        (model) => (
          <option key={model.value} value={model.value}>
            {model.label}
          </option>
        )
      )}
    </select>
  )
}
