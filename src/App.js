import React from "react";
import "./App.css";
import Customers from "./components/customers";
import { Switch, Route, Link } from "react-router-dom";
import CustomerDetail from "./components/customerDetail";

function App() {
  return (
    <div className="App">
      <h1>Personal Trainer </h1>
      <h3>
        <Link to="/customers">Customers</Link>
      </h3>

      <Switch>
        <Route path="/customers" exact component={Customers} />

        <Route path="/customers/:id" exact component={CustomerDetail} />
      </Switch>
    </div>
  );
}

export default App;
