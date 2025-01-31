import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { Grid2, Typography } from '@mui/material'
import WebcamRecorder from './components/WebcamRecorder'
import VideoRecorder from './components/VideoRecorder'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Grid2 container spacing={2} className="webcam" display="flex" justifyContent="space-evenly" alignContent="center" alignItems="center">
        <Grid2 xs={6}>
          <WebcamRecorder />
        </Grid2>
        <Grid2 xs={6}>
          <VideoRecorder />
        </Grid2>
      </Grid2>
    </>
  )
}

export default App
