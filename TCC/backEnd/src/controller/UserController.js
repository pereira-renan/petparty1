import * as Yup from "yup";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserController {

  async CriarUsuar(req, res) {

    try {

      const userExists = await User.findOne({ email: req.body.email });
      // valida se o email já estava cadastrado

      if (userExists) {
        return res.status(400).send({ error: "Email já cadastrado no Banco!" });
      }

      const { nome, email, cpf, descricao, user_cuidador, password, telefone, latitude, longitude } = req.body;
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };
      // criar usuário s
      const user = await User.create({
        nome,
        email,
        user_cuidador,
        cpf,
        password,
        telefone,
        location,
        descricao
      })

      return res.json(user);
    } catch (err) {
      return res
        .status(400)
        .send({ error: "Falha ao Cadastrar Usuario" } + err);
    }
  }

  // METODO ATUALIZACAO DE DADOS
  async update(req, res) {

    /// Verificacao email existente
    const { email, oldpassword } = req.body;
    console.log(email);
    const user = await User.findOne({ email });
    console.log(user.email);
    if (email != user.email) {
      const userExists = await User.findOne({ email });
      // valida se o email já esta cadastrado
      if (userExists) {
        return res.status(400).json("Bad request.  email invalido ");
      }
    }
    // verificação da senha no banco
    if (
      oldpassword &&
      !bcrypt.compareSync(req.body.oldpassword, user.password)
    ) {
      return res.status(400).json("Bad request. Password don't match ");
    }
    // transformando a nova senha em hash para enviar para o banco
    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
    // ATUALIZANDO O
    await User.updateOne(req.body);
    const retorno = await User.findOne({ email: req.body.email });
    return res.json(retorno);
  }



  // Buscando Infomações do Usuario
  async infoUser(req, res) {
    const { id } = jwt.decode(req.header("token"));
    console.log("ID-->" + id);
    const user = await User.findById(id);
    console.log("User-->" + user);
    return res.json(user);
  }
  async infoCuidador(req, res) {
    const id = req.header("_id");
    console.log(id);
    const user = await User.findById(id);
    console.log("Cuidador" + user);
    return res.json(user);
  }

}

export default new UserController();
