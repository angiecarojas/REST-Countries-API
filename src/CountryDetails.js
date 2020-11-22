import React from "react";
import { Link } from "@reach/router";

class Languages extends React.Component {
  render() {
    const { name } = this.props;
    var languages = [];
    name.map((language) => languages.push(language.name));
    return (
      <p>
        <span className="font-bold">Languages: </span>
        {languages.join(", ")}
      </p>
    );
  }
}

class CountryDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: null,
      countries: null,
      borderCountries: [],
    };
  }

  componentDidMount() {
    Promise.all([
      fetch(
        `https://restcountries.eu/rest/v2/name/${this.props.name}?fullText=true`
      ),
      fetch(`https://restcountries.eu/rest/v2/all`),
    ])
      .then(([res1, res2]) => {
        return Promise.all([res1.json(), res2.json()]);
      })
      .then(([res1, res2]) => {
        this.setState({
          details: res1,
          countries: res2,
        });
        this.borderCountry(res1[0].borders);
      });
  }

  borderCountry = (borderCodes) => {
    const { countries } = this.state;
    let borderNames = [];
    for (let i = 0; i < borderCodes.length; i++) {
      const borderCode = borderCodes[i];
      for (let i = 0; i < countries.length; i++) {
        const item = countries[i];
        if (item.alpha3Code === borderCode) {
          borderNames.push(item.name);
        }
      }
    }
    this.setState({ borderCountries: borderNames });
  };

  render() {
    const { details } = this.state;
    if (!details) {
      return <h1>Loading...</h1>;
    }

    return (
      <div>
        <div className="top">
          <h3>Where in the World?</h3>
          <p>
            <i className="fa fa-moon-o mode-toggler" aria-hidden="true"></i>{" "}
            Dark Mode
          </p>
        </div>

        <div className="country">
          <div className="back">
            <Link to="/">
              <button className="back-button">
                <i
                  className="fa fa-long-arrow-left arrow-left"
                  aria-hidden="true"
                ></i>
                Back
              </button>
            </Link>
          </div>

          <div className="country-body">
            <img
              className="country-flag"
              src={details[0].flag}
              alt={`${details[0].name} flag`}
            />

            <div className="country-bottom">
              <div className="country-description-1">
                <h2>{details[0].name}</h2>
                <div>
                  <p>
                    <span className="font-bold"> Native Name: </span>
                    {details[0].nativeName}
                  </p>
                  <p>
                    <span className="font-bold"> Population: </span>
                    {details[0].population.toLocaleString("en-US")}
                  </p>
                  <p>
                    <span className="font-bold">Region: </span>
                    {details[0].region}
                  </p>
                  <p>
                    <span className="font-bold">Sub Region: </span>
                    {details[0].subregion}
                  </p>
                  <p>
                    <span className="font-bold">Capital: </span>
                    {details[0].capital}
                  </p>
                </div>
              </div>

              <div className="country-description-2">
                <p>
                  <span className="font-bold">Top Level Domain: </span>
                  {details[0].topLevelDomain}
                </p>
                <p>
                  <span className="font-bold">Currencies: </span>
                  {details[0].currencies[0].name}
                </p>
                <Languages name={details[0].languages} />
              </div>

              <div className="border-country">
                <span className="font-bold">Border Country: </span>
                <div className="border-group">
                  {this.state.borderCountries.map((border) => (
                    <button className="border-name">{border}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CountryDetails;
