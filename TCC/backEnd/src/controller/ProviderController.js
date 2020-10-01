import User from "../models/User";

class ProviderController {


  async mostrarCuidadores(req, res) {
    const teste = await User.find({ user_cuidador: true }).select(['nome', 'email', 'url', 'avatar']);
    return res.json(teste);
  }

  async index(req, res) {

    try {
     
      const { latitude, longitude, distancia } = req.query;
      console.log(latitude, longitude);

      const providers = await User.find({
        user_cuidador: {
          $in: true,
        },
        
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            $maxDistance: distancia,
          },
        },

      });

      return res.json({ providers });
    }
    catch (err) {
      return res
        .status(400)
        .send({ error: "Falha ao Cadastrar Usuario" } + err);
    }

  }
}


export default new ProviderController();
