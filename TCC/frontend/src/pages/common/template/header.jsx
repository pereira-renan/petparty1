import React from 'react'
import { useHistory } from "react-router-dom";

export default function Header(props) {

    const history = useHistory();

    async function handleLogout(e) {
        localStorage.clear("token");
        history.push("/");
    }
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
                                <img src={props.urlImg} className="user-image" alt="User Image"/>
                                <span className="hidden-xs">{props.userName}</span>
                            </a>
                            <ul className="dropdown-menu">
    
                            <li className="user-header">
                                <img src={props.urlImg} className="img-circle" alt="User Image"/>
    
                                <p>
                                {props.userName}
                                <br/> 
                                ({props.userCuidador ? 'Cuidador' : 'Usuário'})
                                <small>Membro desde {props.createdAt.split('-').reverse().join('/')}</small>
                                </p>
                            </li>
                            
                            <li className="user-footer">
                                <div className="pull-left">
                                <a href="/profile" className="btn btn-default btn-flat">Perfil</a>
                                </div>
                                <div className="pull-right">
                                <a href="#" onClick={handleLogout} className="btn btn-default btn-flat">Sair</a>
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