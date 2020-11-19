import React from 'react';

import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/Logopet.png';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

interface PageHeaderProps{
    button1: string;
    button2: string;
    button3: string;
    link1: string;
    link2: string;
    link3: string;
}

const PageHeader: React.FC<PageHeaderProps> =  (props) => {
    return (
        <header className="page-header">
                <Link to="/">
                    <img src={logoImg} alt="PetParty" />
                </Link>
                <div className="links">
                    <Link to={props.link1}>{props.button1}</Link>
                    <Link to={props.link2}>{props.button2}</Link>
                    <Link to={props.link3}>{props.button3}</Link>
                </div>

            </header>
    );
}

export default PageHeader;