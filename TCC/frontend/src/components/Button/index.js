import React, { Component } from 'react';
import './styles.css';

const Button = {
    principal: (props) => {
        return(
            <ButtonStructure type={props.type}
                             className="btn btn-principal"
                             onAction={props.onAction}
                             text={props.text}
                             href={props.href}>
            </ButtonStructure>
        );
    },
    secundario: (props) => {
        return(
            <ButtonStructure type={props.type}
                             className="btn btn-secundario"
                             onAction={props.onAction}
                             text={props.text}
                             href={props.href}>
            </ButtonStructure>
        );
    }
}

const ButtonStructure = (props) => {
    return(
        <button type={props.type}
                className={props.className}
                onAction={props.onAction} >
            <a href={props.href}>  
                {props.text} 
            </a>         
        </button>
    );
}

export default Button;