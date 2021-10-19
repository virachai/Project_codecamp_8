import { Row, Col } from "antd";
import { NavLink } from "react-router-dom";
import React from "react";
import { isLoggedIn } from "axios-jwt";
// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { fas } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

const MenuLine = (props) => {
  if (props) {
  }

  return (
    <Row
      style={{
        marginLeft: 10,
        padding: "8px 0",
        marginRight: "-6px",
        borderBottom: "1px solid var(--neutral400Color)",
      }}
      className="main-menu-line"
    >
      <Col>
        <NavLink to={props.MenuLink}>{props.MenuTitle}</NavLink>
      </Col>
    </Row>
  );
};

const MainMenuItem = (props) => {
  if (props) {
  }

  const blankLink = "#menu";
  const userLogon = isLoggedIn();
  return (
    <>
      <div
        className="main-menu-item"
        style={{
          paddingBottom: 10,
          height: "80vh",
          color: "var(--twitterBlackColor)",
        }}
      >
        {!userLogon && (
          <MenuLine
            MenuTitle={"เข้าสู่ระบบ"}
            MenuLink={"/login/"}
            MenuIcon={{ iconName: "", IconStyle: {} }}
          />
        )}
        {userLogon && (
          <MenuLine
            MenuTitle={"ออกจากระบบ"}
            MenuLink={"/logout/"}
            MenuIcon={{ iconName: "", IconStyle: {} }}
          />
        )}

        <MenuLine MenuTitle={"ลงทะเบียน"} MenuLink={"/signup/"} />
        <MenuLine MenuTitle={"ส่งความเห็น"} MenuLink={blankLink} />
        <MenuLine MenuTitle={"นโยบายการใช้งาน"} MenuLink={blankLink} />
        <MenuLine MenuTitle={"เวอร์ชัน 0.1.0"} MenuLink={blankLink} />
        {userLogon && (
          <MenuLine
            MenuTitle={"โปรไฟล์"}
            MenuLink={"/profile/"}
            MenuIcon={{ iconName: "", IconStyle: {} }}
          />
        )}
      </div>
    </>
  );
};
export default MainMenuItem;
