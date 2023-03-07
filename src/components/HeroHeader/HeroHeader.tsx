import React, { type SyntheticEvent, useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import getImage from '../../utils/heroHeaderProvider'
import './HeroHeader.css'

export default function HeroHeader (): React.ReactElement {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined)
  const [imageError, setImageError] = useState<string>('')
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setLoading] = useState(false)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value
    setInputValue(newValue)
  }

  const getNewImage = async (event: FormEvent<HTMLFormElement> | SyntheticEvent): Promise<void> => {
    event.preventDefault()
    await setImage(inputValue)
  }

  const setImage = async (userSearchInput?: string): Promise<void> => {
    setImageError('')
    if ((userSearchInput?.length) == null) return
    setLoading(true)
    try {
      const image = await getImage(userSearchInput)
      setImageUrl(image)
    } catch (error) {
      setImageError(String(error))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (inputValue.length !== 0) {
      setImage().catch(console.error)
    }
  }, [inputValue])

  const imageStyle = {
    backgroundImage: imageUrl !== undefined ? `url(${imageUrl})` : 'url(https://picsum.photos/1000/300?grayscale)',
    backgroundSize: 'cover',
    width: '1000px',
    height: '300px'
  }

  function onPromise<T> (promise: (event: SyntheticEvent) => Promise<T>) {
    return (event: SyntheticEvent) => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (promise) {
        promise(event).catch((error) => {
          console.log('Unexpected error', error)
        })
      }
    }
  }

  return (
        <>
            <div role="img" style={imageStyle}></div>
            <form name="search" onSubmit={onPromise(getNewImage)} className="headerForm">
            <label htmlFor="search">Search for an NASA image</label>
            <input type="text" id="search" data-testid="search" value={inputValue} onChange={handleInputChange}/>
            <label>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Go!'}
                </button>
            </label>
            {imageError.length > 0 && <span className="error">{imageError}</span>}
            </form>
        </>
  )
}
