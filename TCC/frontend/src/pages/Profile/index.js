import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import Header from '../common/template/header';
import ContentHeader from '../common/template/contentHeader';
import SideBar from '../common/template/sideBar';
import Content from '../common/template/content';
import Input from '../../components/Input/index';

import ValueBox from '../common/widget/valueBox'
import Row from '../common/layout/row'

import UsuariosList from '../../components/UsuariosList/index';

import api from "../../services/api";

import "./styles.css";
export default function Profile() {
  const history = useHistory();

  const [distancia, setDistancia] = useState("");

  const [infoUser, setInfo] = useState([]);
  const [infoPets, setInfoPets] = useState([]);

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
    api.get("pets", {
      headers: {
        token: localStorage.getItem("token")
      }
    }).then(response => {
      setInfoPets(response.data);
      console.log(response.data)
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
      <Header userName={infoUser.nome} userCuidador={infoUser.user_cuidador} createdAt={infoUser.createdAt === undefined ? '' : infoUser.createdAt.slice(0, 10)}/>
      <SideBar/>
      <Content title="Perfil">
        <div className="row">
          <div className="col-xs-8 col-md-6">
            <div className="box">
              <div className="titulo-card form-user">
                <h4>Informações</h4>
              </div> 
              <form name="formUsuario">
                <input id="id" name="id" type="hidden" value={infoUser._id}></input>
                <br/>
                <label htmlFor="name">Nome</label><br/>
                <input id="nome" name="nome" type="text" value={infoUser.nome}></input>
                <br/>
                <label htmlFor="email">Email</label><br/>
                <input id="email" name="email" type="text" value={infoUser.email}></input>
                <br/>
                <label htmlFor="cpf">Cpf</label><br/>
                <input id="cpf" name="cpf" type="text" value={infoUser.cpf}></input>
                <br/>
                <label htmlFor="telefone">Telefone</label><br/>
                <input id="telefone" name="telefone" type="text" value={infoUser.telefone}></input>
                <br/>
                <label htmlFor="cuidador">Cuidador?</label><br/>
                <input id="cuidador" name="cuidador" type="text" value={infoUser.user_cuidador}></input>
                <br/>
                <input id="btnAtualizar" name="btnAtualizar" type="submit" value="Atualizar"></input>
              </form>
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="box">
              <div className="titulo-card">
                <h4>Pets</h4>
              </div> 
              {infoPets.map((value, index) => {
                return <ValueBox cols='12 6' key={index} idPet={value._id} color={value.tipo_pet} icon='paw'
                  value={`${value.nome}`} text={value.tipo_pet}/>
              })}
            </div>
          </div>
        </div>
      </Content>
  </div>
  );
}
