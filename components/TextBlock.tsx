interface Props {
  text: string
  editable?: boolean
  onChange?: (value: string) => void
}

export const TextBlock: React.FC<Props> = ({
  text,
  editable = false,
  onChange = () => {}
}) => {
  return (
    <div className='relative'>
      <textarea
        className='py-1.5 txt-input'
        style={{ resize: 'none' }}
        value={text}
        rows={2}
        onChange={(e) => onChange(e.target.value)}
        disabled={!editable}
      />
    </div>
  )
}
