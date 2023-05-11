'use client'

import { useState, useEffect, FC } from 'react'

import { APIKeyInput } from '@/components/APIKeyInput'
import { CodeBlock } from '@/components/CodeBlock'
import { LanguageSelect } from '@/components/LanguageSelect'
import { ModelSelect } from '@/components/ModelSelect'
import { TextBlock } from '@/components/TextBlock'

import { OpenAIModel, GenerateBody } from '@/types/types'
import { MAX_COMBINED_LENGTH } from '@/lib/constants'

export default function QueryGenerator () {
  const [queryLanguage, setQueryLanguage] = useState<string>('GraphQL')
  const [dataSchema, setDataSchema] = useState<string>('')
  const [question, setQuestion] = useState<string>('')
  const [outputCode, setOutputCode] = useState<string>('')
  const [model, setModel] = useState<OpenAIModel>('gpt-3.5-turbo')
  const [loading, setLoading] = useState<boolean>(false)
  const [hasGenerated, setHasGenerated] = useState<boolean>(false)
  const [apiKey, setApiKey] = useState<string>('')

  const handleGenerate = async () => {
    if (!apiKey) {
      alert('Please enter an API key.')
      return
    }

    if (!dataSchema) {
      alert('Please enter a query schema or just describe it.')
      return
    }

    if (!question) {
      alert('Please enter a question.')
      return
    }

    if (dataSchema.length + question.length > MAX_COMBINED_LENGTH) {
      alert(
        `Please enter code less than ${MAX_COMBINED_LENGTH} characters. You are currently at ${
          dataSchema.length + question.length
        } characters.`
      )
      return
    }

    setLoading(true)
    setOutputCode('')

    const controller = new AbortController()

    const body: GenerateBody = {
      queryLanguage,
      dataSchema,
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
    <>
      <h4>Language model</h4>
      <div className='mt-6 sm:flex sm:space-x-2'>
        <div className='w-full'>
          <ModelSelect model={model} onChange={(value) => setModel(value)} />
        </div>

        <div className='mt-2 w-full sm:mt-0 '>
          <APIKeyInput apiKey={apiKey} onChange={handleApiKeyChange} />
        </div>
      </div>

      <h4>Query language</h4>
      <LanguageSelect
        language={queryLanguage}
        onChange={(value) => {
          setQueryLanguage(value)
          setHasGenerated(false)
        }}
      />

      <h4>Schema</h4>
      <p className='txt-subtitle -mt-3 mb-2 text-sm'>
        Paste in your data schema, or simply describe it.
      </p>
      <div className='text-left'>
        <TextBlock
          text={dataSchema}
          editable={!loading}
          onChange={(value) => {
            setDataSchema(value)
            setHasGenerated(false)
          }}
        />
      </div>

      <h4>Question</h4>
      <p className='txt-subtitle -mt-3 mb-2 text-xs'>
        What do you want to know about your data?
      </p>
      <TextBlock
        text={question}
        editable={!loading}
        onChange={(value) => {
          setQuestion(value)
          setHasGenerated(false)
        }}
      />

      <button
        className='btn-primary'
        onClick={async () => await handleGenerate()}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate'}
      </button>

      <h4>
        Generated query
        <span className='txt-color-primary'> in </span>
        {queryLanguage}
      </h4>
      <CodeBlock code={outputCode} />
    </>
  )
}
