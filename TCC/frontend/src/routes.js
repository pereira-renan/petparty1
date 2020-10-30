import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastrar";
import Perfil from "./pages/Profile";
import EsqueceuSenha from "./pages/EsqueceuSenha";
import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/landing" exact component={Landing} />
        <Route path="/study" component={TeacherList} />
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Cadastro} />
        <Route path="/profile" component={Perfil} />
        <Route path="/remember" component={EsqueceuSenha} />
      </Switch>
    </BrowserRouter>
  );
}
