import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import Header from '../common/template/header';
import ContentHeader from '../common/template/contentHeader';
import SideBar from '../common/template/sideBar';
import Content from '../common/template/content';
import Input from '../../components/Input/index';
import Button from '../../components/Button/index';

import ValueBox from '../common/widget/valueBox'
import Row from '../common/layout/row'

import UsuariosList from '../../components/UsuariosList/index';

import api from "../../services/api";

import "./styles.css";
export default function Profile(props) {
  const history = useHistory();

  const [infoUser, setInfo] = useState([]);
  const [infoPets, setInfoPets] = useState([]);

  const [id, setId] = useState([]);
  const [url, setUrl] = useState([]);
  const [nome, setNome] = useState([]);
  const [email, setEmail] = useState([]);
  const [cpf, setCpf] = useState([]);
  const [telefone, setTelefone] = useState([]);
  const [endereco, setEndereco] = useState([]);
  const [descricao, setDescricao] = useState([]);
  const [cuidador, setCuidador] = useState([]);
  const [dono, setDono] = useState([]);
  const [criadoEm, setCriadoEm] = useState([]);
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);

  const [validacaoTipo, setValidacaoTipo] = useState(true);

  const token = localStorage.getItem("token");

  let flagPerfilPessoal = true;
  if(props.match.params.id !== undefined) {
    flagPerfilPessoal = false;
  }

  useEffect(() => {
    api.get("info", {
      headers: {
        token: localStorage.getItem("token")
      }
    }).then(response => {
      setInfo(response.data);
      console.log(response.data)

      setId(response.data.id);
      setUrl(response.data.url);
      setNome(response.data.nome);
      setEmail(response.data.email);
      setCpf(response.data.cpf);
      setTelefone(response.data.telefone);
      setCuidador(response.data.user_cuidador);
      setCriadoEm(response.data.createdAt);
      setLatitude(response.data.location.coordinates[0]);
      setLongitude(response.data.location.coordinates[1]);
      //setInfo(response.data);
    })
  }, [localStorage.getItem("token")])

  useEffect(() => {
    if(!flagPerfilPessoal) {
      api.get("pets", {
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(response => {
        setInfoPets(response.data);
        console.log(response.data)
      })
    }
  }, infoPets)

  function validaTipo(userCuidador) {
    if(userCuidador === '') {
      setValidacaoTipo(false);
      return false;
    }
    setTipo(userCuidador)
    setValidacaoTipo(true);
    return true;
  }

  function setTipo(isCuidador) {
    setCuidador(isCuidador);
    setDono(!isCuidador);
  }

  return (
    <div>
      <Header userName={infoUser.nome} userCuidador={infoUser.user_cuidador} createdAt={infoUser.createdAt === undefined ? '' : infoUser.createdAt.slice(0, 10)} urlImg={infoUser.url}/>
      <SideBar/>
      <Content title="Perfil">
        <div className="row">
          <div className="col-xs-12">
            <div className="box box-profile">
              <div className="titulo-card form-user">
                <h4>Informações</h4>
              </div> 
              <div className="col-xs-12 col-lg-7 form-profile">
                {flagPerfilPessoal ?
                  <>
                    <form name="formUsuario">
                      <input id="id" name="id" type="hidden" value={id}></input>
                      <label htmlFor="name">Nome Completo</label><br/>
                      <Input.text value={nome} onChange={e => setNome(e.target.value)} type="text" placeHolder="Nome" />
                      <label htmlFor="email">Email</label><br/>
                      <Input.text value={email} onChange={e => setEmail(e.target.value)} type="email" placeHolder="Email" />
                      <label htmlFor="cpf">Cpf</label><br/>
                      <Input.text value={cpf} onChange={e => setCpf(e.target.value)} type="text" placeHolder="Cpf" />
                      <label htmlFor="telefone">Telefone</label><br/>
                      <Input.text value={telefone} onChange={e => setTelefone(e.target.value)} type="text" placeHolder="Telefone" />
                      <label htmlFor="endereco">Endereço</label><br/>
                      <Input.text value={endereco} onChange={e => setEndereco(e.target.value)} type="text" placeHolder="Endereço" />
                      <div className="col-xs-6 resetPadding">
                        <label htmlFor="latitude">Latitude</label><br/>
                        <Input.text value={latitude} onChange={e => setLatitude(e.target.value)} type="text" placeHolder="Latitude" />
                      </div>
                      <div className="col-xs-6 resetPadding">
                        <label htmlFor="longitude">Longitude</label><br/>
                        <Input.text value={longitude} onChange={e => setLongitude(e.target.value)} type="text" placeHolder="Longitude" />
                      </div>
                      <label htmlFor="descricao">Descrição</label><br/>
                      <Input.text value={descricao} onChange={e => setDescricao(e.target.value)} type="text" placeHolder="Descrição" />
                    </form>
                  </>
                  :
                  <>
                    <form name="formUsuario">
                      <input id="id" name="id" type="hidden" value={id}></input>
                      <label htmlFor="name">Nome Completo</label><br/>
                      <Input.text value={nome} onChange={e => setNome(e.target.value)} type="text" placeHolder="Nome" disabled/>
                      <label htmlFor="telefone">Telefone</label><br/>
                      <Input.text value={telefone} onChange={e => setTelefone(e.target.value)} type="text" placeHolder="Telefone" disabled/>
                      <label htmlFor="endereco">Endereço</label><br/>
                      <Input.text value={endereco} onChange={e => setEndereco(e.target.value)} type="text" placeHolder="Endereço" disabled/>
                      <div className="col-xs-6 resetPadding">
                        <label htmlFor="latitude">Latitude</label><br/>
                        <Input.text value={latitude} onChange={e => setLatitude(e.target.value)} type="text" placeHolder="Latitude" disabled/>
                      </div>
                      <div className="col-xs-6 resetPadding">
                        <label htmlFor="longitude">Longitude</label><br/>
                        <Input.text value={longitude} onChange={e => setLongitude(e.target.value)} type="text" placeHolder="Longitude" disabled/>
                      </div>
                      <label htmlFor="descricao">Descrição</label><br/>
                      <Input.text value={descricao} onChange={e => setDescricao(e.target.value)} type="text" placeHolder="Descrição" disabled/>
                    </form>
                  </>
                }
              </div>

              <div className="col-xs-12 col-lg-5 foto-profile">
                <span>Foto</span>
                {flagPerfilPessoal ?
                  <>
                    <input id="uploadFoto" type="file"></input>
                  </>
                  :
                  <>
                  </>
                }
                <img src={url} />
                {flagPerfilPessoal ?
                  <>
                    <div className="perfil-pessoal">
                      <span>Como você se considera?</span>
                      <div className="grid">
                        <Input.radio id="cuidador" name="tipo" value={cuidador} onClick={e => validaTipo(true)} htmlFor="cuidador" text="Cuidador" />
                        <Input.radio id="usuario" name="tipo" value={dono} onClick={e => validaTipo(false)} htmlFor="usuario" text="Usuário" />
                      </div>
                      <span>Cuidadores terão seu contato e sua descrição disponíveis no site para o acesso de todos!</span>
                      <input id="btnAtualizar" name="btnAtualizar" type="submit" value="Atualizar"></input>
                    </div>
                  </>
                  :
                  <>
                    <div className="perfil-terceiro">
                      <span>Que tal baterem um papo? Clique aqui para ir até o Whatsapp!</span>
                      <Button.secundario type="button" name="chamar" text="Chamar" 
                        href={`https://api.whatsapp.com/send?phone=${telefone}&text=Olá!%20Encontrei%20seu%20contato%20pelo%20PetParty!%20Me%20chamo%20${infoUser.nome},%20podemos%20conversar?`} 
                        target="_blank"/>
                    </div>
                  </>
                }
              </div>
            </div>
          </div>

          {flagPerfilPessoal ?
            <>
            </>
            :
            <>
              <div className="col-xs-12">
                <div className="box box-pets">
                  <div className="titulo-card">
                    <h4>Pets</h4>
                  </div> 
                  {infoPets.map((value, index) => {
                    return <ValueBox cols='12 12 4' key={index} idPet={value._id} color={value.tipo_pet} icon='paw'
                        value={`${value.nome}`} tipo={value.tipo_pet} porte={value.porte} idade={value.idade}>
                      </ValueBox>
                  })}
                </div>  
              </div>
            </>
          }
        </div>
      </Content>
  </div>
  );
}
