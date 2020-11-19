import React, { useState } from 'react';
import './styles.css';

const FormHeader = (props) => {
    return(
        <header className="cabecalho-formulario">
            <a className="a-auth" href={"/"}>
                <img src="logo8.png" className="logo-formulario"/>
            </a>
            <p>Área de {props.nomeArea}</p>
            <hr className="hr-formulario"/>
            {props.children}
        </header>
    );
}

export default FormHeader;