// import { MoreOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Modal,
  //Button,
  //List
} from "antd";
// import { isNumber } from "lodash";
import "./index.css";

const NavMenuItem = ({ value }) => {
  //if (value) console.log(value);
  const {
    menuName = "Menu",
    menuLink = "#blank",
    menuActive = false,
    menuIndex = 0,
    props = {},
  } = value;

  const [visible, setVisible] = useState(false);

  let classLink = "news-menu-link";

  const location = useLocation();
  const { pathname } = location;
  // console.log(pathname, menuLink);
  let linkSelect = pathname === menuLink;
  if (!linkSelect && menuLink === "/news/") {
    linkSelect = pathname === "/";
  }

  if (!linkSelect && menuLink === "/lotto/") {
    linkSelect = pathname.startsWith(menuLink);
  }

  //const isActive = menuActive ? "is-active" : "not-active";
  if (menuActive || props) {
  }
  classLink += linkSelect ? " is-active" : " not-active";

  // const [scrollY, setScrollY] = useState(0);

  let tempY = window.scrollY;

  const handleCancel = () => {
    const scrollY = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
    document.body.style.width = "100%";
    setVisible(false);

    window.history.back();
  };

  const showModal = () => {
    // console.log(tempY);
    tempY = window.scrollY;
    // console.log(tempY);
    document.body.style.position = "fixed";
    document.body.style.top = `-${tempY}px`;

    setVisible(true);
    setTimeout(function () {
      document.body.style.width = "100%";
    }, 500);

    document.body.style.top = `-${tempY}px`;
  };

  const getBackgroundCard = (e) => {
    // console.log(menuLink);
    if (menuLink !== "#menu") return;
    if (e) {
    }
    showModal();
  };
  ///console.log(menuLink);

  // console.log(menuLink);
  // if (pathHideNav.indexOf(pathname)) {
  //   return <NavLink></NavLink>;
  // }

  return (
    <>
      <NavLink
        to={menuLink}
        className={classLink}
        name={menuIndex}
        onClick={(event) => getBackgroundCard(event)}
      >
        <span>{menuName}</span>
      </NavLink>
      {menuLink === "#menu" && (
        <Modal
          // centered
          title={"เมนู"}
          visible={visible}
          // onOk={() => handleCancel()}
          onCancel={() => handleCancel()}
          width={414}
          bodyStyle={{
            // height: "calc(100vh - 120px)",
            padding: 8,
            margin: 0,
            height: "calc(100%)",
          }}
          style={{ top: 0, margin: 0 }}
          footer={[]}
        >
          View
        </Modal>
      )}
    </>
  );
};
// NavFirstPage

export default NavMenuItem;
