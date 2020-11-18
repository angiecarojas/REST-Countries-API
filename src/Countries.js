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

  componentDidMount() {
    this.fetchData(this.state.searchterm);
  }

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

  handleInputChange = (event) => {
    const { countries } = this.state;
    let inputValue = event.target.value;
    let tempCountry = [];
    tempCountry = countries.filter(function (country, index, list) {
      return (
        country.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
      );
    });
    if (tempCountry.length > 0) {
      this.setState({ countriesTemp: tempCountry });
    } else {
      this.setState({ countriesTemp: countries });
    }
  };

  render() {
    const { countriesTemp, regions } = this.state;
    if (!countriesTemp) return <h1>Loading...</h1>;
    return (
      <div>
        <div className="top">
          <h3>Where in the World?</h3>
        </div>

        <div className="search-tab">
          <form action="">
            <div className="input-div">
              <i className="fa fa-search icon-search" aria-hidden="true"></i>
              <input
                className="input-country input-tab"
                type="text"
                placeholder="Search for a country..."
                onChange={this.handleInputChange}
              />
            </div>
          </form>

          <select
            name="regions"
            id="regions"
            className="dropdown"
            onChange={this.regionLoading}
          >
            <option value="all" selected disabled>
              Filter by Region
            </option>

            {regions.map((region) => (
              <option value={region} key={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
        <div className="countries">
          {countriesTemp.map((country) => (
            <div className="country-card" key={country.name}>
              <img
                src={country.flag}
                alt={country.name}
                className="country-img"
              />

              <div className="country-details">
                <Link to={`/details/${country.name}`} className="country-name">
                  <h2>{country.name}</h2>
                </Link>
                <p className="p-tag">
                  <span className="font-bold p-tag"> Population: </span>
                  {country.population.toLocaleString("en-US")}
                </p>
                <p className="p-tag">
                  <span className="font-bold p-tag"> Region: </span>
                  {country.region}
                </p>
                <p className="p-tag">
                  <span className="font-bold p-tag"> capital: </span>
                  {country.capital}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Countries;
