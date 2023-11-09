/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const ErrorAlert = (): JSX.Element => {
  return (
    <div
      style={{
        padding: "5px",
      }}
      className="uk-alert-danger"
      uk-alert
    >
      <a href="" className="uk-alert-close" uk-close></a>
      <p>Server Error</p>
    </div>
  );
};

export default ErrorAlert;
