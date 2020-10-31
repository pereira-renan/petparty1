import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import Header from '../common/template/header';
import ContentHeader from '../common/template/contentHeader';
import SideBar from '../common/template/sideBar';
import Content from '../common/template/content';
import Input from '../../components/Input/index';
import Row from '../common/layout/row'

import UsuariosList from '../../components/UsuariosList/index';

import api from "../../services/api";

import "./styles.css";
export default function Dashboard() {
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
      console.log(response.data);
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
    <Content title="Dashboard">
      <div className="row">
        <div className="col-xs-7 col-md-5">
          <div id="box-mapa" className="box">
            <div className="titulo-card form-user">
              <h4>Mapa</h4>
            </div> 
            <img src="https://i.stack.imgur.com/yEshb.gif"/>
          </div>   
        </div>

        <div className="col-xs-12 col-md-7">
          <div id="box-lista" className="box">
            <div className="titulo-card form-user">
              <h4>Lista</h4>
            </div> 
            <Input.text value={distancia} onChange={e => setDistancia(e.target.value)} type="number" placeHolder="Distancia em Km" />
            <UsuariosList lista={usersList}/>
          </div>
        </div>
      </div>
    </Content>
  </div>
  );
}
