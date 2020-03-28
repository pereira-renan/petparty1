import { Router } from "express";
import multer from "multer";
import authMiddleware from "./middlewares/auth";
import multerConfig from "./config/multer";

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
routes.post("/resetPassword",SessionController.resetPassword);
routes.post("/forgot", SessionController.forgotPassword);


routes.use(authMiddleware); // midleware de verificação do token do usuario
routes.put("/user", UserController.update);
//    require('./controller/authController')(routes);

routes.get("/providers", ProviderController.mostrarCuidadores);

routes.post("/files", upload.single("file"), FileController.store);


export default routes;
