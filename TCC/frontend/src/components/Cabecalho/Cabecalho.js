import React, { Component } from "react";
import "./Cabecalho.css";
import BotaoNav from "./BotaoNav";
import Navbar from "./Navbar";

class Cabecalho extends Component {
    render() {
        return (
            <div>
                <header class="container-fluid bg-success">
                    LOGO
                    <Navbar>
                        <BotaoNav nome="Login" />
                        <BotaoNav nome="Cadastro" />
                    </Navbar>
                </header>
            </div>
        );
    }
}

export default Cabecalho;