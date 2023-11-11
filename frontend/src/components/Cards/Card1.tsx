import React from "react";
import { InternalCSS } from "../../css/Internal.css";
export {};
interface CardProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: any;
  error: string;
  handleSubmit: () => void;
}

const Card1: React.FC<CardProps> = ({
  handleFileChange,
  handleUpload,
  error,
  handleSubmit,
}) => {
  return (
    <div className="uk-card uk-card-large uk-card-default uk-card-hover uk-card-body">
      <h3 className="uk-card-title">Excel Tool</h3>
      <div className="js-upload uk-placeholder uk-text-center">
        <span uk-icon="icon: cloud-upload"></span>
        <span className="uk-text-middle">Attach Excel Files</span>
        <div uk-form-custom>
          <label style={InternalCSS.displayNone} htmlFor="formInput">
            Input
          </label>
          <input
            id="formInput"
            type="file"
            title=""
            formEncType="multipart/form-data"
            onChange={handleFileChange}
          />
          <span className="uk-link" onClick={handleUpload}>
            selecting one
          </span>
        </div>
      </div>
      {error && <p className="uk-text-danger">{error}</p>}
      <button className="uk-button uk-button-primary" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Card1;
