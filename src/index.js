import React from "react";
import { Router } from "@reach/router";
import { render } from "react-dom";
import Countries from "./Countries";
import DetallesCountry from "./DetallesCountry";
import "./style.css";

const App = () => {
  return (
    <div>
      <Router>
        <Countries path="/" />
        <DetallesCountry path="/details/:name" />
      </Router>
    </div>
  );
};

render(<App />, document.getElementById("root"));
