import React, { useEffect, useState } from "react";
import Card1 from "./Cards/Card1";
import Card2 from "./Cards/Card2";
import { handleUpload } from "../service/Card/handleUpload";
import { updateFile } from "../api/updateFile";

const Card = (props: {
  stages: { [key: number]: boolean };
  setShowLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setStages: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
}): JSX.Element => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [toRemoveArray, setToRemoveArray] = useState<string[]>([]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): any => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
  };

  useEffect(() => {
    // console.log("Stages", props.stages);
  }, [props.stages]);

  // useEffect(() => {
  //   // Whenever toRemoveArray changes, this code will execute
  //   if (toRemoveArray.length > 0) {
  //     updateFile(toRemoveArray)
  //       .then((res) => {
  //         console.log("updateFile response:", res);
  //       })
  //       .catch((err) => {
  //         console.error("updateFile error:", err);
  //       });
  //   }
  // }, [toRemoveArray]);

  //api calls
  const handleSubmit = async () => {
    props.setShowLoader(true);
    await handleUpload(
      selectedFile,
      props.setStages,
      setError,
      setToRemoveArray
    )
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
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
    </>
  );
};

export default Card;
