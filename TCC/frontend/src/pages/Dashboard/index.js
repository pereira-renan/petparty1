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

  const [distancia, setDistancia] = useState("50");

  const [infoUser, setInfo] = useState([]);
  const [usersList, setUsersList] = useState([]);
  let paginasUsersList = 0;

  const [location, setLocation] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    api.get("info", {
      headers: {
        token: localStorage.getItem("token")
      }
    }).then(response => {
      setInfo(response.data);
      setLocation(response.data.location.coordinates);
      //console.log(response.data);
    })
  }, [localStorage.getItem("token")])

  useEffect(() => {
    api.get("searchProviders", {
      headers: {
        token: localStorage.getItem("token")
      },
      params: {
        latitude: '' + location[0],
        longitude: '' + location[1],
        distancia: distancia * 1000
     }
    }).then(response => {
      setUsersList(response.data);

      if(response.data.length > 0) {
        paginasUsersList = (response.data.length / 3) + 0.99;
      }
      console.log(paginasUsersList)
      //console.log(response.data)
    })
  }, [distancia, location])

  return (
    <div>
    <Header userName={infoUser.nome} userCuidador={infoUser.user_cuidador} createdAt={infoUser.createdAt === undefined ? '' : infoUser.createdAt.slice(0, 10)} urlImg={infoUser.url}/>
    <SideBar/>
    <Content title="Dashboard">
      <div className="row">
        <div className="col-xs-12">
          <div id="box-mapa" className="box">
            <div className="titulo-card form-user">
              <h4>Mapa</h4>
            </div> 
            <iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3646.502958300999!2d-${location[0]}!3d-${location[1]}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce024465fa95bf%3A0x1e411e16e8228ce3!2sFatec%20Rubens%20Lara!5e0!3m2!1spt-BR!2sbr!4v1604246662323!5m2!1spt-BR!2sbr`}>
            </iframe>
          </div>   
        </div>

        <div className="col-xs-12">
          <div className="box">
            <div className="box-header">
              <div className="box-title">
                <h4>Lista</h4>
              </div> 
              <div className="box-tools">
                <span className="label-filter-list">Distância máxima em Km: </span>
                <div className="input-group input-group-sm">
                  <Input.text id="input-filter-list" value={distancia} onChange={e => setDistancia(e.target.value)} type="number" placeHolder="Distancia em Km" />
                </div>
              </div>
            </div>
            <div className="box-body table-responsive no-padding">
              <UsuariosList lista={usersList} nomeUsuario={infoUser.nome}/>
            </div>
            <div className="box-footer clearfix">
              <ul className="pagination pagination-sm no-margin pull-right">
                {
                  
                }
                <li>
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Content>
  </div>
  );
}
