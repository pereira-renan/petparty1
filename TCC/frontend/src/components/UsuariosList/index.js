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
                            <Button.secundario type="button" name="chamar" text="Chamar" href={`https://wa.me/${user.telefone}` } target="_blank"/>
                        </td>
                    </tr>
                ) }
            </tbody>
        </table>
    );
}

export default UsuariosList;