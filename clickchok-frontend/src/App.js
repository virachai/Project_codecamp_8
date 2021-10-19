import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  // Route,
  // Link,
  Redirect,
} from "react-router-dom";
import Home from "./pages/HomePage/";
import LoginPage from "./pages/LoginPage/";
//import LogoutPage, { NavHideLogout } from "./pages/LogoutPage/";
import LogoutPage from "./pages/LogoutPage/";
import RegPage from "./pages/RegPage/";
import ProfilePage from "./pages/auth/ProfilePage/";
import MgNewsPage from "./pages/auth/MgNews/";
import MgNewsgroupPage from "./pages/auth/MgNewsgroup/";
import MgNewsFormPage from "./pages/auth/MgNewsForm/";

import NavBarSection from "./containers/layout/NavBar/";
import PrivateRoute from "./services/PrivateRoute";
import PublicRoute from "./services/PublicRoute";
// https://medium.com/@thanhbinh.tran93/0-d50b27c15f5e

function App() {
  let navbarOn = true;

  //console.log(NavHideLogout);
  //navbarOn = NavHideLogout ? false : true;

  return (
    <Router>
      <Switch>
        <PrivateRoute component={LogoutPage} path="/logout/" exact />

        <PrivateRoute component={ProfilePage} path="/profile/" exact />

        <PrivateRoute component={MgNewsPage} path="/mg-news/" exact />

        <PrivateRoute component={MgNewsgroupPage} path="/mg-newsgroup/" exact />
        <PrivateRoute component={MgNewsFormPage} path="/mg-news-form/" exact />

        <PrivateRoute
          component={MgNewsFormPage}
          path="/mg-news-form/:nid"
          exact
        />

        <PublicRoute
          restricted={true}
          component={LoginPage}
          path="/login/"
          exact
        />

        <PublicRoute
          restricted={false}
          component={RegPage}
          path="/signup/"
          exact
        />

        <PublicRoute restricted={false} path="/" component={Home} />

        <Redirect to="/" />
      </Switch>
      {navbarOn && <NavBarSection />}
    </Router>

    // <div>
    //   <PrivateRoutes role={role} setRole={setRole}></PrivateRoutes>
    // </div>
  );
}

export default App;
