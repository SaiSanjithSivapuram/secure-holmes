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
      const fetchData = () => {
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

      fetchData(); // Fetch initially
      const interval = setInterval(fetchData, 5000); // Fetch every 5 seconds

      return () => clearInterval(interval); // Cleanup interval on unmount
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
              {matchResult === "Processing..." && <Typography variant='h6' style={{ marginTop: "10vh", color: "#3498db", backgroundColor: "#e74c3c", borderRadius: "10px" }}>Processing Please Wait</Typography>}
              {matchResult === "Match: Yes" && <Typography variant='h6' style={{ marginTop: "10vh", color: "#FFFFFF", backgroundColor: "#27ae60", borderRadius: "10px" }}>Face Matched</Typography>}
              {matchResult === "Match: No" && <Typography variant='h6' style={{ marginTop: "10vh", color: "#FFFFFF", backgroundColor: "#e74c3c", borderRadius: "10px" }}>No Match</Typography>}
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
