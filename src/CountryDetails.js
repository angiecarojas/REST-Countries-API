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
      </div>
    );
  }
}

export default CountryDetails;
