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
    const { id_pet, data } = req.body;
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
        id_usuario: req.userId,
        id_prestador,
        data,
        id_pet
      });

      return res.json(agendamento);
    } catch (error) {
      return res.status(401).json("Erro" + error);
    }
  }

  async index(req, res) {
    const filter = `{"id": ${req.userId}}`;
    console.log(req.userId);
    const agendamentos = await Agendamento.find(filter.id);
    return res.json(agendamentos);
  }
}

export default new AgendamentoController();
