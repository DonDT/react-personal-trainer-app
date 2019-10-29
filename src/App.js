import React from "react";
import "./App.css";
import Customers from "./components/customers";
import Trainings from "./components/trainings";
import { Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>Personal Trainer </h1>
      <h3>
        <Link to="/customers">Customers</Link>
      </h3>
      <h3>
        <Link to="/trainings">Trainings</Link>
      </h3>

      <Switch>
        <Route path="/customers" exact component={Customers} />
        <Route path="/trainings" exact component={Trainings} />
      </Switch>
    </div>
  );
}

export default App;
