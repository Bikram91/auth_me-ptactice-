import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./Components/LoginFormPage";
import SignupFormPage from "./Components/SignupFormPage";
import Navigation from "./Components/Navigation";


function App() {
  return (
    <>
    <Navigation/>
    <Switch>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route path="/signup">
        <SignupFormPage />
      </Route>
    </Switch>
    </>
  );
}

export default App;
