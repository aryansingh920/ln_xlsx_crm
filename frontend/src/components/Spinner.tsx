import React from "react";

const Spinner = () => {
  return (
    <div>
      {" "}
      {/* return ( */}
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          position: "fixed",
          width: "100%",
          height: "100%",
          top: "0",
          left: "0",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "black",
          }}
          uk-spinner="ratio: 4.5"
        ></span>
      </div>
      {/* ); */}
    </div>
  );
};

export default Spinner;
