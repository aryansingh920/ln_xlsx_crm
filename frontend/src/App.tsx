import React from "react";
import "./App.css";
import Axios from "./api/axios";

const InternalCSS = {
  displayNone: {
    display: "none",
  },
};

function App() {
  // const get = async () => {
  //   const res = await Axios.get("/");
  //   console.log(res);
  // };
  // get();
  return (
    <div className="App">
      <div>
        <div className="uk-card uk-card-large uk-card-default uk-card-hover uk-card-body">
          <h3 className="uk-card-title">Excel Tool</h3>
          <div className="js-upload uk-placeholder uk-text-center">
            <span uk-icon="icon: cloud-upload"></span>
            <span className="uk-text-middle">
              Attach binaries by dropping them here or
            </span>
            <div uk-form-custom>
              <label style={InternalCSS.displayNone} htmlFor="formInput">
                Input
              </label>
              <input id="formInput" type="file" title="" />
              <span className="uk-link">selecting one</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
