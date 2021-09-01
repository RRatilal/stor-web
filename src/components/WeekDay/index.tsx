import React, { useEffect, useState, HTMLAttributes, MouseEvent } from 'react';

import ArrowRightIcon from '../../assets/images/icons/arrow-right.svg';

import './styles.css';

import { useSchedule } from '../../context/schedule'

interface ISchedules {
    id: number;
    week_day: number;
    from: number;
    to: number;
}

interface IWeekDay extends HTMLAttributes<HTMLDivElement> {
    day: string;
    dayClass: boolean;
    schedule:ISchedules | undefined;
    setActivatedDay(activated: string): any
}

const WeekDay: React.FC<IWeekDay> = ({ dayClass, schedule, day, setActivatedDay, ...rest }) => {
    const [active, setActive] = useState("");
    const [rangeArray, setRangeArray] = useState<number[]>([]);

    const {  selected, clickedItem, getScheduleData } = useSchedule();
    

    useEffect(() => {
        if (schedule) {
            let start = schedule.from;
            let stop = schedule.to;

            let length = Math.ceil((stop - start) / 45);

            const result = Array.from({length: length + 1}, (_, index) => start + index * 45)

            setRangeArray(result)
        }
    }, [schedule]);

    function handleClickWeekDay() {
        if (dayClass) {
            active === "" ? setActive("active") : setActive("");
            active === "active" ? setActivatedDay("") : setActivatedDay("activatedDay");
        }
    }



    return (
        <div
        className={`week-day ${active} ${dayClass === false ? "not-set-date" : ""}`}
        onClick={handleClickWeekDay}
        >
            {
                active === "active" ? 
                <>
                    <div>{day}</div>
                    {
                        rangeArray.map((range, index) => {
                            const minutes = range % 60
                            return (
                                <div 
                                    key={index}
                                    className={`hourMinutes ${clickedItem === index ? selected : ""}`}
                                    onClick={event => getScheduleData(event, day, index)}
                                >
                                    {Math.floor(range / 60)}:
                                    {minutes === 0 ? "00" : minutes}
                                </div>
                            )
                        })
                    }
                </> : 
                <>
                    <p className="day"><span>Dia</span>{day}</p>
                    <img src={ArrowRightIcon} alt="Seta para direita" />
                    <p className="time"><span>Horário</span>
                        {schedule && Math.floor(schedule.from / 60)}h - 
                        {schedule && Math.floor(schedule.to / 60)}h
                    </p>
                </>
            }
        </div>
    )
}

export default WeekDay;