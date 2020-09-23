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
import MatchController from "./controller/MatchController";


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




// Pesquisa

routes.get("/searchProviders", ProviderController.index);



routes.use(authMiddleware); // midleware de verificação do token do usuario 

//PET
routes.post("/pet/create", PetController.store);
routes.put("/pet/update", PetController.update);
routes.delete("/pet/delete", PetController.delete);

// agendamentos
routes.post("/agendamento", AgendamentoController.store);
routes.put("/agendamento/accept", AgendamentoController.aceitarAgendamento);
routes.get("/meusAgendamentos",AgendamentoController.index);



routes.get("/providers", ProviderController.mostrarCuidadores);

//todas as rotas que estão abaixo passará pela autenticação

routes.put("/user/update", UserController.update);

routes.put("/match", MatchController.Match);
routes.get("/getmatchs", MatchController.MatchPendentes);
routes.put("/refusematch", MatchController.MatchRefuse);


routes.post("/files", upload.single("file"), FileController.store);

export default routes;
