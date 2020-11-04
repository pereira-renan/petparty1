import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import Header from '../common/template/header';
import ContentHeader from '../common/template/contentHeader';
import SideBar from '../common/template/sideBar';
import Content from '../common/template/content';
import Input from '../../components/Input/index';
import Grid from '../common/layout/grid';

import ValueBox from '../common/widget/valueBox'
import Row from '../common/layout/row'

import UsuariosList from '../../components/UsuariosList/index';

import api from "../../services/api";

import "./styles.css";
export default function Profile() {
  const history = useHistory();

  const [infoUser, setInfo] = useState([]);
  const [infoPets, setInfoPets] = useState([]);

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [raca, setRaca] = useState("");
  const [tipo_pet, setTipoPet] = useState("");
  const [porte, setPorte] = useState("");

  const [atualiza, setAtualiza] = useState(true);
  const [petSelecionado, setPetSelecionado] = useState([]);

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
  }, [atualiza])

  async function adicionaPet(e) {
    const infos = { nome, idade, raca, tipo_pet, porte };
    try {
        const response = await api.post("pet/create", infos, {
            headers: {
                    token: localStorage.getItem("token")
                }
        });
        console.log(response)
        setAtualiza(!atualiza);
    } catch (error) {
        console.log(error)
    }
  }

  async function deletePet() {
    api.delete("pet/delete", {
      headers: {
        token: localStorage.getItem("token"),
        id_pet: petSelecionado
      }
    }).then(response => {
      console.log(response.data)
      setAtualiza(!atualiza);
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
                return <ValueBox cols='12 12 6' onMouseEnter={e => setPetSelecionado(value._id)} key={index} idPet={value._id} color={value.tipo_pet} icon='paw'
                    value={`${value.nome}`} tipo={value.tipo_pet} raca={value.raca} porte={value.porte} idade={value.idade}>
                      <button id="delete-valuebox" onClick={deletePet} >X</button>
                  </ValueBox>
              })}
            </div>
          </div>

          <div className="col-xs-12">
            <div className="box box-newPet">
              <div className="titulo-card">
                <h4>Novo Pet</h4>
              </div> 
              <Grid cols="12 12 6">
                <div className={`small-box bg-NovoPet`}>
                    <div className='inner'>
                        <form id="form-novo-pet" onSubmit="adicionaPet()">
                            <div className="col-xs-2">
                                <label>Nome:</label>
                                <label>Tipo:</label>
                                <label>Raça:</label>
                                <label>Porte:</label>
                                <label>Idade:</label>
                            </div>
                            <div className="col-xs-10">
                                <Input.text value={nome} type="text" onChange={e => setNome(e.target.value)} />
                                <div className="formGroup" >
                                    <select className="form-control" onChange={e => setTipoPet(e.target.value)} value={tipo_pet}>
                                        <option>Selecione o tipo</option>
                                        <option value="Cachorro">Cachorro</option>
                                        <option value="Gato">Gato</option>
                                        <option value="Peixe">Peixe</option>
                                    </select>
                                </div>
                                <Input.text value={raca} type="text" onChange={e => setRaca(e.target.value)}/>
                                <div className="formGroup">
                                    <select className="form-control" onChange={e => setPorte(e.target.value)} value={porte}>
                                        <option>Selecione o porte</option>
                                        <option value="Grande">Grande</option>
                                        <option value="Médio">Médio</option>
                                        <option value="Pequeno">Pequeno</option>
                                    </select>
                                </div>
                                <Input.text value={idade} type="text" onChange={e => setIdade(e.target.value)}/>
                            </div>
                        </form>
                    </div>
                    <div className='icon'>
                        <i className={`fa fa-`}></i>
                    </div>
                </div>
                <input id="btnAdicionar" name="btnAdicionar" type="submit" value="Adicionar" onClick={adicionaPet}></input>
              </Grid>
            </div>
          </div>
        </div>
      </Content>
  </div>
  );
}
