import React, { createContext, useState, useRef, useEffect, useContext } from 'react'
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

interface IUser {
    id: string;
    name: string;
}

interface ICall {
    isReceicedCall: boolean;
    from: any;
    name: any;
    signal: any;
}

interface ISocketContextData {
    stream: MediaStream | undefined;
    me: string;
    call: ICall;
    callAccepted: boolean;
    callEnded: boolean;
    myVideo: any;
    userVideo: any;
    micro: boolean;
    setMicro: any;
    callUser(
        id: any
    ): void;
    leaveCall(): void;
    answercall(): void;
}

const SocketContext = createContext<ISocketContextData>({} as ISocketContextData);

const socket = io('http://localhost:3333');

const SocketProvider: React.FC = ({ children }) => {
    const [stream, setStream] = useState<MediaStream | undefined>(undefined);
    const [me, setMe] = useState('')
    const [call, setCall] = useState<ICall>({} as ICall);
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [user, setUser] = useState<IUser>();
    const [micro, setMicro] = useState(true)

    const myVideo = useRef<HTMLMediaElement>();
    const userVideo = useRef<any>();
    const connectionRef = useRef<any>()

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: {
            aspectRatio: 16/9
        }, audio: true, })
            .then((currentStream) => {
                setStream(currentStream);

                if (myVideo.current !== undefined) {
                    myVideo.current!.srcObject = currentStream
                }
            });

        socket.on('me', (id) => setMe(id));

        socket.on('calluser', ({ from, name: callerName, signal }) => {
            setCall({ 
                isReceicedCall: true,
                from,
                name: callerName,
                signal
            })
        })
    }, []);

    function answercall() {
        setCallAccepted(true);

        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream
        });

        peer.on('signal', (data) => {
            socket.emit('answercall', {
                signal: data,
                to: call.from
            });
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    }

    const callUser = (id: any) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream
        });

        peer.on('signal', (data) => {
            socket.emit('calluser', {
                userToCall: id,
                signalData: data,
                from: me,
                name: user?.name
            });
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        socket.on('callaccepted', (signal) => {
            setCallAccepted(true);

            peer.signal(signal)
        });

        connectionRef.current = peer;
    }

    const leaveCall = () => {
        setCallEnded(true);

        connectionRef.current.destroy();

        window.location.reload();
    }

    return (
        <SocketContext.Provider value={{ micro, setMicro, call, callAccepted, callEnded, myVideo, userVideo, stream, me, callUser, leaveCall, answercall }}>
            {children}
        </SocketContext.Provider>
    )
}

function useSocket() {
    const context = useContext(SocketContext);
    return context
}

export {
    SocketProvider,
    useSocket
}