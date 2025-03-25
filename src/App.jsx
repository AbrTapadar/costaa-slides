import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [boxColor, setBoxColor] = useState('#ff0000')

  const colorMap = {
    '1': '#ff0000', // Red
    '2': '#00ff00', // Green
    '3': '#0000ff', // Blue
    '4': '#ffff00', // Yellow
    '5': '#ff00ff', // Magenta
    '6': '#00ffff', // Cyan
    '7': '#ff8800', // Orange
    '8': '#8800ff', // Purple
    '9': '#00ff88', // Mint
    '0': '#ff0088', // Pink
  }

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key
      if (colorMap[key]) {
        setBoxColor(colorMap[key])
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  return (
    <div className="container">
      <div 
        className="box"
        style={{ backgroundColor: boxColor }}
      />
    </div>
  )
}

export default App