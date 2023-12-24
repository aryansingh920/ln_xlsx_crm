import React, { useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import Progress from "./components/Progress";
import home from "./api/home";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
function App(): JSX.Element {
  const [msg, setMsg] = React.useState("");
  useEffect(() => {
    (async () => {
      await home()
        .then((res) => {
          setMsg("Server is running");
        })
        .catch((err) => {
          setMsg("Server is not running");
        });
    })();
  }, []);

  return (
    <>
      <NotificationContainer />

      <Navbar msg={msg} />
      <div className="App container scrollable-container">
        <div className="row">
          <div
            className="uk-card uk-card-default uk-card-body  Form scrollable-container"
            uk-scrollspy="cls: uk-animation-slide-left; repeat: true"
          >
            <h3 className="uk-card-title">Excel Tool</h3>
            <Form />
          </div>
        </div>
        <div className="row">
          <div
            className="uk-card uk-card-default uk-card-body scrollable-container Form"
            uk-scrollspy="cls: uk-animation-slide-right; repeat: true"
          >
            <h3 className="uk-card-title">File Progress</h3>
            <Progress />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
