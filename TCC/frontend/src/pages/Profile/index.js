import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import Header from '../common/template/header';
import ContentHeader from '../common/template/contentHeader';
import Input from '../../components/Input/index';

import UsuariosList from '../../components/UsuariosList/index';

import api from "../../services/api";

import "./styles.css";
export default function Profile() {
  const history = useHistory();

  const [distancia, setDistancia] = useState("5");

  const [infoUser, setInfo] = useState([]);
  const [usersList, setUsersList] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    api.get("info", {
      headers: {
        token: localStorage.getItem("token")
      }
    }).then(response => {
      setInfo(response.data);
    })
  }, [localStorage.getItem("token")])

  useEffect(() => {
    api.get("searchProviders", {
      headers: {
        token: localStorage.getItem("token")
      },
      params: {
        latitude: "-23.9773083",
        longitude: "-46.4494753",
        distancia: distancia * 1000
      }
    }).then(response => {
      setUsersList(response.data);
      //setInfo(response.data);
    })
  }, distancia)

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
    <div>
      <Header/>
      
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
          </li>
        </ul>
        <Input.text value={distancia} onChange={e => setDistancia(e.target.value)} type="number" placeHolder="Distancia em Km" />
        <UsuariosList lista={usersList}/>
      </div>
    </div>
  );
}
