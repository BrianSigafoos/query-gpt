import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { ModelSelect } from '../ModelSelect'
import { OpenAIModel } from '@/types/types'
import { LANGUAGE_MODELS } from '@/lib/constants'

describe('ModelSelect', () => {
  const mockOnChange = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the select options correctly', () => {
    const { getAllByRole } = render(
      <ModelSelect model='gpt-4' onChange={mockOnChange} />
    )

    const options = getAllByRole('option')

    expect(options).toHaveLength(LANGUAGE_MODELS.length)
    LANGUAGE_MODELS.sort((a, b) => a.label.localeCompare(b.label)).forEach(
      (model, index) => {
        expect(options[index]).toHaveValue(model.value)
        expect(options[index]).toHaveTextContent(model.label)
      }
    )
  })

  it('calls onChange with the correct value when changed', () => {
    const { getByRole } = render(
      <ModelSelect model='gpt-4' onChange={mockOnChange} />
    )

    const select = getByRole('combobox')
    fireEvent.change(select, { target: { value: 'gpt-4' } })

    expect(mockOnChange).toHaveBeenCalledWith('gpt-4')
  })

  it('renders the selected model correctly', () => {
    const { getByRole } = render(
      <ModelSelect model='gpt-4' onChange={mockOnChange} />
    )

    const select = getByRole('combobox')
    expect(select).toHaveValue('gpt-4')
  })
})
