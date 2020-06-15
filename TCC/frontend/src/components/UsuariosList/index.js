import React, { useEffect } from 'react';


import api from "../../services/api";

const listaCuidadoresApi = () => {
    api.get("providers").then(response => {
        console.log(response.data)
        listaCuidadores = JSON.parse(response.data);
        console.log(listaCuidadores)
        return listaCuidadores;
    })
}

const listaCuidadores = listaCuidadoresApi() || [];

const UsuariosList = (props) => {
    return(
        <ul>
            {listaCuidadores.map(cuidador => <li>{cuidador.nome}</li>)}
        </ul>
    );
}

export default UsuariosList;