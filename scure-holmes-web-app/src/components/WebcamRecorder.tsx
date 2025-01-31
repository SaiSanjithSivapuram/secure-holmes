import { Button } from "@mui/material";
import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import "../App.css"

const WebcamRecorder: React.FC = () => {
    const webcamRef = useRef<Webcam>(null);

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <Webcam audio={true} ref={webcamRef} className="video-card" />
        </div>
    );
};

export default WebcamRecorder;
