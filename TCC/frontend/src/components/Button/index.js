import React, { Component } from 'react';
import './styles.css';

const Button = {
    principal: (props) => {
        return(
            <ButtonStructure type={props.type}
                             className="btn btn-principal"
                             onAction={props.onAction}
                             text={props.text}
                             href={props.href}
                             target={props.target}
                             onClick={props.onClick}
                             id={props.id}>
            </ButtonStructure>
        );
    },
    secundario: (props) => {
        return(
            <ButtonStructure type={props.type}
                             className="btn btn-secundario"
                             onAction={props.onAction}
                             text={props.text}
                             href={props.href}
                             target={props.target}
                             onClick={props.onClick}
                             id={props.id}>
            </ButtonStructure>
        );
    }
}

const ButtonStructure = (props) => {
    return(
        <button type={props.type}
                className={props.className}
                onClick={props.onClick}
                id={props.id}>
            <a className="a-auth" href={props.href}
                target={props.target === undefined ? "" : props.target}>  
                {props.text} 
            </a>         
        </button>
    );
}

export default Button;