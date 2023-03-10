import React from 'react'
import { describe, it, expect, vi, type MockedFunction } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'

import HeroHeader from './HeroHeader'
import { fetchMock } from '../../test/globalMocks'
import getImage from '../../utils/heroHeaderProvider'

describe('HeroHeader is rendering', () => {
  const getImageMock = getImage as MockedFunction<typeof getImage>
  const defaultImage = 'https://picsum.photos/1000/300?grayscale'

  beforeEach(() => {
    getImageMock.mockClear()
    vi.stubGlobal('global.fetch', fetchMock)
    vi.mock('../../utils/heroHeaderProvider')

    render(<HeroHeader />)
  })

  it('Renders an image in the header', async () => {
    const image = screen.queryByRole('img') as HTMLElement
    expect(image).toBeDefined()
    const style = window.getComputedStyle(image)
    expect(style.backgroundImage).toBe(`url(${defaultImage})`)
  })

  it('Renders an input field and a button', async () => {
    const input = screen.getByLabelText(/^(Search)/)
    const button = screen.getByRole('button')
    expect(input).not.toBeNull()
    expect(button).not.toBeNull()
  })

  it('Updates the image when a user submits a search query', async () => {
    // mock the response from getImage
    const searchValue = 'moon landing'
    const searchValueResponse = 'https://images-assets.nasa.gov/image/PIA01454/PIA01454~thumb.jpg'

    getImageMock.mockResolvedValue(
      searchValueResponse
    )

    const input = screen.getByTestId('search')
    const button = screen.getByRole('button')

    await act(async () => {
      fireEvent.change(input, {
        target: { value: searchValue }
      })
      fireEvent.click(button)
    })

    const image = screen.queryByRole('img') as HTMLElement
    expect(getImage).toHaveBeenCalledWith(searchValue)
    expect(image).not.toBeNull()
    const style = window.getComputedStyle(image)
    expect(style.backgroundImage).toBe(`url(${searchValueResponse})`)
  })

  it('Does not fire the search if the input is not filled and so the image remains default', async () => {
    const input = screen.getByTestId('search')
    const button = screen.getByRole('button')
    const image = screen.queryByRole('img') as HTMLElement

    await act(async () => {
      fireEvent.change(input, {
        target: { value: '' }
      })
      fireEvent.click(button)
    })

    expect((input as HTMLInputElement).value).toBe('')
    expect(getImageMock).not.toBeCalled()
    const style = window.getComputedStyle(image)
    expect(style.backgroundImage).toBe(`url(${defaultImage})`)
  })
})
