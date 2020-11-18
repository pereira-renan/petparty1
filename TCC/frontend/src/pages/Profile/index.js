import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import Header from '../common/template/header';
import ContentHeader from '../common/template/contentHeader';
import SideBar from '../common/template/sideBar';
import Content from '../common/template/content';
import Input from '../../components/Input/index';
import Button from '../../components/Button/index';
import DivAviso from '../../components/DivAviso/index';
import axios from 'axios'

import ValueBox from '../common/widget/valueBox'
import Row from '../common/layout/row'

import UsuariosList from '../../components/UsuariosList/index';

import api from "../../services/api";

import "./styles.css";
import Axios from "axios";
import { updateSourceFile } from "typescript";
export default function Profile(props) {
  const history = useHistory();

  const [infoUser, setInfo] = useState([]);
  const [infoPets, setInfoPets] = useState([]);
  const [locationResponse, setLocationResponse] = useState([]);

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
  const [cep, setCep] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");

  const [validacaoNome, setValidacaoNome] = useState(true);
  const [validacaoEmail, setValidacaoEmail] = useState(true);
  const [validacaoTelefone, setValidacaoTelefone] = useState(true);
  const [validacaoTipo, setValidacaoTipo] = useState(true);

  const [validacaoLatitude, setValidacaoLatitude] = useState(true);
  const [validacaoLongitude, setValidacaoLongitude] = useState(true);

  const [validacaoCep, setValidacaoCep] = useState(true);
  const [validacaoEstado, setValidacaoEstado] = useState(true);
  const [validacaoCidade, setValidacaoCidade] = useState(true);
  const [validacaoBairro, setValidacaoBairro] = useState(true);
  const [validacaoRua, setValidacaoRua] = useState(true);
  const [validacaoNumero, setValidacaoNumero] = useState(true);

  const [uploadFoto, setUploadFoto] = useState([]);

  const token = sessionStorage.getItem("token");

  let flagPerfilPessoal = true;
  if(props.match.params.id !== undefined) {
    flagPerfilPessoal = false;
  }

  useEffect(() => {
    api.get("info", {
      headers: {
        token: sessionStorage.getItem("token")
      } 
    }).then(response => {
      setInfo(response.data);
      setLocationResponse(response.data.location)
      if(flagPerfilPessoal) {
        console.log(response.data)
        try {
          setId(response.data.id);
          setUrl(response.data.url);
          setNome(response.data.nome);
          setEmail(response.data.email);
          setCpf(response.data.cpf);
          setTelefone(response.data.telefone);
          setTipo(response.data.user_cuidador)
          setLatitude(response.data.location.coordinates[1]);
          setLongitude(response.data.location.coordinates[0]);
          setCep(response.data.endereco.cep);
          setEstado(response.data.endereco.estado);
          setCidade(response.data.endereco.cidade);
          setBairro(response.data.endereco.bairro);
          setRua(response.data.endereco.rua);
          setNumero(response.data.endereco.numero);
          setDescricao(response.data.descricao);
        } catch(e) {
          console.log(e)
        }
        
      }
      //setInfo(response.data);
    }) 
  }, [localStorage.getItem("token")])

  useEffect(() => {
    if(!flagPerfilPessoal) {
      api.get("info/cuidador", {
        headers: {
          _id: props.match.params.id
        } 
      }).then(response => {
        try {
          setId(response.data.id);
          setUrl(response.data.url);
          setNome(response.data.nome);
          setTelefone(response.data.telefone);
          //setLatitude(response.data.location.coordinates[0]);
          //setLongitude(response.data.location.coordinates[1]);
        } catch(e) {
          console.log(e)
        }
        
      })
    }
  })

  useEffect(() => {
    if(!flagPerfilPessoal) {
      api.get("pets", {
        headers: {
          token: sessionStorage.getItem("token")
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

  function validaCep(cep) {
    capturaInfosEndereco(cep);

    setValidacaoCep(!!cep.match(/^[0-9]{5}-[0-9]{3}$/));

    api.get("endereco", {
      headers: {
        endereco: `${cep}+Brasil`
      }
    }).then(response => {
      console.log(response.data[0]);
      try {
        setLatitude(response.data[0].geometry.location.lat);
        setLongitude(response.data[0].geometry.location.lng);
      }
      catch(e) {
        console.log(e);
      }
    })
  }
  
  function capturaInfosEndereco(cep) {
    const response = axios.get(`https://viacep.com.br/ws/${cep}//json/`)
    .then(response => {
      console.log(response.data)
      try {
        setEstado(response.data.uf);
        setCidade(response.data.localidade);
        setBairro(response.data.bairro);
        setRua(response.data.logradouro);
        setNumero("");
  
        //setBairro(endereco.substring(0, endereco.indexOf(',')));
      } catch(e) {
        console.log(e);
      }
    });
  }

  function validaNome(nome) {
    setValidacaoNome(!!nome.match(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/));
    if (nome === '') return false;
    return validacaoNome;
  }

  function validaEmail(email) {
    setValidacaoEmail(!!email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi));
    if (email === '') return false;
    return validacaoEmail;
  }

  function validaTelefone(telefone) {
    setValidacaoTelefone(!!telefone.match(/\+\d{2}\s\(\d{2}\)\s\d{4,5}-?\d{4}/));
    if (telefone === '') return false;
    return validacaoTelefone;
  }

  function validaEstado(estado) {
    setValidacaoEstado(!!estado.match(/^[A-Z]{2}$/));
    return validacaoEstado;
  }

  function validaCidade(cidade) {
    setValidacaoCidade(!!cidade.match(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/));
    return validacaoCidade;
  }

  function validaBairro(bairro) {
    setValidacaoBairro(!!bairro.match(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/));
    return bairro;
  }

  function validaRua(rua) {
    setValidacaoRua(!!rua.match(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/));
    return rua;
  }

  function validaNumero(numero) {
    setValidacaoNumero(!(numero < 0));
    return numero;
  }

  function updateInfoProfile() {
    updateFile();
    setaCoordenadas(`${cep}+${estado}+${cidade}+${bairro}+${rua}+${numero}`)
    const endereco = {
      cep: cep,
      estado: estado,
      cidade: cidade,
      bairro: bairro,
      rua: rua,
      numero: numero,
    }
    const location = {
      coordinates: [longitude, latitude],
      _id: locationResponse._id,
      type: locationResponse.type
    }
    const infos = { 
      nome: nome, 
      email: email, 
      user_cuidador: cuidador, 
      telefone: telefone,
      descricao: descricao,
      endereco: endereco,
      location: location
    };
    api.put("user/update", infos, {
      headers: {
        token: sessionStorage.getItem("token")
      } 
    }).then(response => {
      console.log(response)
      console.log('aaaaaaaaaaaaaa')
    })
  }

  function setaCoordenadas(address) {

    api.get("endereco", {
      headers: {
        endereco: address
      }
    }).then(response => {
      try {
        setLatitude(response.data[0].geometry.location.lat);
        setLongitude(response.data[0].geometry.location.lng);
      }
      catch(e) {
        console.log(e);
      }
    })
  }

  function updateFile() {
    console.log(uploadFoto)
    api.post("files", {'file': uploadFoto}, {
      headers: {
        token: sessionStorage.getItem("token"),
        objeto: 'User'
      } 
    }).then(response => {
      try {
        setLatitude(response.data[0].geometry.location.lat);
        setLongitude(response.data[0].geometry.location.lng);
      }
      catch(e) {
        console.log(e);
      }
    })
  }

  return (
    <div>
      <Header/>
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
                      <Input.text value={nome} validado={validacaoNome} onBlur={e => validaNome(nome)} onChange={e => setNome(e.target.value)} type="text" placeHolder="Nome" />
                      <DivAviso.validacao value={!validacaoNome && nome !== ''} text="Por favor, digite seu NOME COMPLETO." />
                      <label htmlFor="email">Email</label><br/>
                      <Input.text value={email} validado={validacaoEmail} onBlur={e => validaEmail(email)} onChange={e => setEmail(e.target.value)} type="email" placeHolder="Email" />
                      <DivAviso.validacao value={!validacaoEmail && email !== ''} text="Por favor, digite um EMAIL válido." />
                      <label htmlFor="cpf">Cpf</label><br/>
                      <Input.text value={cpf} type="text" placeHolder="Cpf" disabled/>
                      <label htmlFor="telefone">Telefone</label><br/>
                      <Input.text value={telefone} validado={validacaoTelefone} onBlur={e => validaTelefone(telefone)} onChange={e => setTelefone(e.target.value)} type="text" placeHolder="Telefone" />
                      <DivAviso.validacao value={!validacaoTelefone && telefone !== ''} text="Por favor, digite um TELEFONE válido no padrão +99 (99) 9999-9999." />
                      <label htmlFor="cep">CEP</label><br/>
                      <Input.text value={cep} validado={validacaoCep} onBlur={e => validaCep(cep)} onChange={e => setCep(e.target.value)} type="text" placeHolder="CEP" id="cep" name="cep" />
                      <DivAviso.validacao value={!validacaoCep && cep !== ''} text="Você deve digitar seu CEP acima." />
                      <label htmlFor="estado">Estado</label><br/>
                      <Input.text value={estado} validado={validacaoEstado} onBlur={e => validaEstado(estado)} onChange={e => setEstado(e.target.value)} type="text" placeHolder="Estado" id="estado" name="estado" />
                      <DivAviso.validacao value={!validacaoEstado && estado !== ''} text="Você deve digitar seu Estado acima." />
                      <label htmlFor="cidade">Cidade</label><br/>
                      <Input.text value={cidade} validado={validacaoCidade} onBlur={e => validaCidade(cidade)} onChange={e => setCidade(e.target.value)} type="text" placeHolder="Cidade" id="cidade" name="cidade" />
                      <DivAviso.validacao value={!validacaoCidade && cidade !== ''} text="Você deve digitar sua Cidade acima." />
                      <label htmlFor="bairro">Bairro</label><br/>
                      <Input.text value={bairro} validado={validacaoBairro} onBlur={e => validaBairro(bairro)} onChange={e => setBairro(e.target.value)} type="text" placeHolder="Bairro" id="bairro" name="bairro" />
                      <DivAviso.validacao value={!validacaoBairro && bairro !== ''} text="Você deve digitar seu Bairro acima." />
                      <label htmlFor="rua">Rua</label><br/>
                      <Input.text value={rua} validado={validacaoRua} onBlur={e => validaRua(rua)} onChange={e => setRua(e.target.value)} type="text" placeHolder="Rua" id="rua" name="rua" />
                      <DivAviso.validacao value={!validacaoRua && rua !== ''} text="Você deve digitar sua Rua acima." />
                      <label htmlFor="numero">Número</label><br/>
                      <Input.text value={numero} validado={validacaoNumero} onBlur={e => validaNumero(numero)} onChange={e => setNumero(e.target.value)} type="number" placeHolder="Numero" id="numero" name="numero" />
                      <DivAviso.validacao value={!validacaoNumero && numero !== ''} text="Você deve digitar o Número da sua residência acima." />
                      <div className="col-xs-6 resetPadding">
                        <Input.text value={latitude} onChange={e => setLatitude(e.target.value)} type="hidden" placeHolder="Latitude" />
                      </div>
                      <div className="col-xs-6 resetPadding">
                        <Input.text value={longitude} onChange={e => setLongitude(e.target.value)} type="hidden" placeHolder="Longitude" />
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
                      <Input.text value={nome} type="text" placeHolder="Nome" disabled/>
                      <label htmlFor="telefone">Telefone</label><br/>
                      <Input.text value={telefone}  type="text" placeHolder="Telefone" disabled/>
                      <label htmlFor="cep">CEP</label><br/>
                      <Input.text value={cep} type="text" placeHolder="CEP" id="cep" name="cep" disabled/>
                      <DivAviso.validacao value={false} text="Você deve digitar seu CEP acima." />
                      <label htmlFor="estado">Estado</label><br/>
                      <Input.text value={estado} type="text" placeHolder="Estado" id="estado" name="estado" disabled/>
                      <DivAviso.validacao value={false} text="Você deve digitar seu Estado acima." />
                      <label htmlFor="cidade">Cidade</label><br/>
                      <Input.text value={cidade} type="text" placeHolder="Cidade" id="cidade" name="cidade" disabled/>
                      <DivAviso.validacao value={false} text="Você deve digitar sua Cidade acima." />
                      <label htmlFor="bairro">Bairro</label><br/>
                      <Input.text value={bairro} type="text" placeHolder="Bairro" id="bairro" name="bairro" disabled/>
                      <DivAviso.validacao value={false} text="Você deve digitar seu Bairro acima." />
                      <label htmlFor="rua">Rua</label><br/>
                      <Input.text value={rua} type="text" placeHolder="Rua" id="rua" name="rua" disabled/>
                      <DivAviso.validacao value={false} text="Você deve digitar sua Rua acima." />
                      <label htmlFor="numero">Número</label><br/>
                      <Input.text value={numero} type="text" placeHolder="Numero" id="numero" name="numero" disabled/>
                      <DivAviso.validacao value={false} text="Você deve digitar o Número da sua residência acima." />
                      <div className="col-xs-6 resetPadding">
                        <Input.text value={latitude} type="hidden" placeHolder="Latitude" disabled/>
                      </div>
                      <div className="col-xs-6 resetPadding">
                        <Input.text value={longitude} type="hidden" placeHolder="Longitude" disabled/>
                      </div>
                      <label htmlFor="descricao">Descrição</label><br/>
                      <Input.text value={descricao} type="text" placeHolder="Descrição" disabled/>
                    </form>
                  </>
                }
              </div>

              <div className="col-xs-12 col-lg-5 foto-profile">
                <span>Foto</span>
                {flagPerfilPessoal ?
                  <>
                    <input value={uploadFoto} onChange={e => setUploadFoto(e.target.value)} id="uploadFoto" type="file"></input>
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
                      <input id="btnAtualizar" name="btnAtualizar" type="submit" value="Atualizar" onClick={e => updateInfoProfile()}></input>
                    </div>
                  </>
                  :
                  <>
                    <div className="perfil-terceiro">
                      <span>Que tal baterem um papo? Clique aqui para ir até o Whatsapp!</span>
                      <Button.secundario type="button" name="chamar" text="Chamar" 
                        href={`https://api.whatsapp.com/send?phone=${telefone}&text=Olá%20${nome}!%20Encontrei%20seu%20contato%20pelo%20PetParty!%20Me%20chamo%20${infoUser.nome},%20podemos%20conversar?`} 
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
                    return <ValueBox cols='12 12 4' key={index} idPet={value._id} color={value.tipo_pet} icon='fa fa-paw'
                        value={`${value.nome}`} tipo={value.tipo_pet} raca={value.raca} porte={value.porte} idade={value.idade}>
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
