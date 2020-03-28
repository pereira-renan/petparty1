import React, { Component } from "react";
import "./BotaoNav.css"

var href = setaHref;

var setaHref = () => {
    if(this.props.nome === "Login") {
        href = "/";
    }
    else if(this.props.nome === "Cadastro") {
        href = "/register";
    }
    else {
        href = "/"
    }
}

class BotaoNav extends Component {
    render() {
        return (
            <li>
                <a href={href}>{this.props.nome}</a>
            </li>
        );
    }
}

export default BotaoNav;
