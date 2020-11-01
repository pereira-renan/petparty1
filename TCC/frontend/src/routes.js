import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Cadastro from "./pages/Cadastrar";
import Profile from "./pages/Profile";
import EsqueceuSenha from "./pages/EsqueceuSenha";
import Landing from './pages/Landing';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route exact path="/register" component={Cadastro} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/remember" component={EsqueceuSenha} />
      </Switch>
    </BrowserRouter>
  );
}
