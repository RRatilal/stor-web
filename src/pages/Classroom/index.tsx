import React, { FormEvent, useEffect, useState } from 'react';
import { useSocket } from '../../context/socket'

import Notification from '../../components/Notification';
import VideoOptions from '../../components/VideoOptions';
import VideoPlayer from '../../components/VideoPlayer';

import videoIcon from '../../assets/images/icons/video-camera.svg';
import videoOffIcon from '../../assets/images/icons/video-camera-off.svg';
import microIcon from '../../assets/images/icons/microphone.svg';
import microOffIcon from '../../assets/images/icons/microphone-off.svg';
import miniArrowsIcon from '../../assets/images/icons/minimize-arrows.svg';
import moreIcon from '../../assets/images/icons/more.svg';

import './styles.css';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';

function Classroom() {
    const [muteVideo, setMuteVideo] = useState(false);
    const [muteAudio, setMuteAudio] = useState(false);
    const [idToCall, setIdToCall] = useState('');

    const { call, callAccepted, callEnded, stream, leaveCall, callUser, answercall } = useSocket();

    function handleVideo() {
        // disableCamera === false ? setDisableCamera(true) : setDisableCamera(false)
        if (stream) {
            if (stream.getVideoTracks()[0].enabled === true) {
                stream.getVideoTracks()[0].enabled = false
                setMuteVideo(true)
            } else {
                stream.getVideoTracks()[0].enabled = true
                setMuteVideo(false)
            }
        }
    }

    function handleAudio() {
        if (stream) {
            if (stream.getAudioTracks()[0].enabled === true) {
                stream.getAudioTracks()[0].enabled = false
                setMuteAudio(true)
            } else {
                stream.getAudioTracks()[0].enabled = true
                setMuteAudio(false)
            }
        }
    }

    const handleCallUser = () => {
        
        callUser(idToCall)
    }

    return (
            <div id="classroom-page">
                <PageHeader page="Sala de Aulas" />

                <div className="classroom-container">
                    <div className="video-container">
                        <div className="video-content">
                            <VideoPlayer />
                            {
                                call.isReceicedCall && !callAccepted && (
                                    <Notification />
                                )
                            }
                                
                        </div>

                        <div className="video-controllers">
                            <button 
                                className={`video ${!muteVideo ? "btn-active" : ""}`}
                                onClick={handleVideo}
                            >
                                <img src={!muteVideo ? videoIcon : videoOffIcon} alt="video"/>
                            </button>
                            <button 
                                className="micro"
                                onClick={handleAudio}
                            >
                                <img src={!muteAudio ? microIcon : microOffIcon} alt="micro"/>
                            </button>
                            
                            {callAccepted && !callEnded ? 
                                (<button onClick={leaveCall} className="btn-call"> Terminar </button>
                            ) : (
                                <>
                                {call.isReceicedCall && !callAccepted ? (
                                    <button onClick={answercall} className="btn-call"> Atender </button>
                                ) : (
                                    <button onClick={handleCallUser} className="btn-call"> Chamar </button>
                                )}
                                
                                </>
                            )}
                            
                            <button className="video-size">
                                <img src={miniArrowsIcon} alt="mini-arrows"/>
                            </button>
                            <button className="more">
                                <img src={moreIcon} alt="more"/>
                            </button>
                        </div>
                    </div>

                    <div className="lessons">
                        <h2>Aulas por assistir</h2>

                        <div className="next-lessons-content">
                            <div className="lesson-view">
                                <div>
                                    <span>Quimica</span>
                                    <span className="line"></span>
                                    <span>Segunda</span>
                                    <span className="line"></span>
                                    <span>8h - 9h</span>
                                </div>

                                {/* <div className="button">
                                    <button className="suspend">
                                        Adiar
                                    </button>
                                    <button className="cancel">
                                        Cancelar
                                    </button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Classroom;