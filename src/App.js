import React from "react";
import "./App.css";
import Customers from "./components/customers";
import { Switch, Route, Link } from "react-router-dom";
import CustomerDetail from "./components/customerDetail";
import CustomerCalender from "./components/customerCalender";
import WellcomePage from "./components/WellcomePage/WellcomePage";
import LoginRegister from "./components/Authentication/LoginRegister";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login_register" component={LoginRegister} />
        <Route path="/customers/trainings" exact component={CustomerDetail} />
        <Route path="/customers/:id" exact component={CustomerCalender} />
        <Route path="/customers" exact component={Customers} />
        <Route path="/" exact component={WellcomePage} />
      </Switch>
    </div>
  );
}

export default App;
