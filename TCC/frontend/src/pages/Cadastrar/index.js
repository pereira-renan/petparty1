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

  function validaNome(nome) {
    setValidacaoNome(!!nome.match(/[A-Z][a-z]* [A-Z][a-z]*/));
  }

  function validaEmail(email) {
    setValidacaoEmail(!!email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi));
  }

  function validaCpf(cpf) {
    setValidacaoCpf(cpf);

    setValidacaoCpf((cpf) => {
      let rev;
      let i;
      let add;
      cpf = cpf.toString().replace(/[^\d]+/g,'');	
      if(cpf === '') return false;	
      // Elimina CPFs invalidos conhecidos	
      if (cpf.length !== 11 || 
        cpf === "00000000000" || 
        cpf === "11111111111" || 
        cpf === "22222222222" || 
        cpf === "33333333333" || 
        cpf === "44444444444" || 
        cpf === "55555555555" || 
        cpf === "66666666666" || 
        cpf === "77777777777" || 
        cpf === "88888888888" || 
        cpf === "99999999999")
          return false;		
      // Valida 1o digito	
      add = 0;	
      for (i=0; i < 9; i ++)		
        add += parseInt(cpf.charAt(i)) * (10 - i);	
        rev = 11 - (add % 11);	
        if (rev === 10 || rev === 11)		
          rev = 0;	
        if (rev !== parseInt(cpf.charAt(9)))		
          return false;		
      // Valida 2o digito	
      add = 0;	
      for (i = 0; i < 10; i ++)		
        add += parseInt(cpf.charAt(i)) * (11 - i);	
      rev = 11 - (add % 11);	
      if (rev === 10 || rev === 11)	
        rev = 0;	
      if (rev !== parseInt(cpf.charAt(10)))
        return false;		
      return true;  
    });
  }

  function validaSenha(password) {
    setValidacaoPassword(!!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/));
    validaConfirmSenha(password);
  }

  function validaConfirmSenha(password) {
    setValidacaoConfirmPassword(confirmPassword === password);
  }

  return (
    <main>
      <CardCentral>
        <form onSubmit={handleRegister} id="form">
          <FormHeader nomeArea="cadastro">
              <DivAviso.sucesso value={catchSuccess} text="Cadastrado com sucesso!"/>
          </FormHeader>

          <Input.text value={nome} validado={validacaoNome} onBlur={e => validaNome(nome)} onChange={e => setNome(e.target.value)} type="text" placeHolder="Nome Completo" id="nome" name="nome" />
          <DivAviso.validacao value={!validacaoNome && nome !== ''} text="Por favor, digite seu nome completo." />

          <Input.text value={email} validado={validacaoEmail} onBlur={e => validaEmail(email)} onChange={e => setEmail(e.target.value)} type="email" placeHolder="Email" id="email" name="email" />
          <DivAviso.validacao value={!validacaoEmail && email !== ''} text="Por favor, digite um email válido." />

          <Input.text value={cpf} validado={validacaoCpf} onBlur={e => validaCpf(cpf)} onChange={e => setCpf(e.target.value)} type="text" placeHolder="Cpf" id="cpf" name="cpf" />
          <DivAviso.validacao value={!validacaoCpf && cpf !== ''} text="Por favor, digite um cpf válido." />

          <div className="grid">
            <Input.radio id="cuidador" name="tipo" value="cuidador" htmlFor="cuidador" text="Cuidador" />
            <Input.radio id="usuario" name="tipo" value="usuario" htmlFor="usuario" text="Usuário" />
          </div>
          
          <Input.text value={password} validado={validacaoPassword} onBlur={e => validaSenha(password)} onChange={e => setPassword(e.target.value)} type="password" placeHolder="Senha" id="senha" name="senha" />
          <DivAviso.validacao value={!validacaoPassword && password !== ''} text="Sua senha deve ter no mínimo 8 caracteres, pelo menos 1 letra, 1 número e 1 caractere especial." />

          <Input.text value={confirmPassword} validado={validacaoConfirmPassword} onBlur={e => validaConfirmSenha(confirmPassword)} onChange={e => setConfirmPassword(e.target.value)} type="password" placeHolder="Confirme sua Senha" id="confirmSenha" name="confirmSenha" />
          <DivAviso.validacao value={!validacaoConfirmPassword && confirmPassword !== ''} text="Você deve digitar a mesma senha digitada no campo acima." />
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
