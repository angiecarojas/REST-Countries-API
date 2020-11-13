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
 /*
componentDidMount() {
  this.fetchData(this.state.searchterm);
}*/

fetchData = (newRegion) => {
  fetch(`${PATH_BASE}${newRegion}`)
    .then((response) => response.json())
    .then((countries) => {
      this.setState({ countries: countries, countriesTemp: countries });
    })
    .catch((error) => error);
};

regionLoading = (event) => {
  if (event.target.value === "ALL") {
    this.fetchData("all");
  } else {
    this.fetchData(`region/${event.target.value}`);
  }
};
