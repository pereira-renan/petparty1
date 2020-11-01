import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import api from '../../services/api';

import logoImg from '../../assets/images/Logopet.png';
import landingImg from '../../assets/images/logosempp.png';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/red-heart2.png';

import './styles.css';


function Landing(){
    const [totalConnections, setTotalConnections] = useState(0);

    useEffect(() => {
        api.get('connections').then(response => {
            const { total } = response.data;

            setTotalConnections(total);
        })
    }, [])

    return (
     <div id="page-landing">
         <div id="page-landing-content" className="container">
             <div className="logo-container">
                 <img src={logoImg} alt="PetParty"/>
                 <h2> A plataforma para te ajudar</h2>
             </div>

             <img 
                src={landingImg} 
                alt="Plataforma de auxilio" 
                className="hero-image"/>

            <div className="buttons-container">
                <Link to="/login" className="login">
                    <img src={studyIcon} alt="Entrar"/>
                    Entrar
                </Link>

                <Link to="/register" className="register">
                    <img src={giveClassesIcon} alt="Cadastrar"/>
                    Cadastrar
                </Link>
                
            </div>

            <span className="total-connections">
                Total de {totalConnections} conexões já realisadas <img src={purpleHeartIcon} alt="Coração roxo"/>

            </span>
         </div>
     </div>  
    )
}

export default Landing