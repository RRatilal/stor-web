import React from 'react';

import {ReactComponent as HomeIcon} from '../../assets/images/icons/home.svg';
import {ReactComponent as StudyIcon} from '../../assets/images/icons/study.svg';
import {ReactComponent as GiveClasseIcon} from '../../assets/images/icons/give-classes.svg';
import {ReactComponent as VideoIcon} from '../../assets/images/icons/video.svg';

export const SideBarData = [
    {
        title: "Iniciar",
        icon: <HomeIcon />,
        link: "/"
    },
    {
        title: "Estudar",
        icon: <StudyIcon />,
        link: "/study"
    },
    {
        title: "Dar Aulas",
        icon: <GiveClasseIcon />,
        link: "/give-classes"
    },
    {
        title: "Sala de Aulas",
        icon: <VideoIcon />,
        link: "/classroom"
    },
]