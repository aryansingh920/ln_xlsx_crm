import React from "react";
export {};
interface Card2Props {
  handleDownload: () => void;
}

const Card2: React.FC<Card2Props> = ({ handleDownload }) => {
  return (
    <div className="uk-card uk-card-large uk-card-default uk-card-hover uk-card-body">
      <h3 className="uk-card-title">Update and download the excel</h3>
      <p
        style={{
          color: "green",
        }}
      >
        File Uploaded
      </p>
      <button onClick={handleDownload} className="uk-button uk-button-primary">
        Download
      </button>
    </div>
  );
};

export default Card2;
