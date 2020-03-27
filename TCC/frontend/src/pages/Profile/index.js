import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import "./styles.css";
export default function Profile() {
  // const history = useHistory();
  // const ongId = localStorage.getItem("ongId");
  // const ongName = localStorage.getItem("ongName");
  // const [incidents, setIncidents] = useState([]);

  // useEffect(() => {
  //   api.get("profile", { headers: { Authorization: ongId } }).then(response => {
  //     setIncidents(response.data);
  //   });
  // }, [ongId]);

  // async function handleDeleteIncident(id) {
  //   try {
  //     await api.delete(`incidents/${id}`, {
  //       headers: {
  //         Authorization: ongId
  //       }
  //     });
  //     // filtrando os incidentes deletados
  //     setIncidents(incidents.filter(incident => incident.id !== id));
  //   } catch (error) {
  //     alert("erro ao deletar o caso");
  //   }
  // }

  // function handleLogout(){
  //   localStorage.clear();
  //   history.push('/');

  // }

  return (
    <div className="profile-container">
      <header>
        <span>Bem Vinda , }</span>
        <Link className="button" to="/incidents/new">
          {" "}
          Cadastrar novo Caso
        </Link>
      
      </header>
      <h1>Informações Pessoais</h1>
      <ul>
        <li>
          <p> Nome</p>
          <p> Email</p>
          <p> CPF</p>
          <p> Nome</p>
          <p> Nome</p>
          <p> Nome</p>
        </li>
      </ul>
    </div>
  );
}
