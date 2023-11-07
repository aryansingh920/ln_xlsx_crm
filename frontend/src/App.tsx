import React from "react";
import "./App.css";
import Axios from "./api/axios";

function App() {
  const get = async () => {
    const res = await Axios.get("/");
    console.log(res);
  };
  get()
  return <div className="App">Response</div>;
}

export default App;
