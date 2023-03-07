import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import App from '../App'

describe('App is rendering', () => {
  beforeEach(() => {
    render(<App />)
  })

  it('Renders the header as Testing Vite+React', async () => {
    const h1 = screen.queryByText('Testing Vite + React')
    expect(h1).not.toBeNull()
  })
  it('Imports HeroHeader image', async () => {
    const img = screen.getByRole('img')
    expect(img).not.toBeNull()
  })
})
