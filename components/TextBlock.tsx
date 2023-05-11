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
      className='w-full rounded-md border-0 bg-transparent py-1.5 text-gray-900 dark:text-gray-100 ring-1 ring-inset ring-gray-300 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-pink-600'
      style={{ resize: 'none' }}
      value={text}
      onChange={(e) => onChange(e.target.value)}
      disabled={!editable}
    />
  )
}
