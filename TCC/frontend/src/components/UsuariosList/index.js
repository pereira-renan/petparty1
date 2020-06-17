import React, { useEffect } from 'react';
import Button from '../../components/Button/index';

import './styles.css';

import api from "../../services/api";

const listaCuidadoresApi = () => {
    /*
    api.get("providers").then(response => {
        console.log(response.data)
        listaCuidadores = JSON.parse(response.data);
        console.log(listaCuidadores)
        return listaCuidadores;
    })
    */
}

const listaCuidadores = listaCuidadoresApi() || [];

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
                <tr>
                    <td>
                        <img src="https://avatars0.githubusercontent.com/u/44417337?s=460&v=4"/>
                    </td>
                    <td>Cláudio Gomes</td>
                    <td>(13) 99999-9999</td>
                    <td className="dispensavel">10km</td>
                    <td>
                        <Button.secundario type="button" name="chamar" text="Chamar" href="#"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <img src="https://avatars0.githubusercontent.com/u/44417337?s=460&v=4"/>
                    </td>
                    <td>Lucas</td>
                    <td>(13) 9999-9999</td>
                    <td className="dispensavel">20km</td>
                    <td>
                        <Button.secundario type="button" name="chamar" text="Chamar" href="#"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <img src="https://avatars0.githubusercontent.com/u/44417337?s=460&v=4"/>
                    </td>
                    <td>Lucas</td>
                    <td>(13) 9999-9999</td>
                    <td className="dispensavel">20km</td>
                    <td>
                        <Button.secundario type="button" name="chamar" text="Chamar" href="#"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <img src="https://avatars0.githubusercontent.com/u/44417337?s=460&v=4"/>
                    </td>
                    <td>Lucas</td>
                    <td>(13) 9999-9999</td>
                    <td className="dispensavel">20km</td>
                    <td>
                        <Button.secundario type="button" name="chamar" text="Chamar" href="#"/>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default UsuariosList;