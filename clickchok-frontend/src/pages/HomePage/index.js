// Main Switch Route in Home
import React from "react";
import { Layout, Row, Col } from "antd";
//import { Layout, Row, Col, Carousel, Button, List, Card } from "antd";
// import Navbar2 from '../../component/Navbar/Navbar2'
// import Footer from '../../component/Footer/Footer'
// import Banner from '../../component/Banner/Banner'
// import logo from './LOGO.png'
//import { Button } from 'antd';
//import { Link } from "react-router-dom";
//import logo from "../../assets/logoV1.png";
//import { MoreOutlined, SearchOutlined, MenuOutlined } from "@ant-design/icons";
//import { DatePicker } from "antd";
//import { faHome } from "@fortawesome/free-solid-svg-icons";
//import { DownloadOutlined } from "@ant-design/icons";
// import LogoItem from "../../component/Logo";
// import NewsMenuItem from "../../component/NewsMenuItem";
import HeaderSection from "../../containers/layout/Header";
import CenterRoute from "../../containers/layout/CenterRouter.js";

import { library } from "@fortawesome/fontawesome-svg-core";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

const { Header, Content, Footer } = Layout;

// class Home extends React.Component {
//   render() {
function Home() {
  // const [showHomeNewsList, setShowHomeNewsList] = React.useState(0);

  // const onClick = (cid) => setShowHomeNewsList(cid);

  let className = "";
  if (!className) {
    className += " tab-list-active";
  }
  //console.log(className);
  //Fix Position Render
  document.body.style.position = "";
  document.body.style.top = "";

  return (
    <Layout
      className="layout"
      style={{
        height: "100%",
        maxWidth: 414,
        // minWidth: 280,
        // maxWidth: "100vw",
        // width: "calc(100vw - 6px)",
        // width: "calc(100% - 6px)",
        zIndex: 1,
        overflowX: "hidden",
      }}
    >
      <div>
        <div>
          <Header style={{ padding: 0, margin: 0 }}>
            <HeaderSection
              containerStyle={{
                backgroundColor: "unset",
              }}
            />
          </Header>
          <Content
            id="main-page"
            style={{
              padding: 0,
              minHeight: "calc( 100vh - 80px)",
              paddingBottom: 80,
              // display: "none",
            }}
          >
            <CenterRoute />
          </Content>

          <Footer style={{ display: "none" }}>
            <Row>
              <Col span={24}>
                <div
                  style={{ textAlign: "center", maxHeight: 22, padding: 21 }}
                >
                  Click Chok ©2021 Created by Ch.AI
                </div>
              </Col>
            </Row>
          </Footer>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
