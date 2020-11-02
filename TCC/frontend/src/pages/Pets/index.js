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
      <Header userName={infoUser.nome} userCuidador={infoUser.user_cuidador} createdAt={infoUser.createdAt === undefined ? '' : infoUser.createdAt.slice(0, 10)} urlImg={infoUser.url}/>
      <SideBar/>
      <Content title="Perfil">
        <div className="row">
          <div className="col-xs-12">
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
