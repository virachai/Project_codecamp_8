// Page Switch Content
// import React, { useState } from "react";
import NewsMenuItem from "../../../component/NewsMenuItem";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   Redirect,
// } from "react-router-dom";
import { Layout, Row, Col, Carousel, Button, List } from "antd";
// import { MoreOutlined, SearchOutlined, MenuOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

const imgFeature =
  "https://s.isanook.com/ho/0/rp/rc/w535h321/ya0xa0m1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL2hvLzAvdWQvNDEvMjA3NDQ1L25ld3Byb2plY3QtMjAyMS0wNi0wMXQxNTIzLmpwZw==.jpg";

function HomeContent() {
  return (
    <>
      <Layout id="homepage-layout">
        <Row>
          <Col span={24} className="row-news-menu">
            <NewsMenuItem value={"Nav First - NewsMenuItem"} />
            {/* <NavFirstPage value={"Nav First"} /> */}
            {/* <Breadcrumb style={{ margin: "16px 0" }}>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>List</Breadcrumb.Item>
                  <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className="HomePage">
              <div className="jsx-3825345135 CategoryPage-horoscope main">
                <section>
                  <div className="jsx-1940298092 container">
                    <Row>
                      <Col span={24}>
                        <div className="jsx-1940298092 highlight">
                          <CarouselSection />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </section>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <SearchCarNum value={"Search"} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <LottoSection value={"II สองตัวมาแรง"} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <LottoSection value={"III สามตัวมาแรง"} />
          </Col>
        </Row>
      </Layout>
    </>
  );
}

const data = [
  {
    title: "22",
  },
  {
    title: "55",
  },
  {
    title: "880",
  },
];

const contentStyle = {
  height: "100%",
  maxHeight: "320px",
  color: "#000",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const Headline = ({ value }) => {
  const newsOrder = value.substr(0, 1);
  return (
    <div>
      <article
        className="jsx-2611106953 PostStandard highlight"
        style={{ contentStyle }}
      >
        <div className="jsx-3562947258 gb-post-standard-thumbnail thumbnail highlight ">
          <a title="title" href="#post">
            <div className="jsx-3562947258 thumbnailImg">
              <img src={imgFeature} style={{ maxWidth: "100%" }} alt="Name" />
            </div>
          </a>
        </div>
        <div className="jsx-2611106953 desc">
          <div
            className="jsx-2430232205 jsx-180597169 PostBody highlight"
            style={{ padding: "4px 8px" }}
          >
            <h3
              className="jsx-2430232205 jsx-180597169 postTitle gb-post-standard-title"
              style={{ contentStyle }}
            >
              <a
                title="title"
                href="#post"
                style={{
                  color: "#212121",
                  fontFamily: "kanit",
                  fontSize: 20,
                }}
              >
                {newsOrder} คอหวยโล่งอก! กองสลากฯ ยืนยัน งวดวันที่ 30 ธันวาคม
                ไม่เลื่อนออกรางวัล
              </a>
            </h3>
          </div>
        </div>
      </article>
    </div>
  );
};

const LottoItem = (props) => {
  const size = "default";
  return (
    <>
      <a href="#post">
        <div className="lotto-card">
          {props.title}
          <Button
            className="ant-card-icon"
            type="primary"
            shape="circle"
            size={size}
          >
            <span style={{ transform: "translateY(-2px)", fontSize: "120%" }}>
              2
            </span>
          </Button>
        </div>
      </a>
    </>
  );
};

const LottoSection = ({ value }) => {
  return (
    <div
      style={{
        padding: "8px",
      }}
    >
      {/* <Divider orientation="left">{value}</Divider> */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "Roboto Mono",
            fontSize: 18,
            fontWeight: "bold",
            color: "#14171a",
            letterSpacing: "0px",
          }}
        >
          {value}
        </h2>
        <Button
          icon={
            <FontAwesomeIcon
              icon={["fas", "arrow-right"]}
              style={{ optical: "0.8" }}
            />
          }
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            border: 0,
          }}
        ></Button>
      </div>
      <List
        style={{ margin: "0 -6px" }}
        id="lotto-list"
        grid={{
          gutter: 16,
          // xs: 1,
          // sm: 2,
          // md: 4,
          // lg: 4,
          // xl: 6,
          // xxl: 3,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item style={{ margin: "0 6px" }}>
            <LottoItem title={item.title} />
          </List.Item>
        )}
      />
    </div>
  );
};

const NewsListSection = () => {
  return (
    <div>
      <Carousel>
        <div>
          <Headline value={"1. Hello Function Component!"} />
        </div>
        <div>
          <Headline value={"2. Hello Function Component!"} />
        </div>
        <div>
          <Headline value={"3. Hello Function Component!"} />
        </div>
        <div>
          <Headline value={"4. Hello Function Component!"} />
        </div>
      </Carousel>
    </div>
  );
};

const CarouselSection = () => {
  return (
    <div>
      <Carousel>
        <div>
          <Headline value={"1. Hello Function Component!"} />
        </div>
        <div>
          <Headline value={"2. Hello Function Component!"} />
        </div>
        <div>
          <Headline value={"3. Hello Function Component!"} />
        </div>
        <div>
          <Headline value={"4. Hello Function Component!"} />
        </div>
      </Carousel>
    </div>
  );
};

const SearchCarNum = ({ value }) => {
  return (
    <div>
      <div
        style={{
          height: 60,
          maxHeight: 60,
          backgroundColor: "#E1E8ED",
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <CarFilled style={{ fontSize: "40px", color: "#00bcd4", margin: 10 }} /> */}
        {/* <i class="fas fa-motorcycle"></i> */}
        {/* <div>
          <FontAwesomeIcon
            icon={["fas", "motorcycle"]}
            style={{ fontSize: "40px", color: "#00bcd4", margin: 10 }}
          />
        </div> */}

        <div>
          <FontAwesomeIcon
            icon={["fas", "car"]}
            style={{ fontSize: "40px", color: "#00bcd4", margin: 5 }}
          />
        </div>

        <div style={{ minWidth: "calc(100% - 90px)", margin: 5 }}>
          <Button
            icon={<SearchOutlined />}
            style={{
              minWidth: "calc(100%)",
              borderRadius: 11,
              color: "#757575",
              fontFamily: "Source Sans Pro",
            }}
          >
            รถคุณให้โชค? ตรวจเลขทะเบียนกัน
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
