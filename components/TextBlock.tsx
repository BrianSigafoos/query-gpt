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
    <textarea
      className='w-full bg-stone-200 dark:bg-stone-900 p-4 text-[15px] text-neutral-200 focus:outline-none'
      style={{ resize: 'none' }}
      value={text}
      onChange={(e) => onChange(e.target.value)}
      disabled={!editable}
    />
  )
}
