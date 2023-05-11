interface Props {
  apiKey: string
  onChange: (apiKey: string) => void
}

export const APIKeyInput: React.FC<Props> = ({ apiKey, onChange }) => {
  return (
    <input
      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6'
      type='password'
      placeholder='OpenAI API Key'
      value={apiKey}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
