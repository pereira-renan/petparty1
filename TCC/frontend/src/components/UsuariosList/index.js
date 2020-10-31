import React, { useEffect, Component, useState } from 'react';
import Button from '../../components/Button/index';

import './styles.css';


const lista = []


const UsuariosList = (props) => {

    const listaProviders = props.lista === undefined? [] : props.lista;

    return(
        <table>
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
                        <td className="dispensavel">{user.km}</td>
                        <td>
                            <Button.secundario type="button" name="chamar" text="Chamar" href="#"/>
                        </td>
                    </tr>
                ) }
            </tbody>
        </table>
    );
}

export default UsuariosList;