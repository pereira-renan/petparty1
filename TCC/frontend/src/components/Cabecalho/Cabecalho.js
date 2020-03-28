import React, { Component } from "react";
import "./Cabecalho.css";
import BotaoNav from "./BotaoNav";

const Navbar = () => {
    return(
        <ul>
            <BotaoNav nome="Login" />
            <BotaoNav nome="Cadastrar" />
        </ul>
    );
}

class Cabecalho extends Component {
    render() {
        return (
            <div>
                <header>
                    <div id="cabecalho" class="container-fluid">
                        <Navbar />
                    </div>
                </header>
            </div>
        );
    }
}

export default Cabecalho;