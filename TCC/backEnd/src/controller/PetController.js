import Pet from "../models/Pet";

class PetController {
  async store(req, res) {
    // Cadastrando PET
    try {
      const pet = await Pet.create(req.body);
      return res.json(pet);
    } catch (error) {
      return res.status(400).json("Erro ao cadastrar o pet" + error);
    }
  }

  async index(req, res) {
    // Inserindo a foto de avatar no usuario

    try {
      const pets = await Pet.find(req.body);
      return res.json(pets);
    } catch (error) {
      return res.status(400).json("Erro ao cadastrar o pet" + error);
    }
  }

  async update(req, res) {
    // Atualizando PET

    // puxando ID do pet que vem no header
    const id_pet = req.header("id_pet");

    try {
      let pet = await Pet.findById(id_pet);

      if (!pet) {
        return res.status(400).json("Pet' Não Encontrado" + error);
      }
      console.log(req.body);
      console.log(pet);

      await Pet.updateOne({ _id: id_pet }, req.body);
      pet = await Pet.findById(id_pet);

      return res.json(pet);
    } catch (error) {
      return res.status(400).json("Erro ao atualizar o pet" + error);
    }
  }

  async delete(req, res) {
    // Atualizando PET

    // puxando ID do pet que vem no header
    const id_pet = req.header("id_pet");

    try {
      let pet = await Pet.findById(id_pet);

      if (!pet) {
        return res.status(400).json("Pet' Não Encontrado" + error);
      }
      console.log(req.body);
      console.log(pet);

      await Pet.deleteOne({ _id: id_pet });

      pet = await Pet.findById(id_pet);

      return res.json(pet);
    } catch (error) {
      return res.status(400).json("Erro ao Deletar o pet" + error);
    }
  }
}

export default new PetController();
