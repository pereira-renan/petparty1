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
                            validado={typeof props.validado === "undefined" || props.value === '' || props.validado}
                            disabled={props.disabled}
            />
        );
    },
    radio: (props) => {
        return(
            <InputRadioStructure name="inputRadio"
                                 value={props.value}
                                 onClick={props.onClick}
                                 className="input input-radio"
                                 htmlFor={props.htmlFor}
                                 id={props.id}
                                 text={props.text}
            />
        );
    }
}

const InputTextStructure = (props) => {
    return(
        <input type={props.type}
               name={props.name}
               placeholder={props.placeHolder}
               value={props.value}
               onBlur={props.onBlur}
               onChange={props.onChange}
               autoComplete="off"
               className={props.validado ? props.className : props.className + ' invalido'}
               disabled={props.disabled}
        />
    );
}

const InputRadioStructure = (props) => {
    return(
        <div>
            <label className={props.value ? props.className + ' input-radio-checked' : props.className} 
                   htmlFor={props.htmlFor}>
                       {props.text}
            </label>
            <input type="radio"
                   id={props.id}
                   name={props.name}
                   value={props.value}
                   onClick={props.onClick}
                   className={props.className}
            />
        </div>
    );
}

export default Input;