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
	const [catchSuccess, setCatchSuccess] = useState(false);

	async function enviarEmail(e) {
		e.preventDefault();

		const dados = { email };

		try {
			setCatchSuccess(false);
			await api.post("forgot", dados);
			setCatchSuccess(true);
		}
		catch(error) {
			setCatchSuccess(false);
		}
	}

	return (
		<main>
			<CardCentral>
				<form onSubmit={enviarEmail}>
				<FormHeader nomeArea="cadastro">
					<DivAviso.sucesso value={catchSuccess} text="Email enviado"/>
				</FormHeader>
				<div className="descricao-formulario">
					<div>
					Para prosseguir por favor digite seu email no campo abaixo que enviaremos as 
					instrucões para recuperação da sua senha
					</div>
				</div>
				<Input.text type="email" placeHolder="Email" />
				<div className="grid">
					<Button.secundario type="button" nome="voltar" text="Voltar" href={"/"}/>
					<Button.principal type="submit" name="enviar" text="Enviar"/>
				</div>
				</form>
			</CardCentral>
		</main>
	);
}
