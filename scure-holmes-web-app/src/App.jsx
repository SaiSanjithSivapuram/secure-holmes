import { useEffect, useRef, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import RefreshIcon from '@mui/icons-material/Refresh';
import { Button, Grid2, Typography } from '@mui/material'

function App() {

  const [status, setStatus] = useState(false)
  const [matchResult, setMatchResult] = useState("")

  useEffect(() => {
    fetch("http://127.0.0.1:3001/video_feed")
      .then((response) => {
        if (response.ok) {
          setStatus(true);
        } else {
          setStatus(false);
        }
      })
      .catch((error) => {
        setStatus(false);
      });
  }, [])

  useEffect(() => {
    if (status) {
      fetch("http://127.0.0.1:3001/get_match_result")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not OK");
          }
          return response.json(); // Convert response to JSON
        })
        .then((data) => {
          console.log(data?.result)
          setMatchResult(data?.result); // Extract 'result' from JSON
        })
        .catch(() => {
          setMatchResult("No")
        })
    }
  }, [status])

  const getResult = () => {
    fetch("http://127.0.0.1:3001/get_match_result")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json(); // Convert response to JSON
      })
      .then((data) => {
        console.log(data?.result)
        setMatchResult(data?.result); // Extract 'result' from JSON
      })
      .catch(() => {
        setMatchResult("No")
      })
  }

  return (
    <>
      <Navbar />
      <Grid2 container spacing={2} className="webcam" display="flex" justifyContent="center" alignContent="center" alignItems="center">
        <Grid2 xs={12}>
          {status ?
            <div>
              <img src="http://127.0.0.1:3001/video_feed" alt="Webcam Stream" style={{ width: "100%", borderRadius: "10px" }} />
              <Typography variant='h6' style={{ marginTop: "10vh", color: "#3498db" }}>{matchResult}</Typography>
              <Button variant="contained" className="recording-btn" startIcon={<RefreshIcon />} onClick={getResult} style={{ marginBottom: "10vh" }}>Refresh Data</Button>
            </div>
            :
            <>
              <img src='/server-down.svg' width={600} height={"auto"} />
              <Typography variant='h3' style={{ marginTop: "10vh", color: "#3498db" }}>Error 503 Server down...</Typography>
            </>
          }
        </Grid2>
      </Grid2>
    </>
  )
}

export default App
