import User from "../../src/models/User";

import Agendamento from "../../src/models/Agendamentos";


class AgendamentoController {
  async store(req, res) {
    // const schema = Yup.object().shape({
    //   id_prestador: Yup.string().required(),
    //   date: Yup.date().required()
    // });

    // if (!(await schema.isValid(req.body))) {
    //   return res.status(400).json({ error: "Validation fails" });
    // }

    const id_prestador = req.header("id_prestador");
    const { id_pet, data, id_usuario } = req.body;
    const status = "pendente";
    console.log(id_prestador);

    // verificando se o informado é um prestador de serviço
    try {
      const isPrestador = await User.findById(id_prestador)
        .where("user_cuidador")
        .equals(true);

      console.log(isPrestador);

      if (!isPrestador) {
        return res.status(401).json({
          error: "Um agendamento só pode ser criado para um ID de um prestador"
        });
      }

      const agendamento = await Agendamento.create({
        //  id_usuario: req.userId,
        id_usuario,
        id_prestador,
        data,
        id_pet,
        status
      });

      return res.json(agendamento);
    } catch (error) {
      return res.status(401).json("Erro" + error);
    }
  }

  async index(req, res) {
    try {
      const agendamentos = await Agendamento.find(req.body);
      return res.json(agendamentos);
    }
    catch (error) {
      return res.status(401).json("Erro" + error);
    }
  }

  async aceitarAgendamento(req, res) {

    // enviar _id  do Agendamento pelo header e enviar para qual status quer atualizar ex: recusado,aceito, confirmado
    try {
      const _id = req.header("_id");
      const agendamentos = await Agendamento.findOne({ _id });
      console.log(agendamentos);
      await Agendamento.updateOne({ _id }, req.body);
      const retorno = await Agendamento.find({ _id });
      return res.json(retorno);
    }
    catch (error) {
      return res.status(401).json("Erro" + error);
    }

  }
  async updateAgendamento(req, res) {


  }


}

export default new AgendamentoController();
