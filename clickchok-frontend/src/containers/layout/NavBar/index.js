import React, { useState } from "react";
import { Button, Modal } from "antd";
import { NavLink } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";
//import { Redirect } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import MainMenuItem from "../../../component/MainMenuItem";
import "./index.css";
library.add(fas);

const pathHideNav = ["/logout/", "/login/", "/signup/"];

const MenuModal = (props) => {
  //const [visible, setVisible] = useState(false);
  const [visible, setVisible] = [props.visibleData, props.setVisibleData];
  // const menuLink = props.menuLink;
  let tempY = window.scrollY;
  const loc = props.modalLocation;
  const history = props.modalHistory;
  const { pathname } = loc;

  const handleCancel = () => {
    const scrollY = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
    document.body.style.width = "100%";
    setVisible(false);
    //console.log(pathname);

    history.push(pathname);
    // <Redirect to={"/news/"} />;
    //window.history.back();
    //window.location
  };

  const showModal = () => {
    //console.log(tempY);
    //tempY = window.scrollY;
    //console.log(tempY);
    document.body.style.position = "fixed";
    document.body.style.top = `-${tempY}px`;

    //setVisible(true);
    setTimeout(function () {
      document.body.style.width = "100%";
    }, 500);

    document.body.style.top = `-${tempY}px`;
  };

  if (visible) {
    showModal();
  }
  return (
    <>
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
        className="main-menu-modal"
      >
        <MainMenuItem />
      </Modal>
    </>
  );
};

const NavBarMenu = ({ value }) => {
  //if (!value) return <></>;
  const {
    menuName = "Menu",
    menuIcon = null,
    menuLink = "#blank",
    menuActive = false,
    props = {},
  } = value;

  const size = "default";
  //const colorIcon = menuActive ? "#1da1f2" : "#9e9e9e";
  if (menuActive && props) {
  }
  const location = useLocation();
  let history = useHistory();

  const { pathname } = location;
  const hashData = location.hash;

  //console.log(hashData.endsWith("#menu"), hashData);

  let linkSelect = pathname === menuLink;
  if (menuLink !== "/") {
    linkSelect = pathname.startsWith(menuLink);
  }

  const [visible, setVisible] = useState(false);
  const checkMenuModal = (e) => {
    //console.log(e.target);
    if (!e) return;
    //console.log(menuLink);
    const menuStatus = menuLink !== "#menu";
    if (menuStatus) return;
    setVisible(true);
  };

  //console.log(typeof hashData);
  if (hashData === "") {
    if (visible) setVisible(false);
  }

  if (hashData === "#menu") {
    // console.log(hashData, visible);
    setTimeout(function () {
      if (document.querySelector(".ant-modal-root") === null) {
        //window.history.back();
        history.push(pathname);
      }
    }, 500);
    //history.push(pathname);
    //window.history.back();
  }

  //console.log(pathname);
  if (pathHideNav.indexOf(pathname) > -1) {
    return <></>;
  }

  return (
    <>
      {visible && (
        <MenuModal
          visibleData={visible}
          setVisibleData={setVisible}
          modalLocation={location}
          modalHistory={history}
        />
      )}
      <NavLink
        onClick={(event) => checkMenuModal(event)}
        to={menuLink}
        className={linkSelect ? "selected" : ""}
      >
        <Button
          type="link"
          icon={
            menuIcon && (
              <FontAwesomeIcon
                icon={["fas", menuIcon]}
                style={{
                  fontSize: "28px",
                  margin: 0,
                  marginBottom: "-8px",
                  // color: menuActive && colorIcon,
                }}
              />
            )
          }
          size={size}
          style={{ height: 54, margin: 0, padding: 0 }}
        >
          <span
            style={{
              fontSize: 16,
              fontFamily: "Roboto Mono",
              fontWeight: "bold",
              // color: colorIcon,
            }}
          >
            {menuName}
          </span>
        </Button>
      </NavLink>
    </>
  );
};

const NavBarSection = () => {
  return (
    <>
      <div id="navbar-section">
        <div className="navbar" id="myNavbar" style={{ maxWidth: 414 }}>
          <a
            className="selected"
            style={{ display: "none" }}
            name="navbar"
            href="#blank"
          >
            Blank
          </a>
          <NavBarMenu
            value={{
              menuName: "หน้าแรก",
              menuIcon: "home",
              menuLink: "/",
              menuActive: true,
            }}
          />
          <NavBarMenu
            value={{
              menuName: "ดูข่าวหวย",
              menuIcon: "newspaper",
              menuLink: "/news/",
              menuActive: false,
            }}
          />
          <NavBarMenu
            value={{
              menuName: "ส่องเลขเด็ด",
              menuIcon: "search-dollar",
              menuLink: "/lotto/",
              menuActive: false,
            }}
          />
          <NavBarMenu
            value={{
              menuName: "แสดงเมนู",
              menuIcon: "bars",
              menuLink: "#menu",
              menuActive: false,
            }}
          />
          {/* <a href="#about">
      <Button
        type="link"
        icon={
          <FontAwesomeIcon
            icon={["fas", "bars"]}
            style={{ fontSize: "28px", margin: 0 }}
          />
          // <MenuOutlined
          //   style={{ fontSize: 28, fontWeight: "bold", color: "#9e9e9e" }}
          // />
        }
        size={size}
        style={{ height: 54, margin: 0, padding: 0 }}
      >
        <span
          style={{
            fontSize: 16,
            fontFamily: "Roboto Mono",
            fontWeight: "bold",
            color: "#9e9e9e",
          }}
        >
          แสดงเมนู
        </span>
      </Button>
    </a> */}
        </div>
      </div>
    </>
  );
};

export default NavBarSection;
