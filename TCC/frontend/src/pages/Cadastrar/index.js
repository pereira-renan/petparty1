import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api";

import CardCentral from '../../components/CardCentral/index';
import FormHeader from '../../components/FormHeader/index';
import Input from '../../components/Input/index';
import Button from '../../components/Button/index';
import DivAviso from '../../components/DivAviso/index';


import "./styles.css";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [userCuidador, setUserCuidador] = useState("");

  const [validacaoNome, setValidacaoNome] = useState(true);
  const [validacaoEmail, setValidacaoEmail] = useState(true);
  const [validacaoPassword, setValidacaoPassword] = useState(true);
  const [validacaoConfirmPassword, setValidacaoConfirmPassword] = useState(true);
  const [validacaoCpf, setValidacaoCpf] = useState(true);

  const user_validado = true;
  const user_cuidador = true;

  const [catchSuccess, setCatchSuccess] = useState(false);

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = { nome, email, password, cpf, user_cuidador };

    try {
      setCatchSuccess(false);
      const response = await api.post("user/create", data);
      alert(`Cadastro Realizado com Sucesso! ! `);
      setCatchSuccess(true);
      history.push("/");
    } catch (error) {
      alert(`Erro ao Cadastrar! Tente Novamente` + error);
      setCatchSuccess(false);
    }
  }

  return (
    <main>
      <CardCentral>
        <form onSubmit={handleRegister} id="form">
          <FormHeader nomeArea="cadastro">
              <DivAviso.sucesso value={catchSuccess} text="Cadastrado com sucesso!"/>
          </FormHeader>

          <Input.text value={nome} validado={validacaoNome} onBlur={e => setValidacaoNome(true)} onChange={e => setNome(e.target.value)} type="text" placeHolder="Nome Completo" id="nome" name="nome" />
          <DivAviso.validacao text="Por favor, digite seu nome completo." />
          <Input.text value={email} validado={validacaoEmail} onBlur={e => setValidacaoEmail(false)} onChange={e => setEmail(e.target.value)} type="email" placeHolder="Email" id="email" name="email" />
          <div></div>
          <Input.text value={cpf} validado={validacaoCpf} onBlur={e => setValidacaoCpf(true)} onChange={e => setCpf(e.target.value)} type="text" placeHolder="Telefone" id="telefone" name="telefone" />
          <div></div>
          
          <Input.text value={password} validado={validacaoPassword} onBlur={e => setValidacaoPassword(true)} onChange={e => setPassword(e.target.value)} type="password" placeHolder="Senha" id="senha" name="senha" />
          <div></div>
          <Input.text value={confirmPassword} validado={validacaoConfirmPassword} onBlur={e => setValidacaoConfirmPassword(false)} onChange={e => setConfirmPassword(e.target.value)} type="password" placeHolder="Confirme sua Senha" id="confirmSenha" name="confirmSenha" />
          <div></div>
          <div className="grid">
            <Button.secundario type="button" name="login" text="Já possui cadastro?" href={"/"}/>
            <Button.principal type="submit" name="cadastrar" text="Cadastrar"/>
          </div>
        </form>
      </CardCentral>
    </main>
  );
}
