import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { ITeacher } from '../../components/TeacherItem';
import Input from '../../components/Input';

import api from '../../services/api';

import './styles.css';

function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [subject, setSubject] = useState("");

    async function handleSercheTeacherd(e: FormEvent) {
        e.preventDefault()
        
        const response = await api.get('classroom', {
            params: {
                subject: subject
            }
        })

        setTeachers(response.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader
                title="Estes são os proffys disponíveis."
                page="Estudar"
            >
                <form id="search-teachers" onSubmit={handleSercheTeacherd}>
                    <div className="week-day-time">
                        <Input
                            type="text"
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={e => { setSubject(e.target.value) }}
                        />
                    </div>

                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>

            <main>
                {
                    teachers && teachers.map((teacher: ITeacher) => (
                        <TeacherItem key={teacher.id} teacher={teacher} />
                    ))
                }
            </main>
        </div>
    )
}

export default TeacherList;