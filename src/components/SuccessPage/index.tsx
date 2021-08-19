import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import DoneIcon from '../../assets/images/icons/done.svg';

import './styles.css';

interface IProps {
    title: string;
    pText: string;
    buttonText: string
}

const SuccessPage: React.FC = () => {
    const [title, setTile] = useState('');
    const [pText, setPText] = useState('');
    const [buttonText, setButtonText] = useState('');

    const history = useHistory();
    const location = useLocation<IProps>();

    useEffect(() => {
        const { title, pText, buttonText } = location.state;

        setTile(title)
        setPText(pText)
        setButtonText(buttonText)
    }, [location])

    function handleGoBack() {
        history.push("/")
    }

    return (
        <div id="success-page">
            <div className="success-container">
                <img src={DoneIcon} alt="Feito" />

                <h1>{title}</h1>

                <p>
                    {pText}
                </p>

                <button onClick={handleGoBack}>
                    {buttonText}
                </button>
            </div>
        </div>
    );
}

export default SuccessPage;