'use client'

import { APIKeyInput } from '@/components/APIKeyInput'
import { CodeBlock } from '@/components/CodeBlock'
import { LanguageSelect } from '@/components/LanguageSelect'
import { ModelSelect } from '@/components/ModelSelect'
import { TextBlock } from '@/components/TextBlock'
import { OpenAIModel, GenerateBody } from '@/types/types'
import { useEffect, useState } from 'react'

export default function Home () {
  const [queryLanguage, setQueryLanguage] = useState<string>('GraphQL')
  const [querySchema, setQuerySchema] = useState<string>('')
  const [question, setQuestion] = useState<string>('')
  const [outputCode, setOutputCode] = useState<string>('')
  const [model, setModel] = useState<OpenAIModel>('gpt-3.5-turbo')
  const [loading, setLoading] = useState<boolean>(false)
  const [hasGenerated, setHasGenerated] = useState<boolean>(false)
  const [apiKey, setApiKey] = useState<string>('')

  const handleGenerate = async () => {
    const maxCodeLength = model === 'gpt-3.5-turbo' ? 6000 : 12000

    if (!apiKey) {
      alert('Please enter an API key.')
      return
    }

    if (!querySchema) {
      alert('Please enter a query schema or just describe it.')
      return
    }

    if (!question) {
      alert('Please enter a question.')
      return
    }

    if (question.length > maxCodeLength) {
      alert(
        `Please enter code less than ${maxCodeLength} characters. You are currently at ${question.length} characters.`
      )
      return
    }

    setLoading(true)
    setOutputCode('')

    const controller = new AbortController()

    const body: GenerateBody = {
      queryLanguage,
      querySchema,
      question,
      model,
      apiKey
    }

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      setLoading(false)
      alert('Something went wrong.')
      return
    }

    const data = response.body

    if (data == null) {
      setLoading(false)
      alert('Something went wrong.')
      return
    }

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false
    let code = ''

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)

      code += chunkValue

      setOutputCode((prevCode) => prevCode + chunkValue)
    }

    setLoading(false)
    setHasGenerated(true)
    copyToClipboard(code)
  }

  const copyToClipboard = (text: string) => {
    const el = document.createElement('textarea')
    el.value = text
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }

  const handleApiKeyChange = (value: string) => {
    setApiKey(value)

    localStorage.setItem('apiKey', value)
  }

  useEffect(() => {
    if (hasGenerated) {
      handleGenerate()
    }
  }, [queryLanguage])

  useEffect(() => {
    const apiKey = localStorage.getItem('apiKey')

    if (apiKey) {
      setApiKey(apiKey)
    }
  }, [])

  return (
    <div className='relative isolate px-6 pt-14 lg:px-8 mb-24'>
      <div className='mx-auto max-w-2xl text-center'>

        <h1 className='text-3xl font-bold tracking-tight sm:text-6xl '>
          Query GPT
        </h1>

        <p className='mt-6 text-lg leading-8 text-stone-600 dark:text-stone-400'>
          Generate queries by asking questions about your data
        </p>

        <h4 className=' text-xl font-bold my-4'>
          Query language
        </h4>

        <div className='mt-6  text-sm'>
          <APIKeyInput apiKey={apiKey} onChange={handleApiKeyChange} />
        </div>

        <div className='mt-2'>
          <ModelSelect model={model} onChange={(value) => setModel(value)} />
        </div>

        <h4 className=' text-xl font-bold my-4'>
          Query language
        </h4>
        <LanguageSelect
          language={queryLanguage}
          onChange={(value) => {
            setQueryLanguage(value)
            setHasGenerated(false)
            // setQuestion('')
            // setOutputCode('')
          }}
        />

        <h4 className=' text-xl font-bold my-4'>
          Query data schema
        </h4>
        <div className='text-left'>
          <CodeBlock
            code={querySchema}
            editable={!loading}
            onChange={(value) => {
              setQuerySchema(value)
              setHasGenerated(false)
            }}
          />
        </div>

        <h4 className=' text-xl font-bold my-4'>
          Question
        </h4>
        <TextBlock
          text={question}
          editable={!loading}
          onChange={(value) => {
            setQuestion(value)
            setHasGenerated(false)
          }}
        />

        <button
          className='w-full rounded-md bg-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600'
          onClick={async () => await handleGenerate()}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>

        <h4 className=' text-xl font-bold my-4'>
          {queryLanguage}
        </h4>
        <div className='text-left'>
          <CodeBlock code={outputCode} />
        </div>
      </div>
    </div>
  )
}
