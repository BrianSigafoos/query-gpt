interface Props {
  apiKey: string
  onChange: (apiKey: string) => void
}

export const APIKeyInput: React.FC<Props> = ({ apiKey, onChange }) => {
  return (
    <input
      className='text-sm txt-input'
      type='password'
      placeholder='OpenAI API Key'
      value={apiKey}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
