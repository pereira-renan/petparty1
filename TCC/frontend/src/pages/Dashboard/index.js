import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import Header from '../common/template/header';
import ContentHeader from '../common/template/contentHeader';
import SideBar from '../common/template/sideBar';
import Content from '../common/template/content';
import Input from '../../components/Input/index';
import Row from '../common/layout/row'
import Mapa from '../../components/Mapa/index';

import UsuariosList from '../../components/UsuariosList/index';

import api from "../../services/api";

import "./styles.css";
export default function Dashboard() {
  const history = useHistory();

  const [estadoMapa, setEstadoMapa] = useState(false);
  const [temDestino, setTemDestino] = useState(false);
  const [distancia, setDistancia] = useState("5000");
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
      //console.log(response.data);
    })
  }, [sessionStorage.getItem("token")])

  useEffect(() => {
    api.get("searchProviders", {
      headers: {
        token: sessionStorage.getItem("token")
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
            <Mapa 
              estadoMapa={estadoMapa}
              coordinates={location}
              distancia={distancia}
              >
            </Mapa>
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
              <UsuariosList lista={usersList} listaCoordenadas={usersList.location} nomeUsuario={infoUser.nome} atualizaEstadoMapa={e => setEstadoMapa(!estadoMapa)} />
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
