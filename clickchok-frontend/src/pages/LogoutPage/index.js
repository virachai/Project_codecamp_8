// import React from "react";
//import React from "react";
// import { isLoggedIn, clearAuthTokens } from "axios-jwt";
import React from "react";
//import React, { useState, useEffect } from "react";
import {
  Button,
  // notification,
  // Checkbox,
  // Modal
} from "antd";
import {
  // useLocation,
  useHistory,
  // Redirect,
  // Route,
  // NavLink,
} from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import { logoutFn } from "../../config/axios";

library.add(fas);

let NavHideLogout = false;

const LogoutPage = () => {
  let history = useHistory();

  const handleCancel = () => {
    history.push("/");
  };

  const onLogout = () => {
    const userAction = logoutFn();
    if (!userAction) return;

    setTimeout(function () {
      history.push("/");
    }, 1000);
  };

  //Fix Position Render
  document.body.style.position = "";
  document.body.style.top = "";

  NavHideLogout = true;

  return (
    <>
      <div className="logout-page">
        <button
          type="button"
          aria-label="Close"
          className="ant-modal-close"
          style={{ right: "unset", left: 0 }}
          onClick={() => handleCancel()}
        >
          <span className="ant-modal-close-x">
            <span
              role="img"
              aria-label="close"
              className="anticon anticon-close ant-modal-close-icon"
            >
              <FontAwesomeIcon
                icon={["fas", "arrow-left"]}
                style={{
                  opacity: 0.8,
                }}
              />
            </span>
          </span>
        </button>
        <div className="ant-modal-header">
          <div className="ant-modal-title" style={{ textAlign: "center" }}>
            ออกจากระบบ
          </div>
        </div>

        <div
          className="logout-section"
          style={{ padding: 10, maxWidth: 414, textAlign: "center" }}
        >
          <div>
            <h1 style={{ fontSize: 31, textAlign: "center" }}>
              <span>Log out of ClickChok?</span>
            </h1>
          </div>
          <div className="btn-action">
            <Button type="default" onClick={() => handleCancel()}>
              ยกเลิก
            </Button>
            <Button type="primary" onClick={() => onLogout()}>
              ยืนยัน
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

// let NavHideLogout = true;
//export default LogoutPage;
export { LogoutPage as default, NavHideLogout };
