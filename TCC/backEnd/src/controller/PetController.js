import Pet from "../models/Pet";
import jwt from "jsonwebtoken";
class PetController {

  // Cadastrando PET
  async store(req, res) {

    try {
      const { id } = jwt.decode(req.header("token"));
      req.body.id_dono = id;
      const pet = await Pet.create(req.body);
      return res.json(pet);
    } catch (error) {
      return res.status(400).json("Erro ao cadastrar o pet" + error);
    }
  }
  // Mostrando pets
  async index(req, res) {
    try {
      const { id } = jwt.decode(req.header("token"));
      const pets = await Pet.find({id_dono : id});
      return res.json(pets);
    } catch (error) {
      return res.status(400).json("Erro ao cadastrar o pet" + error);
    }
  }
  // Atualizando PET
  async update(req, res) {

    // puxando ID do pet que vem no header
    const id_pet = req.header("id_pet");
    console.log(id_pet);
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
  // Deletando Pet
  async delete(req, res) {

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
