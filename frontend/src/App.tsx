import React, { useState, useEffect } from "react";
import "./App.css";
import SuccessAlert from "./components/SuccessAlert";
import ErrorAlert from "./components/ErrorAlert";
import Card from "./components/Card";
import Spinner from "./components/Spinner";
import { getHomeData } from "./api/home";
import Navbar from "./components/Navbar";

function App(): JSX.Element {
  const [stages, setStages] = useState<{ [key: number]: boolean }>({
    1: true, // Stage 1 is the default stage where the user can upload a file
    2: false, // Stage 2 is the stage where the user can update the file and download the file
    3: false,
    4: false,
  });

  const [serverRunning, setServerRunning] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  useEffect(() => {
    fetchHomeData(setServerRunning);
  }, []);

  return (
    <>
      <div className="App">
        {showLoader ? (
          <Spinner />
        ) : (
          <Card
            setStages={setStages}
            setShowLoader={setShowLoader}
            stages={stages}
          />
        )}
      </div>
      {alertBox(serverRunning)}
    </>
  );
}

const fetchHomeData = async (setServerRunning: any) => {
  const data = await getHomeData();
  if (data) {
    setServerRunning(true);
  }
};

const alertBox = (serverRunning: boolean): JSX.Element => {
  return (
    <>
      <Navbar />
      <div
        style={{
          position: "fixed",
          bottom: "0",
          right: "0",
          padding: "20px",
        }}
      >
        {serverRunning ? <SuccessAlert /> : <ErrorAlert />}
      </div>
    </>
  );
};

export default App;
