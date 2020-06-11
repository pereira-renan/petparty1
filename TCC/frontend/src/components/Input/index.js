import React from 'react';
import './styles.css';

const Input = {
    text: (props) => {
        return(
            <InputTextStructure type={props.type}
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
    radio: (props) => {
        return(
            <InputRadioStructure />
        );
    }
}

const InputTextStructure = (props) => {
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

const InputRadioStructure = (props) => {
    return(
        <input type="radio">
            {props.children}
        </input>
    );
}

export default Input;