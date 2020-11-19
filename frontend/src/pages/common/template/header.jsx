import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "../../../services/api";
import Button from "../../../components/Button/index"

export default function Header(props) {

    const history = useHistory();
    const [infoUser, setInfoUser] = useState([]);

    if(sessionStorage.getItem("token") === null) {
        history.push("/");
    }

    async function handleLogout(e) {
        sessionStorage.clear("token");
        history.push("/");
    }

    useEffect(() => {
        api.get("info", {
            headers: {
                token: sessionStorage.getItem("token")
            }
        }).then(response => {
            setInfoUser(response.data);
        })
    }, [props.atualiza])

    return(
        <header className='main-header'>
            <a href='/dashboard' className='logo'>
                <span className='logo-mini'><b>Pet</b>P</span>
                <span className='logo-lg'>
                    <i className='fa fa-paw'></i>
                    <b>Pet</b>Party
                </span>        
            </a>
            <nav className='navbar navbar-static-top'>
                <a href="#" className='sidebar-toggle' data-toggle='push-menu' role='button'>
                    <span className="sr-only">Toggle navigation</span>
                </a>
    
                <div className="navbar-custom-menu">
                    <ul className="nav navbar-nav">
                        <li className="dropdown user user-menu">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <img src={infoUser.url} className="user-image" alt="User Image"/>
                                <span className="hidden-xs">{infoUser.nome}</span>
                            </a>
                            <ul className="dropdown-menu">
    
                            <li className="user-header">
                                <img src={infoUser.url} className="img-circle" alt="User Image"/>
    
                                <p>
                                {infoUser.nome}
                                <br/> 
                                ({infoUser.user_cuidador ? 'Cuidador' : 'Usuário'})
                                <small>Membro desde {infoUser.createdAt === undefined ? "" : (infoUser.createdAt.slice(0, 10)).split('-').reverse().join('/')}</small>
                                </p>
                            </li>
                            
                            <li className="user-footer">
                                <div className="pull-left">
                                    <Button.secundario type="button" name="perfil" text="Perfil" 
                                        href={`/profile/`}/>
                                </div>
                                <div className="pull-right">
                                    <Button.secundario type="button" name="sair" text="Sair" onClick={handleLogout}
                                        href={`/`}/>
                                </div>
                            </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}