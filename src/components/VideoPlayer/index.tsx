import React, { useEffect, useState } from 'react';
import { useSocket } from '../../context/socket';

import './styles.css'

const VideoPlayer: React.FC = () => {
    const [calling, setCalling] = useState("")
    const { myVideo, userVideo, callAccepted, callEnded, stream, call } = useSocket()

    useEffect(() => {
        if (call.isReceicedCall || callAccepted) 
            setCalling("calling")
    }, [call.isReceicedCall, callAccepted])

    return (
        <div id="videoplayer">
            {stream && (
                <video 
                    className={`${calling}`}
                    playsInline
                    ref={myVideo} 
                    muted
                    autoPlay
                />
            )}
            {callAccepted && !callEnded && (
                <video 
                    className="teacher-video" 
                    playsInline
                    ref={userVideo} 
                    autoPlay
                />
            )}
        </div>
    )
}

export default VideoPlayer;