/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const SuccessAlert = (): JSX.Element => {
  return (
    <div
      style={{
        padding: "5px",
      }}
      className="uk-alert-success"
      uk-alert
    >
      <a href="" className="uk-alert-close" uk-close></a>
      <p>Server Running</p>
    </div>
  );
};

export default SuccessAlert;
