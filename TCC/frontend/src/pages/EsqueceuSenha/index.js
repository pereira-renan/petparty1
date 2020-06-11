import React, { useState } from "react";
import api from "../../services/api";

import CardCentral from '../../components/CardCentral/index';
import FormHeader from '../../components/FormHeader/index';
import Input from '../../components/Input/index';
import Button from '../../components/Button/index';
import DivAviso from '../../components/DivAviso/index';

import "./styles.css";

export default function EsqueceuSenha() {
	const [email, setEmail] = useState("");
	const [validacaoEmail, setValidacaoEmail] = useState(true);
	const [catchSuccess, setCatchSuccess] = useState(false);
	const [catchError, setCatchError] = useState(false);

	async function enviarEmail(e) {
		e.preventDefault();

		if(validaEmail(email)) {
			const dados = { email };
			try {
				setCatchSuccess(false);
					const response = await api.post("forgot", dados);
					console.log(response.data)

					setCatchSuccess(true);
					setTimeout(() => {
						setCatchSuccess(false);
					}, 4000);
				}
				catch(error) {
					setCatchSuccess(false);
					setCatchError(true);
					setTimeout(() => {
						setCatchError(false);
					}, 4000);
				}
		}
		else if(email === '') {
			setCatchError(true);
			setTimeout(() => {
				setCatchError(false);
			}, 4000);
		}
	}

	function validaEmail(email) {
		setValidacaoEmail(!!email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi));
		if(email === '') return false;
		return validacaoEmail;
	}

	return (
		<main>
			<CardCentral>
				<form onSubmit={enviarEmail}>
				<FormHeader nomeArea="cadastro">
					<DivAviso.sucesso value={catchSuccess} text="Email enviado"/>
					<DivAviso.erro value={catchError} text={email === '' ? "Digite um email!" : "Este email não está registrado"}/>
				</FormHeader>
				<div className="descricao-formulario">
					<div>
					Para prosseguir por favor digite seu email no campo abaixo que enviaremos as 
					instrucões para recuperação da sua senha
					</div>
				</div>
				<Input.text type="email" value={email} validado={validacaoEmail} onBlur={e => validaEmail(email)} onChange={e => setEmail(e.target.value)} placeHolder="Email" />
				<DivAviso.validacao value={!validacaoEmail && email !== ''} text="Por favor, digite um email válido." />
				<div className="grid">
					<Button.secundario type="button" nome="voltar" text="Voltar" href={"/"}/>
					<Button.principal type="submit" name="enviar" text="Enviar"/>
				</div>
				</form>
			</CardCentral>
		</main>
	);
}
