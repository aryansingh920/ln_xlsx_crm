/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";

interface propsType {
  msg: string;
}

const Navbar = (props:propsType) => {
    const [serverMessage, setServerMessage] = React.useState("Server Not Running") as any[];
  useEffect(() => {
    setServerMessage(props.msg);
  }, [props]);
  return (
    <div>
      <nav className="uk-navbar-container">
        <div className="uk-container">
          <div uk-navbar="true">
            <div className="uk-navbar-left">
              <ul className="uk-navbar-nav">
                              <li>
                                  <a style={{color:"white",fontSize:"1.2rem"}} href="">
                                       {serverMessage}
                                  </a>
                              </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
