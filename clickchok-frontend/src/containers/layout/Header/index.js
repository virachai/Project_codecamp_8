import React from "react";
// import ReactDOM from "react-dom";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
// import logoImage from "./logo-Item-v1.png";
// Route Switch Header Layout
import { Row, Col } from "antd";
import LogoItem from "../../../component/Logo";
import LogoIconItem from "../../../component/LogoItem";
import "./index.css";

const ComponentHeader = (props) => {
  //console.log("ComponentHeader", props);
  if (!props) return <></>;
  if (!props.itemComponent) return <></>;
  if (!props.itemComponent.item) return <></>;
  // props.itemComponent.style

  const ItemComponent = props.itemComponent.item;
  return (
    <>
      {/* {props.itemComponent.title} */}
      <div style={props.itemComponent.style}>
        <ItemComponent
          icon={props.itemComponent.icon}
          title={props.itemComponent.title}
          link={props.itemComponent.link}
          className={props.itemComponent.className}
        />
      </div>
    </>
  );
};

const HeaderSection = (props) => {
  if (!props) return;

  let containerStyle = props.containerStyle;
  //console.log("centerComponent", centerComponent);
  //console.log("props", props);
  if (typeof props.statusBarProps === "object") {
    containerStyle = { ...containerStyle, ...props.statusBarProps };
  }

  const itemStyle = {
    display: "flex",
    justifyContent: "left",
    paddingLeft: 20,
  };

  return (
    <>
      <Row>
        <Col span={24} style={containerStyle}>
          <div className="header-section" style={{ position: "relative" }}>
            {/* {location.pathname} */}
            {/* <Router> */}
            <Switch>
              <Route exact path="/">
                <ComponentHeader
                  itemComponent={{
                    item: LogoItem,
                    style: { display: "flex", justifyContent: "center" },
                    link: "/",
                  }}
                />
              </Route>
              <Route exact path="/menu/">
                <ComponentHeader
                  itemComponent={{
                    item: LogoItem,
                    style: { display: "flex", justifyContent: "center" },
                    link: "/",
                  }}
                />
              </Route>
              <Route path="/news/">
                <ComponentHeader
                  itemComponent={{
                    item: LogoIconItem,
                    title: "ข่าวหวย",
                    icon: "newspaper",
                    style: itemStyle,
                    link: "/news/",
                  }}
                />
              </Route>
              <Route path="/lotto/">
                <ComponentHeader
                  itemComponent={{
                    item: LogoIconItem,
                    title: "เลขเด็ด",
                    icon: "search-dollar",
                    style: itemStyle,
                    link: "/lotto/",
                  }}
                />
              </Route>
              <Route path="/lotto-stat/">
                <ComponentHeader
                  itemComponent={{
                    item: LogoIconItem,
                    title: "เลขเด็ด",
                    icon: "search-dollar",
                    style: itemStyle,
                    link: "/lotto/",
                  }}
                />
              </Route>
              <Route path="/number-checker/">
                <ComponentHeader
                  itemComponent={{
                    item: LogoIconItem,
                    title: "ตรวจหวยย้อนหลัง",
                    icon: "search",
                    style: itemStyle,
                    link: "/number-checker/",
                    className: "number-checker",
                  }}
                />
                {/* chevron-left */}
                <div
                  style={{
                    position: "absolute",
                    padding: 0,
                    top: 0,
                    right: 10,
                  }}
                >
                  <ComponentHeader
                    itemComponent={{
                      item: LogoIconItem,
                      title: "",
                      icon: "times",
                      style: itemStyle,
                      link: "/",
                      className: "number-checker",
                    }}
                  />
                </div>
              </Route>
            </Switch>
            {/* </Router> */}
          </div>

          {/* <Header
                  placement="left"
                  leftComponent={{ icon: "menu", color: "#fff" }}
                  centerComponent={{
                    text: "MY TITLE",
                    style: { color: "#fff" },
                  }}
                  rightComponent={{ icon: "home", color: "#fff" }}
                  statusBarProps={{ barStyle: "light-content" }}
                  barStyle="light-content" // or directly
                  leftComponent={<MyCustomLeftComponent />}
                  centerComponent={{
                    text: "MY TITLE",
                    style: { color: "#fff" },
                  }}
                  containerStyle={{
                    backgroundColor: "#3D6DCC",
                    justifyContent: "space-around",
                  }}
                /> */}
        </Col>
      </Row>
    </>
  );
};

export default HeaderSection;
