import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import CardCentral from '../../components/CardCentral/index';
import FormHeader from '../../components/FormHeader/index';
import Input from '../../components/Input/index';
import Button from '../../components/Button/index';
import DivAviso from '../../components/DivAviso/index';

import api from "../../services/api";

import "./styles.css";

export default function Login() {
  //let classNameCredencial = 'credencial-invalida ';

  const [pass, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [catchError, setCatchError] = useState(false);

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    const credenciais = { email, pass };

    try {
      setCatchError(false);
      //document.querySelector('#validacao').classList.add('invisivel');
      //document.querySelector('#validacao').classList.remove('visivel');
      const response = await api.post("login", credenciais);

      // destruturando as informações retornadas pela api
      const { user, token } = response.data;

      const { id, nome, email } = user;

      alert(
        `Logado : ID: ${id}\n NOME: ${nome} \n EMAIL : ${email} \n Token : ${token}`
      );
      // salvando o token no localstorage

      localStorage.setItem("token", token);
      localStorage.setItem("id", id);

      history.push("/profile");
    } catch (error) {
      setCatchError(true);
      //document.querySelector('#validacao').classList.remove('invisivel');
      //document.querySelector('#validacao').classList.add('visivel');
    }
  }

  return (
    <main>
      <CardCentral>
        <form onSubmit={handleLogin}>
          <FormHeader nomeArea="login">
            <DivAviso.erro value={catchError} text="Email ou senha estão incorretos"/>
          </FormHeader>
          <Input.text value={email} onChange={e => setEmail(e.target.value)} type="text" placeHolder="Email" />
          <Input.text value={pass} onChange={e => setPassword(e.target.value)} type="password" placeHolder="Senha"/>
          <div className="grid">
            <div>
              <input type="checkbox" name="lembrarUsuario"/>
              <label htmlFor="lembrarUsuario">Lembrar meu usuário</label>
            </div>
            <div>
              <a href={"/remember"}>Esqueceu a senha?</a>
            </div>
          </div>
          <div className="grid">
            <Button.secundario type="button" name="cadastrar" text="Cadastrar" href={"/register"}/>
            <Button.principal type="submit" name="enviar" text="Entrar"/>
          </div> 
        </form>
      </CardCentral>
    </main>
  );
}
