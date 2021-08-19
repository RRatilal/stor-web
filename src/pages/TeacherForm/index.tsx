import React, { useState, FormEvent, useEffect, MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css';
import api from '../../services/api';
import { useAuth } from '../../context/auth';

function TeacherForm() {
    const { user } = useAuth()
    const history = useHistory();

    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState<HTMLLIElement | null>(null);
    const [scheduleItens, setScheduleItens] = useState([
        { week_day, from: '', to: '' }
    ]);

    const [cost, setCost] = useState('');

    useEffect(() => {

    }, [])

    function handleAddScheduleItem() {
        setScheduleItens([
            ...scheduleItens,
            { week_day: null, from: '', to: '' }
        ])
    }

    function handleRemoveScheduleItem(currentItem: any) {
        const newScheduleItens = scheduleItens.filter(item => item !== currentItem);

        setScheduleItens(newScheduleItens)

        console.log(newScheduleItens)
    }

    function setScheduleItemValue(position: number, field: string, value: string | HTMLLIElement) {
        const updatedScheduleItem = scheduleItens.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value }
            }

            return scheduleItem
        });

        setScheduleItens(updatedScheduleItem);
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        const newScheduleItens = scheduleItens.map(scheduleIten => {
            return {
                week_day: Number(scheduleIten.week_day?.id) + 1,
                from: scheduleIten.from,
                to: scheduleIten.to
            }
        })

        console.log(newScheduleItens)

        api.post(`classroom/${user?.id}`, {
            subject: subject,
            cost: Number(cost),
            schedules: newScheduleItens
        }).then(() => {
            alert('Cadastro ralizado com sucesso');

            history.push('/')
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher esse formulário de inscrição"
                page="Dar aulas"
            />

            <main>
                <form onSubmit={handleCreateClass} >
                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <div className="about-class">
                            <Input
                                name="subject"
                                label="Matéria"
                                value={subject}
                                onChange={e => setSubject(e.target.value)}
                            />
                            <Input
                                name="cost"
                                label="Custo da sua hora por aula"
                                value={cost}
                                onChange={(e) => { setCost(e.target.value) }}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                        <button type="button" onClick={handleAddScheduleItem} >
                                + Novo
                        </button>
                        </legend>

                        {scheduleItens.map((scheduleItem, index) => (
                            <div key={index} className="schedule-item">
                                <Select
                                    defaultOption="Que dia"
                                    label="Horário"
                                    onClick={e => {
                                        setWeek_day(e.currentTarget)
                                        setScheduleItemValue(index, "week_day", e.currentTarget)
                                    }}
                                    liTarget={scheduleItem.week_day}
                                    options={[
                                        { value: '0', label: 'Domingo' },
                                        { value: '1', label: 'Segunda' },
                                        { value: '2', label: 'Terça' },
                                        { value: '3', label: 'Quarta' },
                                        { value: '4', label: 'Quinta' },
                                        { value: '5', label: 'Sexta' },
                                        { value: '6', label: 'Sábado' },
                                    ]}
                                />
                                <div className="time-input">
                                    <Input
                                        name="from"
                                        label="Das"
                                        type="time"
                                        value={scheduleItem.from}
                                        onChange={e => setScheduleItemValue(index, "from", e.target.value)}
                                    />
                                    <Input
                                        name="to"
                                        label="Até"
                                        type="time"
                                        value={scheduleItem.to}
                                        onChange={e => setScheduleItemValue(index, "to", e.target.value)}
                                    />
                                </div>
                                <div className="delete-time">
                                    <button onClick={() => handleRemoveScheduleItem(scheduleItem)}>
                                        Excluir Horário
                                    </button>
                                </div>
                            </div>
                        ))}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                        Importante! <br />
                        Preencha todos os dados
                    </p>
                        <button type="submit" >
                            Salvar aula
                    </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;