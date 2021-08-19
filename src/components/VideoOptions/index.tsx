import React, { FormEvent, useState } from 'react';
import { useSocket } from '../../context/socket';
import Input from '../Input';

import './styles.css'

const VideoOptions: React.FC = ({ children }) => {
    const { me, callAccepted, callEnded, leaveCall, callUser } = useSocket();
    const [idToCall, setIdToCall] = useState('');

    const handleAnswerCall = (event: FormEvent) => {
        event.preventDefault();
        
        callUser(idToCall)
    }
    
    return (
        <div className="videooptions">
            <form onSubmit={handleAnswerCall}>
                <Input 
                    name="myID"
                    defaultValue={me}
                    contentEditable={false}
                />
                <Input 
                    name="idToCall"
                    value={idToCall}
                    onChange={(e) => {setIdToCall(e.target.value)}}
                    formNoValidate
                />
                {callAccepted && !callEnded ? (
                    <button onClick={leaveCall}>End Call</button>
                ) : (
                    <button type="submit">Call</button>
                )}
            </form>
            {children}
        </div>
    )
}

export default VideoOptions;