import React, { useEffect, Component, useState } from 'react';
import Button from '../../components/Button/index';

import './styles.css';


const lista = []


const UsuariosList = (props) => {

    const listaProviders = props.lista === undefined? [] : props.lista;

    return(
        <table className="table table-hover">
            <thead>
                <th className="campo-1">Foto</th>
                <th>Nome</th>
                <th>Telefone</th>
                <th className="dispensavel">Distância</th>
                <th>Ação</th>
            </thead>
            <tbody>
                { listaProviders.map(user => 
                    <tr key={user._id}>
                        <td>
                            <img src={user.url}/>
                        </td>
                        <td>{user.nome}</td>
                        <td>{user.telefone || "-"}</td>
                        <td className="dispensavel">{user.km} Km</td>
                        <td>
                            <Button.secundario type="button" name="chamar" text="Chamar" 
                            href={`https://api.whatsapp.com/send?phone=${user.telefone}&text=Olá!%20Encontrei%20seu%20contato%20pelo%20PetParty!%20Me%20chamo%20${user.nome},%20podemos%20conversar` } 
                            target="_blank"/>
                        </td>
                    </tr>
                ) }
            </tbody>
        </table>
    );
}

export default UsuariosList;