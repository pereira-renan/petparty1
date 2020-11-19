import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import api from '../../services/api';

import logoImg from '../../assets/images/Logopet.png';

import './styles.css';
import PageHeader from '../../components/PageHeader';

function About() {
    return (
        <div id="page-about">
            <PageHeader button1="Contato" button2="Cadastrar" button3="Entrar"
            link1="/contact" link2="/register" link3="/login"/>
            <div id="page-about-content" className="container">
                <div className="um">
                    <h2>Olá!</h2>
                    <h2>Somos a PetParty, é um prazer termos você aqui com a gente.</h2>
                </div>

                <div className="dois">
                    <h2>Nossa plataforma foi criada pensando nos donos de Pets, do pequenos aos grandes, dos barulhentos aos mais tranquilos. Nessa festa tem lugar para todo mundo!</h2>
                    <h2>Aqui você vai encontrar cuidadores de Pets dispostos a conversar, trocar experiências.</h2>
                </div>

                <div className="pq">
                    <h2>Precisa de alguém para olhar seu pet no final de semana? Tem aqui!</h2>
                    <h2>Precisa de uma dica de ração para o seu novo? Tem também!</h2>
                    <h2>Que tal saber mais sobre aquele porquinho-da-índia que você tanto queria ter?</h2>
                    <h2>Que coincidência, tem aqui também!</h2>
                </div>

            </div>
        </div>
    )
}

export default About