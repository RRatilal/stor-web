import React from 'react';
import { useSocket } from '../../context/socket';

import './styles.css'

const Notification: React.FC = () => {
    const { answercall, call } = useSocket();

    return (
        <div className="notification">
            <div>
                <h1>{call.name} is calling...</h1>
                <span onClick={answercall}>
                    Answer
                </span>
            </div>
        </div>
    )
}

export default Notification;