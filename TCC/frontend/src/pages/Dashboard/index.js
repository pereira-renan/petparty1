import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import Header from '../common/template/header';
import ContentHeader from '../common/template/contentHeader';
import SideBar from '../common/template/sideBar';
import Content from '../common/template/content';
import Input from '../../components/Input/index';
import Row from '../common/layout/row'
import Mapa2 from '../../components/Mapa2/index';

import UsuariosList from '../../components/UsuariosList/index';

import api from "../../services/api";

import "./styles.css";
export default function Dashboard() {
  const history = useHistory();

  const [key, setKey] = useState();
  const [distancia, setDistancia] = useState("3");
  const [location, setLocation] = useState([]);

  const [infoUser, setInfo] = useState([]);
  const [usersList, setUsersList] = useState([]);
  let paginasUsersList = 0;

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    api.get("info", {
      headers: {
        token: sessionStorage.getItem("token")
      }
    }).then(response => {
      setInfo(response.data);
      setLocation(response.data.location.coordinates);
      setKey(Math.random())
      //console.log(response.data);
    })
  }, [sessionStorage.getItem("token")])

  useEffect(() => {
    api.get("searchProviders", {
      headers: {
        token: sessionStorage.getItem("token")
      },
      params: {
        latitude: '' + location[1],
        longitude: '' + location[0],
        distancia: distancia * 1000
     }
    }).then(response => {
      console.log(response.data)
      setUsersList(response.data);

      if(response.data.length > 0) {
        paginasUsersList = (response.data.length / 3) + 0.99;
      }
    })
  }, [distancia, location])

  return (
    <div>
    <Header/>
    <SideBar/>
    <Content title="Dashboard">
      <div className="row">
        <div className="col-xs-12">
          <div id="box-mapa" className="box">
            <div className="titulo-card form-user">
              <h4>Mapa</h4>
            </div> 
            <Mapa2 
              coordinates={location}
              distancia={distancia}
              key={key}
              >
            </Mapa2>
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
              <UsuariosList lista={usersList} listaCoordenadas={usersList.location} nomeUsuario={infoUser.nome} onMouseUp={e => setKey(Math.random())} />
            </div>
          </div>
        </div>
      </div>
    </Content>
  </div>
  );
}
