import React from 'react';
import './styles.css';

const DivAviso = {
    sucesso: (props) => {
        return(
            <DivAvisoStructure className="aviso sucesso"
                               text={props.text}
                               value={props.value}
            />
        );
    },
    erro: (props) => {
        return(
            <DivAvisoStructure className="aviso erro"
                               text={props.text}
                               value={props.value}
            />
        );
    },
    validacao: (props) => {
        return(
            <DivAvisoStructure className="aviso validacao"
                               text={props.text}
                               value={props.value}
            />
        );
    }
}

const DivAvisoStructure = (props) => {
    return(
        <span className={props.value ? props.className + ' visivel' : props.className + ' invisivel' }>
            {props.text}
        </span>
    );
}

export default DivAviso;