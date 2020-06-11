import { Router } from "express";
import multer from "multer";
import authMiddleware from "./middlewares/auth";
import multerConfig from "./config/multer";


import PetController from "./controller/PetController";
import AgendamentoController from "./controller/AgendamentoController";
import UserController from "./controller/UserController";
import SessionController from "./controller/SessionController";
import FileController from "./controller/FileController";
import ProviderController from "./controller/ProviderController";

const routes = new Router();
const upload = multer(multerConfig);

routes.get("/", (req, res) => {
  return res.json({ message: " Hello Rocket Seat" });
});

routes.post("/user/create", UserController.CriarUsuar);
routes.post("/login", SessionController.store);
routes.post("/resetPassword", SessionController.resetPassword);
routes.post("/forgot", SessionController.forgotPassword);
routes.post("/info", UserController.infoUser);


//PET
routes.get("/pets", PetController.index);
routes.post("/pet/create", PetController.store);
routes.put("/pet/update", PetController.update);
routes.delete("/pet/delete", PetController.delete);

// AGENDAMENTO

routes.post("/agendamento", AgendamentoController.store);
routes.get("/providers", ProviderController.mostrarCuidadores);

//routes.use(authMiddleware); // midleware de verificação do token do usuario 

//todas as rotas que estão abaixo passará pela autenticação

routes.put("/user", UserController.update);

routes.post("/files", upload.single("file"), FileController.store);

export default routes;
