import React, { useEffect, useState } from "react";
import Card1 from "./Cards/Card1";
import Card2 from "./Cards/Card2";
import Card3 from "./Cards/Card3";
import { handleUpload } from "../service/Card/handleUpload";

const Card = (props: {
  stages: { [key: number]: boolean };
  setShowLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setStages: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
}): JSX.Element => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): any => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
  };

  useEffect(() => {}, [props.stages]);

  const handleSubmit = async () => {
    props.setShowLoader(true);
    await handleUpload(selectedFile, props.setStages, setError)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        props.setStages({ 1: false, 2: false, 3: true });
        console.log("err", err);
      });
    props.setShowLoader(false);
  };

  return (
    <>
      {props.stages[1] && (
        <Card1
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
          error={error}
          handleSubmit={handleSubmit}
        />
      )}
      {props.stages[2] && <Card2 />}
      {props.stages[3] && <Card3 />}
    </>
  );
};

export default Card;
