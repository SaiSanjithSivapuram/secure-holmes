import { ReactMediaRecorder, useReactMediaRecorder } from "react-media-recorder";
import React, { useEffect, useRef } from "react";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { Button, Grid2 } from "@mui/material";
import "../App.css"

function VideoRecorder() {

    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ video: true });

    useEffect(() => {
        console.log(mediaBlobUrl)
    }, [mediaBlobUrl])

    return (
        <div>
            {/* <ReactMediaRecorder
                video
                render={({ status, startRecording, stopRecording, mediaBlobUrl }) => ( */}
                    <div className="recoding-area">
                        <Grid2 spacing={2} display="flex" justifyContent="center">
                            {(status === "idle" || status === "stopped") && <Grid2 xs={12}>
                                <Button variant="outlined" className="recording-btn" startIcon={<RadioButtonCheckedIcon color="error" />} onClick={startRecording}>Start Recording</Button>
                            </Grid2>}
                            {status === "recording" && <Grid2 xs={5}>
                                <Button variant="contained" className="recording-btn" startIcon={<RadioButtonCheckedIcon color="error" />} onClick={stopRecording}>Stop Recording</Button>
                            </Grid2>}
                        </Grid2>
                        {status === "recording" && <p>Recording Status: Recording Now</p>}
                        {status === "idle" && <p>Recording Status: No Video Recorded</p>}
                        {status === "stopped" && <p>Recording Status: Video Recorded</p>}
                        {/* <video src={mediaBlobUrl} width={500} controls autoPlay loop /> */}
                    </div>
                {/* )} */}
            {/* /> */}
        </div>
    )

}

export default VideoRecorder;