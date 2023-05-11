interface Props {
  apiKey: string
  onChange: (apiKey: string) => void
}

export const APIKeyInput: React.FC<Props> = ({ apiKey, onChange }) => {
  return (
    <input
      className='sm:text-sm sm:leading-6 block w-full rounded-md border-0 bg-transparent py-1.5 text-gray-900 dark:text-gray-100 ring-1 ring-inset ring-gray-300 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-pink-600'
      type='password'
      placeholder='OpenAI API Key'
      value={apiKey}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
