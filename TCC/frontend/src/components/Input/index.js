import React from 'react';
import './styles.css';

const Input = {
    text: (props) => {
        return(
            <InputStructure type={props.type}
                            name="inputText"
                            placeHolder={props.placeHolder}
                            value={props.value}
                            onBlur={props.onBlur}
                            onChange={props.onChange}
                            className="input input-texto"
                            value={props.value}
                            validado={typeof props.validado === "undefined" || props.validado}
            />
        );
    },
}

const InputStructure = (props) => {
    return(
        <input type={props.type}
               name={props.name}
               placeHolder={props.placeHolder}
               value={props.value}
               onBlur={props.onBlur}
               onChange={props.onChange}
               className={props.validado ? props.className : props.className + ' invalido'}
        />
    );
}

export default Input;