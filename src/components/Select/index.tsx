import React, { LiHTMLAttributes, useEffect, useState } from 'react';

import selectIcont from '../../assets/images/icons/select.svg';

import './styles.css'

interface ISelectProps extends LiHTMLAttributes<HTMLLIElement> {
    label: string;
    defaultOption: string;
    options: Array<{
        value: string;
        label?: string;
    }>;
    liTarget: HTMLLIElement | null
}

const Select: React.FC<ISelectProps> = ({ label, options, defaultOption, liTarget, ...rest }) => {
    const [activeted, setActiveted] = useState('');
    const [inputBorder, setInputBorder] = useState('');
    const [subject, setSubject] = useState(defaultOption);

    useEffect(() => {
        handleSelectInputContent()
    }, [liTarget])

    function handleSelectInputClass() {
        activeted === '' ? setActiveted('activeted') : setActiveted('')
        activeted === 'activeted' ? setInputBorder('') : setInputBorder('border')
    }

    function handleSelectInputContent() {
        if (liTarget) {
            setSubject(String(liTarget?.textContent))
        }
        setActiveted('')
        setInputBorder('')
    }


    return (
        <div className="select-container">
            <span className="select-title">{label}</span>
            <div
                className={`select-box ${inputBorder}`}
                onClick={handleSelectInputClass}
            >
                <span >{subject}</span>
                <img
                    src={selectIcont}
                    alt="Selecionar"
                    onClick={handleSelectInputClass}
                />
            </div>
            <div className={`select-options ${activeted} `}>
                <ul>
                    {options.map((option) => (
                        <li
                            key={option.value}
                            id={option.value}
                            {...rest}
                        >{option.label}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Select;