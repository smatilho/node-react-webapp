import React, { Component } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import Root from "./Root";
import { Route, Switch } from "react-router-dom"; 

import NavbarMain from "./components/Navbar";
import Home from "./pages/Home";

import LoginPage from "./pages/Login-Page";
import SignUpPage from "./pages/Sign-Up-Page";

import { ToastContainer } from "react-toastify";

import axios from "axios";

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <NavbarMain />
        <Root>
        <ToastContainer hideProgressBar={true} newestOnTop={true} />
          <Switch>
            <Route path='/Login' component={LoginPage}/>
            <Route path='/Signup' component={SignUpPage}/>
            <Route exact path="/" component={Home}/>
            <Route path="*">404 Not Found</Route>
          </Switch>
        </Root>
      </div>
    );
  }
}

export default App;