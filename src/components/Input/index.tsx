import React, { InputHTMLAttributes } from 'react';

import './styles.css'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    span?: string
}

const Input: React.FC<IInputProps> = ({ label, name, span, ...rest }) => {
    return (
        <div className="input-block">
            { label && <label htmlFor={name}>{label}</label>}
            <input type="text" id={name} {...rest} />
            { span && <span className="label-span">{span}</span>}
        </div>
    )
}

export default Input;