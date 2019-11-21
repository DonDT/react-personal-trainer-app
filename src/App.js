import React from "react";
import "./App.css";
import Customers from "./components/customers";
import { Switch, Route, Link } from "react-router-dom";
import CustomerDetail from "./components/customerDetail";
import CustomerCalender from "./components/customerCalender";
import WellcomePage from "./components/WellcomePage/WellcomePage";

function App() {
  return (
    <div className="App">
      {/* <h1>Personal Trainer </h1> */}
      {/* <h3>
        <Link to="/customers">Customers</Link>
      </h3>
      <h3>
        <Link to="/customers/trainings">Trainings</Link>
      </h3>
      <h3>
        <Link to="/wellcome">Wellcome</Link>
      </h3> */}
      <Switch>
        <Route path="/customers" exact component={Customers} />
        <Route path="/customers/trainings" exact component={CustomerDetail} />
        <Route path="/customers/:id" exact component={CustomerCalender} />
        <Route path="/wellcome" exact component={WellcomePage} />
      </Switch>
    </div>
  );
}

export default App;
