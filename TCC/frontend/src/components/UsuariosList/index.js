import React, { useEffect, Component, useState } from 'react';
import Button from '../../components/Button/index';

import './styles.css';

const lista = []

const UsuariosList = (props) => {

    function setLocationAlvo(e) {
        window.location.reload();
    }

    function updateLocationAlvo(locationAlvo) {
        localStorage.setItem('locationAlvo', locationAlvo);
        setLocationAlvo();
    }

    const listaProviders = props.lista === undefined? [] : props.lista;

    return(
        <table className="table table-hover">
            <thead>
                <tr>
                    <th className="campo-1">Foto</th>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th className="dispensavel">Distância</th>
                    <th>Ação</th>
                </tr>
            </thead>
            <tbody>
                { listaProviders.map(user => 
                    <tr key={user._id} onClick={e => updateLocationAlvo(user.coordinates)}>
                        <td>
                            <img src={user.url}/>
                        </td>
                        <td>{user.nome}</td>
                        <td>{user.telefone || "-"}</td>
                        <td className="dispensavel">{user.km} Km</td>
                        <td>
                            <Button.secundario type="button" name="chamar" text="Chamar" 
                            href={`/profile/${user._id}`} 
                            target="_blank"/>
                        </td>
                    </tr>
                ) }
            </tbody>
        </table>
    );
}

export default UsuariosList;