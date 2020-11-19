import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import api from '../../services/api';

import logoImg from '../../assets/images/Logopet.png';

import './styles.css';
import PageHeader from '../../components/PageHeader';

function Contact() {
    return (
        <div id="page-contact">
            <PageHeader button1="Sobre" button2="Cadastrar" button3="Entrar"
            link1="/about" link2="/register" link3="/login"/>
            <div id="page-contact-content" className="container">
                <div className="um">
                    <h2>Se ficou com alguma dúvida, quer mandar alguma sugestão para nós ou precisa bater um papo, manda um email pra nós aqui embaixo! </h2>
                </div>

                <div className="dois">
                    <h2>petpartyhelp@gmail.com</h2>
                </div>

            </div>
        </div>
    )
}

export default Contact