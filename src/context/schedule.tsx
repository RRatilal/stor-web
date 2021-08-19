import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { useAdmin } from './admin';

interface IScheduleContext {
    subject: string,
    chosedTimes: {}[];
    setSubject: Dispatch<SetStateAction<string>>
    getScheduleData: () => void
}

const ScheduleContext = createContext({} as IScheduleContext)

const ScheduleProvider: React.FC = ({ children }) => {
    const { updatedUser } = useAdmin()
    const [subject, setSubject] = useState("");
    const [chosedTimes, setChoseTimes] = useState([{}]);

    function getScheduleData() {
        console.log(updatedUser)
        console.log(subject)
        console.log(chosedTimes)
    }

    return (
        <ScheduleContext.Provider value={{ subject, chosedTimes, setSubject, getScheduleData }}>
            { children }
        </ScheduleContext.Provider>
    )
}

function useSchedule() {
    const context = useContext(ScheduleContext);

    return context;
}

export {
    useSchedule,
    ScheduleProvider
}