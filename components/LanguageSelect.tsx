import type { FC } from 'react'

import { QUERY_LANGUAGES } from '@/lib/constants'

interface Props {
  language: string
  onChange: (language: string) => void
}

export const LanguageSelect: FC<Props> = ({ language, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value)
  }

  return (
    <select className='txt-input' value={language} onChange={handleChange}>
      {QUERY_LANGUAGES.sort((a, b) => a.label.localeCompare(b.label)).map(
        (language) => (
          <option key={language.value} value={language.value}>
            {language.label}
          </option>
        )
      )}
    </select>
  )
}
