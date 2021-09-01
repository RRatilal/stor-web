import React, { createContext, useContext, useState, MouseEvent, useEffect } from 'react';
import { useAdmin } from './admin';

interface IScheduleContext {
    selected: string;
    clickedItem: number | null;
    chosenTimeItem: {}[];
    getScheduleData(
        event: MouseEvent<HTMLDivElement>,
        day: string,
        index: number
    ): void
}

const ScheduleContext = createContext({} as IScheduleContext)

const ScheduleProvider: React.FC = ({ children }) => {
    const { updatedUser } = useAdmin();
    const [selected, setSelected] = useState("");
    const [clickedItem, setClickedItem] = useState<number | null>(null)
    const [chosenTimeItem, setChosenTimeItem] = useState([
        {chosenTime: "", day: ""}
    ]);

    useEffect(() => {
        console.log(chosenTimeItem)
    }, [chosenTimeItem])

    function getScheduleData(event: MouseEvent<HTMLDivElement>, day: string, index: number) {
        event.stopPropagation();

        const currentDiv = event.currentTarget

        const findTime = chosenTimeItem.find(time => time.chosenTime === currentDiv.innerHTML)

        const date = new Date();
        const currentWeekday = date.getDay();
        const currentDay = date.getDate();

        
        // if (currentWeekday === 3 && schedule?.week_day === 4) {
        //     console.log(schedule?.week_day)
        // }

        setClickedItem(index)

        if (!findTime) {
            setChosenTimeItem([
                ...chosenTimeItem,
                {chosenTime: currentDiv.innerHTML, day}
            ]);

            // currentDiv.className = "hourMinutes selected"

            setSelected("selected");

            // currentDiv.className = `hourMinutes ${selected}`;
        } else {
            const removingTime = chosenTimeItem.filter(time => time.chosenTime !== findTime.chosenTime)

            console.log("removing time", removingTime)

            setChosenTimeItem(removingTime)

            // currentDiv.className = "hourMinutes"

            setSelected("");

            // currentDiv.className = `hourMinutes ${selected}`;
        }
    }

    return (
        <ScheduleContext.Provider value={{ selected, clickedItem, chosenTimeItem, getScheduleData }}>
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