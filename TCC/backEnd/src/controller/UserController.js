import * as Yup from "yup";
import User from "../models/User";
import bcrypt from "bcryptjs";

class UserController {
  async CriarUsuar(req, res) {
    // Validando campos de entrada
    const schemavalidation = Yup.object().shape({
      nome: Yup.string().required("Nome Obrigatorio"),
      email: Yup.string().required("Email invalido").email(),
      password: Yup.string().required("Min. 8 letras ").min(8),
      cpf: Yup.string().required("CPF Obrigatorio"),
      user_cuidador: Yup.boolean().required(),
      telefone: Yup.string().required("Telefone Obrigatorio"),
    });

    let isvalid = await schemavalidation.isValid(req.body);

    if (!isvalid) {
      return res.status(400).json({ error: "Validação dos campos invalidos!" +  isvalid});
    }
    // fim validacao dos campos

    /// Verificação email
    try {
      const userExists = await User.findOne({ email: req.body.email });
      // valida se o email já estava cadastrado
      if (userExists) {
        return res.status(400).send({ error: "Email já cadastrado no Banco!" });
      }
      // criar usuário s
      const {
        id,
        nome,
        email,
        user_cuidador,
        cpf,
        password,
        usuario_validado,
        telefone,
      } = await User.create(req.body);

      return res.json({
        id,
        nome,
        email,
        cpf,
        password,
        user_cuidador,
        usuario_validado,
        telefone,
      });
    } catch (err) {
      return res
        .status(400)
        .send({ error: "Falha ao Cadastrar Usuario" } + err);
    }
  }

  // METODO ATUALIZACAO DE DADOS

  async update(req, res) {
    /// validacao dos campos na atualizacao dos campos
    const schemavalidation = Yup.object().shape({
      nome: Yup.string(),
      email: Yup.string().email(),
      password: Yup.string().min(8),
      cpf: Yup.string(),
      user_cuidador: Yup.boolean(),
      oldpassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when("oldpassword", (oldpassword, field) =>
          oldpassword ? field.required() : field
        ),

      confirmpassword: Yup.string().when("password", (password, field) =>
        password ? field.required().oneOf([Yup.ref("password")]) : field
      ),
    });

    let isvalid = await schemavalidation.isValid(req.body);

    if (!isvalid) {
      return res.status(400).json({ error: "Validação dos campos invalidos!" });
    }

    // FIM validacao dos campos

    /// Verificacao email existente
    const { email, oldpassword } = req.body;
    console.log(email);
    const user = await User.findById(req.userId);

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

  // buscando informações do usuario
  async infoUser(req, res) {
    const { id } = await req.body;
    console.log("ID-->" + id);
    const user = await User.findById(id);
    console.log("User-->" + user);
    return res.json(user);
  }
}

export default new UserController();
