import React, { Component } from "react";
import "./BotaoNav.css"

var setaHref = (props) => {

    if(props.nome === "Login") {
        return "/";
    }
    else if(props.nome === "Cadastrar") {
        return "/register";
    }
    return "/";

}

const BotaoNav = (props) => {
    return(
        <li>
            <a href={setaHref(props)}>{props.nome}</a>
        </li>
    );
}

export default BotaoNav;
