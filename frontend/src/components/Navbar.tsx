import React from "react";

const Navbar = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        // padding: "20px",
      }}
    >
      <nav className="uk-navbar-container">
        <div className="uk-container">
          <div uk-navbar>
            <div className="uk-navbar-center">
              {/* <div className="uk-navbar-center-left">
                <ul className="uk-navbar-nav">
                  <li className="uk-active">
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="#">Parent</a>
                    <div className="uk-navbar-dropdown">
                      <ul className="uk-nav uk-navbar-dropdown-nav">
                        <li className="uk-active">
                          <a href="#">Active</a>
                        </li>
                        <li>
                          <a href="#">Item</a>
                        </li>
                        <li>
                          <a href="#">Item</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div> */}
              {/* <a className="uk-navbar-item uk-logo" href="#">
                Logo
              </a> */}
              <div className="uk-navbar-center-right">
                <ul className="uk-navbar-nav">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  {/* <li>
                    <a href="#">Item</a>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
