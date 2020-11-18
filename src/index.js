import React from "react";
import { Router } from "@reach/router";
import { render } from "react-dom";
import Countries from "./Countries";
import CountryDetails from "./CountryDetails";
import "./style.css";

const App = () => {
  return (
    <div>
      <Router>
        <Countries path="/" />
        <CountryDetails path="/details/:name" />
      </Router>
    </div>
  );
};

render(<App />, document.getElementById("root"));
