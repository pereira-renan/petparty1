import React, { useEffect, Component, useState } from 'react';
import Button from '../../components/Button/index';

import './styles.css';

const lista = []

const UsuariosList = (props) => {

    let estadoBotao = false;

    function setLocationAlvo(e) {
        window.location.reload();
    }

    function updateLocationAlvo(locationAlvo) {
        console.log('LOCATION: ' + locationAlvo);
        sessionStorage.setItem('locationAlvo', locationAlvo);
        if(estadoBotao) {
            setLocationAlvo();
        }
    }

    function setaEstadoBotaoTrue() {
        estadoBotao = true;
    }

    function setaEstadoBotaoFalse() {
        estadoBotao = false;
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
                    <tr key={user._id} onMouseDown={e => updateLocationAlvo(user.coordinates.coordinates)} onMouseUp={props.onMouseUp}>
                        <td>
                            <img src={user.url}/>
                        </td>
                        <td>{user.nome}</td>
                        <td>{user.telefone || "-"}</td>
                        <td className="dispensavel">{user.km} Km</td>
                        <td>
                            <Button.secundario type="button" name="chamar" text="Perfil" 
                            onMouseEnter={e => setaEstadoBotaoTrue()} onMouseLeave={e => setaEstadoBotaoFalse()}
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