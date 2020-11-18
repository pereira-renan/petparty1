import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import api from '../../services/api';

import './styles.css';


 export interface Teacher {
    avatar: string,
    bio: string,
    cost: number,
    id: number,
    name: string,
    subject: string,
    whatsapp: string
}

interface TeacherItemPros {
    teacher: Teacher
}

const TeacherItem: React.FC<TeacherItemPros> = ( {teacher} ) => {
    function createNewConnection() {
        api.post('connections', {
            user_id: teacher.id
        });
    }
    
    return(
        <article className="teacher-item">
                    <header>
                        <img src={teacher.avatar} alt={teacher.name} />
                        <div>
                            <strong>{teacher.name}</strong>
                            <span>{teacher.subject}</span>
                        </div>
                    </header>

                    <p>{teacher.bio}</p>

                    <footer>
                        <p>
                            Preço/hora
                            <strong>R${teacher.cost}</strong>
                        </p>
                        <a  
                        target="blank"
                        onClick={createNewConnection} 
                        href={`https://api.whatsapp.com/send?phone=${teacher.whatsapp}&text=Olá!%20Encontrei%20seu%20contato%20pelo%20PetParty!%20Me%20chamo%20,%20podemos%20conversar`}>
                            <img src={whatsappIcon} alt="Whatsapp"/>
                            Entrar em contato
                        </a>                    
                    </footer>
                </article>
    );
}

export default TeacherItem;