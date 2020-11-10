import React, { Component } from "react";
import { Link } from "@reach/router";
import { render } from "react-dom";

const PATH_BASE = "https://restcountries.eu/rest/v2/";
const DEFAULT = "all";
class Countries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: null,
      countriesTemp: null,
      country: "",
      region: "",
      searchterm: DEFAULT,
      regions: ["ALL", "Africa", "Americas", "Asia", "Europe", "Oceania"],
      filterValue: "",
    };
  }
}
 
