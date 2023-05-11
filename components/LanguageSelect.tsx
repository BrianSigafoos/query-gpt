import type { FC } from 'react'

interface Props {
  language: string
  onChange: (language: string) => void
}

export const LanguageSelect: FC<Props> = ({ language, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value)
  }

  return (
    <select
      className='w-full rounded-md bg-transparent px-4 py-2 text-white'
      value={language}
      onChange={handleChange}
    >
      {languages
        .sort((a, b) => a.label.localeCompare(b.label))
        .map((language) => (
          <option key={language.value} value={language.value}>
            {language.label}
          </option>
        ))}
    </select>
  )
}

const languages = [
  { value: 'SQL', label: 'SQL' },
  { value: 'MySQL', label: 'MySQL' },
  { value: 'PostgreSQL', label: 'PostgreSQL' },
  { value: 'Elasticsearch', label: 'Elasticsearch' },
  { value: 'GraphQL', label: 'GraphQL' },
  { value: 'JSON:API', label: 'JSON:API' },
  { value: 'REST API curl', label: 'REST API curl' },
  { value: 'Redis', label: 'Redis' },
  { value: 'MongoDB', label: 'MongoDB' },
  { value: 'Cassandra', label: 'Cassandra' },
  { value: 'DynamoDB', label: 'DynamoDB' },
]
