export const APP_TITLE = 'Query GPT'
export const APP_DESCRIPTION =
  'Generate queries by asking questions about your data'

export const MAX_COMBINED_LENGTH = 6000

export const LANGUAGE_MODELS = [
  { value: 'gpt-3.5-turbo', label: 'OpenAI GPT-3.5' },
  { value: 'gpt-4', label: 'OpenAI GPT-4' }
]

export const QUERY_LANGUAGES = [
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
  { value: 'Databricks', label: 'Databricks' },
  { value: 'BigQuery', label: 'BigQuery' },
  { value: 'Snowflake', label: 'Snowflake' }
]
