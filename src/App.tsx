import React from 'react'
import './App.css'
import HeroHeader from './components/HeroHeader/HeroHeader'

function App (): React.ReactElement {
  return (
    <div className="App">
      <HeroHeader />
      <h1>Testing Vite + React</h1>
    </div>
  )
}

export default App
