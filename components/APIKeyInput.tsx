interface Props {
  apiKey: string
  onChange: (apiKey: string) => void
}

export const APIKeyInput: React.FC<Props> = ({ apiKey, onChange }) => {
  return (
    <input
      className='txt-input text-sm'
      type='password'
      placeholder='API Key'
      value={apiKey}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
