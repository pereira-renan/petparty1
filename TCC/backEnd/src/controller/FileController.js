import User from "../models/User";
import Pet from "../models/Pet";
import jwt from "jsonwebtoken";
import PetController from "./PetController";
let user ;
class FileController {
  
  async store(req, res) {

    // Inserindo a foto de avatar no usuario
    // try{
    // const { id } = jwt.decode(req.header("token"));
    // console.log("--->"+ id);
    // const { originalname: name, filename: path } = req.file;
    // let user = await User.findOne({ _id: req.userId });

    // user.avatar.nome = name;
    // user.avatar.path = path;
    // await user.save();
    // user = await User.findOne({ _id: req.userId });
    // return res.json(user);
    // }
    // catch (error){
    //   return res.status(400).json('Erro ao subir a imagem' + error);
    // }


    
  
    try{
    const { id } = jwt.decode(req.header("token"));
    const objeto = req.header("objeto");
    const idpet = req.header("idpet");
    console.log("--->"+ id,objeto);
    const { originalname: name, filename: path } = req.file;
    
    if(objeto == "User"){
     user = await User.findOne({ _id: id });
    }
    else if(objeto == "Pet"){
     user = await Pet.findOne({ _id: idpet });
    }

    user.avatar.nome = name;
    user.avatar.path = path;
    await user.save();

    return res.json("Foto Inserida");
    }
    catch (error){
      return res.status(400).json('Erro ao subir a imagem' + error);
    }
   

  
}


}

export default new FileController();
