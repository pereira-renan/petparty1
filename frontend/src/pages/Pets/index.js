import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import Header from '../common/template/header';
import ContentHeader from '../common/template/contentHeader';
import SideBar from '../common/template/sideBar';
import Content from '../common/template/content';
import Input from '../../components/Input/index';
import Button from '../../components/Button/index';
import Grid from '../common/layout/grid';
import DivAviso from '../../components/DivAviso/index';

import ValueBox from '../common/widget/valueBox'
import Row from '../common/layout/row'

import UsuariosList from '../../components/UsuariosList/index';

import api from "../../services/api";

import "./styles.css";
export default function Profile() {
  const history = useHistory();

  const [infoPets, setInfoPets] = useState([]);

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [raca, setRaca] = useState("");
  const [tipo_pet, setTipoPet] = useState("NovoPet");
  const [porte, setPorte] = useState("");

  const [newNome, setNewNome] = useState("");
  const [newIdade, setNewIdade] = useState("");
  const [newRaca, setNewRaca] = useState("");
  const [newTipo_pet, setNewTipoPet] = useState("NovoPet");
  const [newPorte, setNewPorte] = useState("");

  const [atualiza, setAtualiza] = useState(true);
  const [petSelecionado, setPetSelecionado] = useState([]);
  const [editPetSelecionado, setEditPetSelecionado] = useState([]);
  const [flagSetStatesNewInfos, setFlagSetStatesNewInfos] = useState(false);

  const [validacaoNome, setValidacaoNome] = useState(true);

  const [catchSuccess, setCatchSuccess] = useState(false);

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    api.get("pets", {
      headers: {
        token: sessionStorage.getItem("token")
      }
    }).then(response => {
      setInfoPets(response.data);
    })
  }, [atualiza])

  async function adicionaPet(e) {
    setCatchSuccess(false);
    const infos = { nome, idade, raca, tipo_pet, porte };
    if(nome === '' || (idade === '' || idade < 0) || (raca === '' || raca === 'Selecione o tipo') || tipo_pet === 'NovoPet' || (porte === '' || porte === 'Selecione o porte')) {
      alert('PREENCHA TODOS OS CAMPOS DO PET A SER ADICIONADO');
      return;
    }
    try {
        const response = await api.post("pet/create", infos, {
          headers: {
            token: sessionStorage.getItem("token")
          }
        }).then(() => {
          setCatchSuccess(true);
          setNome("");
          setTipoPet("NovoPet");
          setRaca("");
          setPorte("");
          setIdade("");
        });
        setAtualiza(!atualiza);
        setTimeout(() => {
					setCatchSuccess(false);
				}, 4000);
    } catch (error) {
        console.log(error)
    }
  }

  async function deletePet() {
    api.delete("pet/delete", {
      headers: {
        token: sessionStorage.getItem("token"),
        id_pet: petSelecionado
      }
    }).then(response => {
      setAtualiza(!atualiza);
    })
  }

  function updatePet() {
    setEditPetSelecionado(petSelecionado);
    setFlagSetStatesNewInfos(true);
  }

  async function confirmUpdatePet() {
    const infos = { 
      nome: newNome, 
      idade: newIdade, 
      raca: newRaca, 
      tipo_pet: newTipo_pet, 
      porte: newPorte 
    };
    console.log(infos)
    if(newNome === '' || (newIdade === '' || newIdade < 0) || (newPorte === '' || newPorte === 'Selecione o porte')) {
      alert('PREENCHA TODOS OS CAMPOS DO PET A SER ATUALIZADO');
      return;
    }
    api.put("pet/update", infos, {
      headers: {
        //token: sessionStorage.getItem("token"),
        id_pet: petSelecionado
      }
    }).then(response => {
      setEditPetSelecionado([]);
      setAtualiza(!atualiza);
    })
  }

  return (
    <div>
      <Header/>
      <SideBar/>
      <Content title="Pets">
        <div className="row">
        <div className="col-xs-12">
            <div className="box box-newPet">
              <div className="titulo-card">
                <h4>Novo Pet</h4>
              </div> 
              <Grid cols="12 12 6">
                <div className={`small-box box-NovoPet bg-${tipo_pet}`}>
                    <div className='inner'>
                        <form id="form-novo-pet">
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
                                    <select className="form-control" onChange={e => setTipoPet(e.target.value)} value={tipo_pet} required>
                                        <option value="NovoPet">Selecione o tipo</option>
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
                                <Input.text value={idade} type="number" onChange={e => setIdade(e.target.value)}/>
                            </div>
                        </form>
                    </div>
                    <div className='icon'>
                        <i className={`fa fa-`}></i>
                    </div>
                </div>
                <Button.secundario id="btnAdicionar" type="submit" name="btnAdicionar" text="Adicionar" onClick={adicionaPet}/>
              </Grid>
            </div>
          </div>

          <div className="col-xs-12">
            <div className="box box-pets">
              <div className="titulo-card">
                <h4>Meus Pets</h4>
              </div> 
              {infoPets.map((value, index) => {
                let icon;
                switch(value.tipo_pet) {
                  case 'Cachorro':
                    icon = 'fa fa-paw';
                    break;
                  case 'Gato':
                    icon = 'fa fa-paw';
                    break;
                  case 'Peixe':
                    icon = 'fa fa-paw';
                    break;
                  default:
                    icon = 'fa fa-paw';
                }
                if(editPetSelecionado === value._id) {
                  if(flagSetStatesNewInfos) {
                    setNewNome(value.nome);
                    setNewTipoPet(value.tipo_pet);
                    setNewRaca(value.raca);
                    setNewPorte(value.porte);
                    setNewIdade(value.idade);

                    setFlagSetStatesNewInfos(false);
                  }
                  return <Grid cols="12 12 6" key={index}>
                    <div className={`small-box box-atualizaPet bg-${value.tipo_pet}`} onMouseEnter={e => setPetSelecionado(value._id)}>
                        <div className='inner'>
                            <button id="confirmUpdate-valuebox" className="col-xs-1" onClick={confirmUpdatePet}>
                              <i className='fa fa-check'></i>
                            </button>
                            <form id="form-atualiza-pet">
                                <div className="col-xs-2">
                                    <label>Nome:</label>
                                    <label>Tipo:</label>
                                    <label>Raça:</label>
                                    <label>Porte:</label>
                                    <label>Idade:</label>
                                </div>
                                <div className="col-xs-9">
                                    <Input.text value={newNome} type="text" onChange={e => setNewNome(e.target.value)} />
                                    <div className="formGroup">
                                        <select className="form-control" value={newTipo_pet} disabled>
                                            <option value="NovoPet">Selecione o tipo</option>
                                            <option value="Cachorro">Cachorro</option>
                                            <option value="Gato">Gato</option>
                                            <option value="Peixe">Peixe</option>
                                        </select>
                                    </div>
                                    <Input.text value={newRaca} type="text" disabled/>
                                    <div className="formGroup">
                                        <select className="form-control" onChange={e => setNewPorte(e.target.value)} value={newPorte}>
                                            <option>Selecione o porte</option>
                                            <option value="Grande">Grande</option>
                                            <option value="Médio">Médio</option>
                                            <option value="Pequeno">Pequeno</option>
                                        </select>
                                    </div>
                                    <Input.text value={newIdade} type="number" onChange={e => setNewIdade(e.target.value)}/>
                                </div>
                            </form>
                        </div>
                        <div className='icon'>
                            <i className={`fa fa-`}></i>
                        </div>
                    </div>
                  </Grid>
                }
                return <ValueBox cols='12 12 6' onMouseEnter={e => setPetSelecionado(value._id)} key={index} url={value.url} idPet={value._id} color={value.tipo_pet} icon={icon}
                    value={`${value.nome}`} tipo={value.tipo_pet} raca={value.raca} porte={value.porte} idade={value.idade}>
                      <button id="delete-valuebox" onClick={deletePet} >
                        <i className='fa fa-times'></i>
                      </button>
                      <button id="update-valuebox" onClick={updatePet} >
                        <i className='fa fa-edit'></i>
                      </button>
                  </ValueBox>
              })}
            </div>
          </div>

        </div>
      </Content>
  </div>
  );
}
