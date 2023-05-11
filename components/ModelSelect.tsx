import { OpenAIModel } from '@/types/types'
import { FC } from 'react'

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
      className='sm:text-sm sm:leading-6 relative block w-full rounded-md border-0 bg-transparent py-1.5 text-gray-900 dark:text-gray-100 ring-1 ring-inset ring-gray-300 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-pink-600'
      value={model}
      onChange={handleChange}
    >
      <option value='gpt-3.5-turbo'>GPT-3.5</option>
      <option value='gpt-4'>GPT-4</option>
    </select>
  )
}
