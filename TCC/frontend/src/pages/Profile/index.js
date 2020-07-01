import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import UsuariosList from '../../components/UsuariosList/index';

import api from "../../services/api";

import "./styles.css";
export default function Profile() {
  const history = useHistory();

  const [infoUser, setInfo] = useState([]);
  const [usersList, setUsersList] = useState([]);

  // pegando as variaveis do local storage
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  // console.log(token);
  // console.log(id);

  useEffect(() => {
    populaLista();
    api.post("info",{id} ).then(response => {
      setInfo(response.data);
    });
  }, [id]);

  async function populaLista() {
    setUsersList(await api.get("providers").then(response => {
      console.log(response);
    }))
  }

  /*
  useEffect(() => {
    api.get("providers").then(response => {
      console('a');
      console(response.data);
      setUsersList(response.data);
    });
  }, [id]);
  */
  //const usersList = await api.get("providers");

  return (
    <div className="profile-container">
      <header>
        <span>Bem Vindo, {infoUser.nome} </span>
     
      </header>
      <h1>Informações Pessoais</h1>
      <ul>
        <li>
          <p> Nome: {infoUser.nome}</p>
          <p> CPF : {infoUser.cpf}</p>
          <p> Email:{infoUser.email}</p>
          <p> Nome</p>
          <p> Nome</p>
          <p> Nome</p>
        </li>
      </ul>
      <UsuariosList lista={usersList}/>
    </div>
  );
}
