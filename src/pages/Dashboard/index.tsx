import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { ScheduleProvider } from '../../context/schedule';
import { SocketProvider } from '../../context/socket';

import SideBar from '../../components/SideBar';
import TeacherItem from '../TeacherList';
import Home from '../Home';
import TeacherProfil from '../TeacherProfil';
import TeacherForm from '../TeacherForm';
import Classroom from '../Classroom';

import './styles.css'

function Dashboard() {
    return (
        <div id="page-dashboard">
                <SideBar />
                <div className="container">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/study" exact>
                            <ScheduleProvider>
                                <TeacherItem />
                            </ScheduleProvider>
                        </Route>
                        <Route path="/profil" exact component={TeacherProfil} />
                        <Route path="/give-classes" exact component={TeacherForm} />
                        <Route path="/classroom" exact>
                            <SocketProvider>
                                <Classroom />
                            </SocketProvider>
                        </Route>
                    </Switch>
                </div>
            </div>
    )
}

export default Dashboard;