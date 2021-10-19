// import React from "react";
//import React from "react";
import jwt_decode from "jwt-decode";
import { NavLink } from "react-router-dom";
// import axios from "axios";
import {
  isLoggedIn,
  // applyAuthTokenInterceptor,
  // refreshTokenIfNeeded,
  getRefreshToken,
  // getRefreshToken,
} from "axios-jwt";
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
  Redirect,
  // Route,
  //NavLink,
} from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import UserMenuItem from "../../../component/UserMenuItem";
import "./index.css";
// import axiosInstance from "../../../config/axios";

library.add(fas);

// https://medium.com/swlh/0-aca5522c14c8
// isTokenExpired(accessToken)

const UserMenuSection = (props) => {
  if (props) {
  }

  return (
    <>
      <div className="user-menu-section">
        <UserMenuItem
          menuName={"ข่าว"}
          menuIcon={"newspaper"}
          linkTo={"/mg-news/"}
        />
        <UserMenuItem
          menuName={"หวย"}
          menuIcon={"star"}
          linkTo={"/mg-lotto/"}
        />
        <UserMenuItem
          menuName={"รายงาน"}
          menuIcon={"clipboard-list"}
          linkTo={"/mg-report"}
        />
        <UserMenuItem
          menuName={"ผู้ใช้งาน"}
          menuIcon={"users"}
          linkTo={"/mg-users/"}
        />
        <UserMenuItem
          menuName={"ตั้งค่า"}
          menuIcon={"cog"}
          linkTo={"/mg-setting/"}
        />
      </div>
    </>
  );
};

const ProfilePage = () => {
  let history = useHistory();

  const handleCancel = () => {
    history.push("/");
  };

  document.body.style.position = "";
  document.body.style.top = "";

  const accessToken = getRefreshToken();
  const decoded = jwt_decode(accessToken);
  console.log(decoded);
  const memberData = isLoggedIn()
    ? decoded.memberData
    : { username: null, firstName: null, lastName: null };

  if (!isLoggedIn()) {
    return <Redirect to={"/"} />;
  }

  return (
    <>
      <div className="profile-page">
        <div className="ant-modal-header" style={{ position: "relative" }}>
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
          <div className="ant-modal-title" style={{ textAlign: "center" }}>
            โปรไฟล์
          </div>
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              height: 56,
            }}
          >
            <NavLink to={"/profile/" || "#"}>
              <Button
                type="text"
                style={{
                  borderRadius: 20,
                  margin: "8px 0",
                  height: 40,
                  padding: "10px 11px",
                }}
              >
                <FontAwesomeIcon
                  icon={["fas", "user"]}
                  style={{
                    opacity: 0.8,
                    fontSize: 18,
                  }}
                />
              </Button>
            </NavLink>
          </div>
        </div>

        <div
          className="profile-section"
          style={{ padding: 0, maxWidth: 414, textAlign: "center" }}
        >
          <div className="avatar-section" style={{ padding: 15 }}>
            <div className="user-profile" style={{ marginBottom: 15 }}>
              <Button
                type="ghost"
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                  backgroundColor: "white",
                }}
              >
                <FontAwesomeIcon
                  icon={["fas", "user"]}
                  style={{ fontSize: 64, color: "var(--neutral500Color)" }}
                />
              </Button>
            </div>
            <div className="user-text" style={{ color: "#616161" }}>
              <span>{memberData.username}</span>
            </div>
          </div>
          <div className="profile-section-border info-profile" style={{}}>
            <h2>
              {memberData.firstName} {memberData.lastName}
            </h2>
            <div
              style={{
                display: "inline-block",
              }}
            >
              <Button
                type="dashed"
                shape="round"
                style={{ height: 31, margin: 3 }}
                onClick={() => {
                  //refreshTokenIfNeeded(requestRefresh);
                  console.log("Edit Profile");
                }}
              >
                <FontAwesomeIcon
                  icon={["fas", "pen"]}
                  style={{ color: "#1376d9", marginRight: 8 }}
                />
                Profile
              </Button>
            </div>
          </div>
          <div className="profile-section-border user-menu-area">
            <UserMenuSection />
          </div>
          <div
            className="profile-section-border user-contact-area"
            style={{ textAlign: "right" }}
          >
            <div
              style={{
                width: "calc(100%)",
                textAlign: "left",
                padding: 12,
              }}
            >
              <div>
                <FontAwesomeIcon
                  icon={["fas", "phone"]}
                  style={{
                    fontSize: "28px",
                    margin: "10px 20px",
                    color: "gray",
                  }}
                />
              </div>
              <div style={{ padding: "0 16px" }}>
                <div>088-999-1234</div>
                <div style={{ color: "gray" }}>Phone</div>
              </div>
            </div>
            <div
              className="profile-section-border"
              style={{
                width: "calc(100% - 80px)",
                marginLeft: 80,
              }}
            ></div>
            <div
              style={{
                width: "calc(100%)",
                textAlign: "left",
                padding: 12,
              }}
            >
              <div>
                <FontAwesomeIcon
                  icon={["fas", "envelope"]}
                  style={{
                    fontSize: "28px",
                    margin: "10px 20px",
                    color: "gray",
                  }}
                />
              </div>
              <div style={{ padding: "0 16px" }}>
                <div>nilson@clickchok.com</div>
                <div style={{ color: "gray" }}>Email</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
