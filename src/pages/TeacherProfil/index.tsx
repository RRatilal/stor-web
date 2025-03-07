import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import warningIcon from '../../assets/images/icons/warning.svg';
import CameraIcon from '../../assets/images/icons/camera.svg';
import UserIcon from '../../assets/images/icons/profile-user.svg';

import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Textarea from '../../components/Textarea';

import { useAuth } from '../../context/auth';

import './styles.css';
import api from '../../services/api';
import { useAdmin } from '../../context/admin';

const TeacherProfil: React.FC = () => {
    const { user } = useAuth();
    const { updatedUser } = useAdmin();

    const [name, setName] = useState('');
    const [surname, setSurame] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [number, setNumber] = useState('');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState<File>();

    


    useEffect(() => {
        if (updatedUser) {
            setName(updatedUser.name);
            setSurame(updatedUser.surname);
            setEmail(updatedUser.email);
            setAvatar(updatedUser.image?.url);
            setNumber(updatedUser.number);
            setBio(updatedUser.bio);
        }
    }, [updatedUser])

    async function handleUpdadeUser(e: FormEvent) {
        e.preventDefault();

        const data = new FormData();

        data.append('name', name);
        data.append('surname', surname);
        data.append('email', email);
        data.append('number', number);
        data.append('bio', bio);
        if (image)
            data.append('image', image)

        try {
            await api.put(`update-user/${user?.id}`, data);
        } catch (error) {
            console.log(error)
            alert('Não foi possível actualizar os dados')
        }
    }

    function handleSelectImage(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) {
            return
        }

        const selectedImage = event.target.files[0];

        setImage(selectedImage);

        const imageUrl = URL.createObjectURL(selectedImage);

        setAvatar(imageUrl)
    }

    return (
        <div id="page-teacher-profil" className="container">
            <PageHeader
                page="Perfil"
            >
                <div className="avatar-container">
                    <div className="avatar">
                        <img src={avatar ? avatar : UserIcon} alt={name} />
                    </div>
                    <label htmlFor="image-profile" className="new-image">
                        <img src={CameraIcon} alt="Câmera" />
                    </label>
                    <input 
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleSelectImage}
                    id="image-profile"
                    />
                </div>

                <strong>{name} {surname}</strong>
                <p>Matemática</p>
            </PageHeader>

            <main>
                <form >
                    <fieldset>
                        <legend>Seus dados</legend>

                        <div className="name-surname">
                            <Input name="name" label="Nome" value={name} onChange={(e) => { setName(e.target.value) }} />
                            <Input name="surname" label="Sobrenome" value={surname} onChange={(e) => { setSurame(e.target.value) }} />
                        </div>
                        <div className="email-whatsapp">
                            <Input name="email" label="E-mail" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            <Input name="number" label="Number" value={number} onChange={(e) => { setNumber(e.target.value) }} />
                        </div>
                        <Textarea name="bio" label="Biografia" value={bio} onChange={(e) => { setBio(e.target.value) }} />
                    </fieldset>




                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                        Importante! <br />
                        Preencha todos os dados
                    </p>
                        <button type="submit" onClick={handleUpdadeUser} >
                            Salvar
                    </button>
                    </footer>
                </form>
            </main>
        </div>
    );
}

export default TeacherProfil;