import React from "react";
import { render } from "react-dom";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

render(<App />, document.getElementById("root"));