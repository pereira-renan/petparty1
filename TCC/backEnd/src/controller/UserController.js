import * as Yup from "yup";
import User from "../models/User";
import bcrypt from "bcryptjs";

class UserController {

  async CriarUsuar(req, res) {

    try {

      const userExists = await User.findOne({ email: req.body.email });
      // valida se o email já estava cadastrado

      if (userExists) {
        return res.status(400).send({ error: "Email já cadastrado no Banco!" });
      }

      const { nome, email, cpf, user_cuidador, password, telefone, latitude, longitude } = req.body;
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
    // /// validacao dos campos na atualizacao dos campos
    // const schemavalidation = Yup.object().shape({
    //   nome: Yup.string(),
    //   email: Yup.string().email(),
    //   password: Yup.string().min(8),
    //   cpf: Yup.string(),
    //   user_cuidador: Yup.boolean(),
    //   oldpassword: Yup.string().min(6),
    //   password: Yup.string()
    //     .min(6)
    //     .when("oldpassword", (oldpassword, field) =>
    //       oldpassword ? field.required() : field
    //     ),

    //   confirmpassword: Yup.string().when("password", (password, field) =>
    //     password ? field.required().oneOf([Yup.ref("password")]) : field
    //   ),
    // });
    // let isvalid = await schemavalidation.isValid(req.body);
    // if (!isvalid) {
    //   return res.status(400).json({ error: "Validação dos campos invalidos!" });
    // }
    // FIM validacao dos campos

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
    const id = req.header("id_user");
    console.log("ID-->" + id);
    const user = await User.findById(id);
    console.log("User-->" + user);
    return res.json(user);
  }
}

export default new UserController();
