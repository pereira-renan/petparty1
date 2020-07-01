import React, { useEffect, Component, useState } from 'react';
import Button from '../../components/Button/index';

import './styles.css';


const lista = [
    {id: 1, foto: "https://avatars0.githubusercontent.com/u/44417337?s=460&v=4", nome: "Joao", telefone: "+55 (13) 9999-9999", distancia: 10},
    {id: 2, foto: "https://avatars0.githubusercontent.com/u/44417337?s=460&v=4", nome: "Ricardo", telefone: "+55 (13) 9999-9999", distancia: 10},
    {id: 3, foto: "https://avatars0.githubusercontent.com/u/44417337?s=460&v=4", nome: "Kleber", telefone: "+55 (13) 9999-9999", distancia: 10},
    {id: 4, foto: "https://avatars0.githubusercontent.com/u/44417337?s=460&v=4", nome: "Kleber", telefone: "+55 (13) 9999-9999", distancia: 10}

]


const UsuariosList = (props) => {

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
                { lista.map(user => 
                    <tr>
                        <td>
                            <img src={user.foto}/>
                        </td>
                        <td>{user.nome}</td>
                        <td>{user.telefone || "-"}</td>
                        <td className="dispensavel">{user.distancia}km</td>
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