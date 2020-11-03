import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import Header from '../common/template/header';
import ContentHeader from '../common/template/contentHeader';
import SideBar from '../common/template/sideBar';
import Content from '../common/template/content';
import Input from '../../components/Input/index';

import ValueBox from '../common/widget/valueBox'
import ValueBoxNew from '../common/widget/valueBoxNew'
import Row from '../common/layout/row'

import UsuariosList from '../../components/UsuariosList/index';

import api from "../../services/api";

import "./styles.css";
export default function Profile() {
  const history = useHistory();

  const [infoUser, setInfo] = useState([]);
  const [infoPets, setInfoPets] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    api.get("info", {
      headers: {
        token: localStorage.getItem("token")
      }
    }).then(response => {
      console.log(response.data)
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
  }, infoPets)

  async function deletePet(id) {
    api.delete("pet/delete", {
      headers: {
        token: localStorage.getItem("token")
      },
      params: {
        id_pet: id
      }
    }).then(response => {
      console.log(response.data)
    })
  }

  return (
    <div>
      <Header userName={infoUser.nome} userCuidador={infoUser.user_cuidador} createdAt={infoUser.createdAt === undefined ? '' : infoUser.createdAt.slice(0, 10)} urlImg={infoUser.url}/>
      <SideBar/>
      <Content title="Pets">
        <div className="row">
          <div className="col-xs-12">
            <div className="box box-pets">
              <div className="titulo-card">
                <h4>Meus Pets</h4>
              </div> 
              {infoPets.map((value, index) => {
                return <ValueBox cols='12 12 6' key={index} idPet={value._id} color={value.tipo_pet} icon='paw'
                    value={`${value.nome}`} tipo={value.tipo_pet} porte={value.porte} idade={value.idade}>
                      <button id="delete-valuebox" onClick={deletePet(value._id)} >X</button>
                  </ValueBox>
              })}
            </div>
          </div>

          <div className="col-xs-12">
            <div className="box box-newPet">
              <div className="titulo-card">
                <h4>Novo Pet</h4>
              </div> 
              <ValueBoxNew cols='12 12 6' color="NovoPet"/>
            </div>
          </div>
        </div>
      </Content>
  </div>
  );
}
