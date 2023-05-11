import { githubDark } from '@uiw/codemirror-theme-github'
import CodeMirror from '@uiw/react-codemirror'
import { FC, useEffect, useState } from 'react'

interface Props {
  code: string
  editable?: boolean
  onChange?: (value: string) => void
}

export const CodeBlock: FC<Props> = ({
  code,
  editable = false,
  onChange = () => {}
}) => {
  const [copyText, setCopyText] = useState<string>('Copy')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopyText('Copy')
    }, 2000)

    return () => clearTimeout(timeout)
  }, [copyText])

  return (
    <div className='relative'>
      <button
        className='absolute right-0 top-0 z-10 rounded bg-transparent p-1 text-xs text-white'
        onClick={() => {
          navigator.clipboard.writeText(code)
          setCopyText('Copied!')
        }}
      >
        {copyText}
      </button>

      <CodeMirror
        editable={editable}
        value={code}
        minHeight='100px'
        theme={githubDark}
        onChange={(value) => onChange(value)}
      />
    </div>
  )
}
