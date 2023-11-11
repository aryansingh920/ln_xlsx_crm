/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import { baseUrl } from "../../api/baseUrl";
export {};

const Card2: React.FC = () => {
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
      {/* <button onClick={handleDownload} className="uk-button uk-button-primary">
        Download
      </button> */}
      <a
        type="button"
        className="uk-button uk-button-primary"
        id="downloadLink"
        style={
          {
            // display: "none",
          }
        }
        href={`${baseUrl}/download`}
        download
      >
        Download
      </a>
    </div>
  );
};

export default Card2;
