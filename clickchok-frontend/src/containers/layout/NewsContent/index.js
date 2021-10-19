import React, { useState, useEffect } from "react";
import {
  // BrowserRouter as Router,
  Switch,
  Route,
  // useLocation,
  useParams,
  // NavLink,
} from "react-router-dom";
import NewsMenuItem from "../../../component/NewsMenuItem";
import NewsBlog from "../../../component/NewsBlog";
import NewsBlogSide from "../../../component/NewsBlogSide";
import { Layout, Row, Col, List, Button } from "antd";
// import { ExpandAltOutlined } from "@ant-design/icons";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import "./index.css";

import axiosInstance, { BASE_URL } from "../../../config/axios";

library.add(fas);
library.add(far);

const contentStyle = {
  height: "100%",
  maxHeight: "320px",
  color: "#000",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

// const dataNumNews = [
//   {
//     title: "22",
//   },
// ];

const swapNumDigi = (num) => {
  let swap = "";
  num
    .split("")
    .reverse()
    .forEach((itm) => {
      swap += itm;
    });
  //console.log(num, swap);
  return swap === num ? "" : swap;
};

const getNumDigi = (num = 0, digi = 2) => {
  let newDigi = [];
  const numOnly = num.replace(/\D+/g, "");

  if (numOnly.length < digi) return newDigi;
  numOnly.split("").forEach((itm, index) => {
    if (!itm) {
    }
    let str = numOnly.substr(index, digi);
    if (str.length === digi) {
      if (newDigi.length === 0) {
        newDigi.push({ title: str, count: 3 });
      }

      if (newDigi.length > 0) {
        if (newDigi.every((itm) => itm.title !== str)) {
          newDigi.push({ title: str, count: 2 });
        }
      }
      // console.log("str", str);
      const swapDigi = swapNumDigi(str);
      // console.log("swapDigi", swapDigi);
      if (swapDigi !== "" && newDigi.every((itm) => itm.title !== swapDigi)) {
        //newDigi.push({ title: swapDigi, count: 1 });
      }
    }
  });
  return newDigi;
};

const getHotNumber = (news) => {
  if (!news) return [];

  const mapData = new Map();
  const str = news.replaceAll("-", "").replaceAll(" ", "");
  // var reg = new RegExp("/^([0-9s]){2,}$/");
  const regex = /"([0-9]{2,30})"/g;
  const found = str.match(regex);
  let digiData = [];

  if (!found) return [];

  if (found) {
    // data2digi = [...getNumDigi(found[0], 2)];
    // data3digi = [...getNumDigi(found[0], 3)];
    found.forEach((itm) => {
      digiData = [...digiData, ...getNumDigi(itm, 2)];
      digiData = [...digiData, ...getNumDigi(itm, 3)];
    });

    digiData.forEach((itm) => {
      mapData.set(itm.title, itm.count);
    });
  }

  return [...mapData.keys()];
  // console.log(found, mapData);
};

function NewsViewContent() {
  const { id } = useParams();
  // console.log(id);

  const [listNewsData, setListNewsData] = useState([]);
  const [newsData, setNewsData] = useState({});
  // const [newsData2, setNewsData2] = useState({});
  if (listNewsData || setListNewsData) {
  }

  const dateInt = (dateStr) => {
    return new Date(dateStr).getTime();
  };

  const getImageData = (newsImagePath) => {
    const pathImg = newsImagePath;
    if (!pathImg) return [];
    const path2Url = (path) => {
      return (
        BASE_URL +
        "/" +
        [...path.split("\\")].filter((itm, index) => index > 0 && itm).join("/")
      );
    };

    return path2Url(pathImg);
  };

  useEffect(() => {
    const fetchNewsList = async (id, setNewsData) => {
      axiosInstance.get("/api/news-data").then(
        (response) => {
          const data = [...response.data]
            // .filter((itm) => itm.group_id === 2)
            // .filter((itm, index) => index < 4 && itm)
            .sort((a, b) => dateInt(b.updatedAt) - dateInt(a.updatedAt))
            .map((itm) => {
              return {
                ...itm,
                imageURL: getImageData(itm.newsImagePath),
                groupName: itm.tbNewsGroup.groupName,
              };
            });

          // setListNewsData(data);
          const newsId = data.filter((itm) => Number(itm.id) === Number(id));
          setNewsData(newsId[0]);
          // console.log("news data", newsId[0]);
        },
        (err) => {
          console.log("api fail", err);
        }
      );
    };
    fetchNewsList(id, setNewsData);
  }, [id, setNewsData]);

  const formatDate = (date) => {
    const thMonth = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];
    // console.log(date);
    let d = new Date(date),
      minute = "" + d.getMinutes(),
      hour = "" + d.getHours(),
      // month = "" + (d.getMonth() + 1),
      monthThai = "" + thMonth[d.getMonth()],
      day = "" + d.getDate(),
      year = d.getFullYear() + 543;

    // if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return `${day} ${monthThai} ${year} (${hour}:${minute} น.)`;
  };

  const newsDateTh = formatDate(newsData["updatedAt"]);
  // getHotNumber(`"12345" dddd "987654"`);
  // newsData["newsDesc"]
  let LottoNum = getHotNumber(newsData["newsDesc"]);
  // setTimeout(function () {
  //   LottoNum = getHotNumber(newsData["newsDesc"]);
  //   console.log(LottoNum);
  // }, 500);

  return (
    <>
      <Layout id="news-page-layout news-view-id">
        <article className="PostStandard highlight" style={{ contentStyle }}>
          <Row>
            <Col
              span={24}
              className="hero-section hero-section-grad"
              style={{ padding: "8px 6px", maxHeight: 90 }}
            >
              <div style={{ width: "100%" }}>
                <span
                  style={{
                    color: "#cddc39",
                    fontSize: 16,
                    fontFamily: "Kanit",
                    fontStyle: "italic",
                  }}
                >
                  {newsData["groupName"]}
                </span>
                <span
                  style={{
                    color: "#f5f5f5",
                    fontSize: 14,
                    fontFamily: "Kanit",
                    float: "right",
                  }}
                >
                  {newsDateTh}
                  {/* 20 พ.ค. 2664 (12:21 น.) */}
                </span>
              </div>
              <div>
                <h1
                  style={{
                    color: "#f5f5f5",
                    fontSize: 20,
                    fontFamily: "Kanit",
                    lineHeight: "125%",
                  }}
                >
                  {newsData["newsName"]}
                </h1>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className="gb-post-standard-thumbnail thumbnail highlight ">
                <div className="thumbnailImg">
                  <img
                    src={newsData["imageURL"]}
                    style={{ maxWidth: "100%" }}
                    alt="Name"
                  />
                </div>
                <div className="detailWrap" style={{ padding: 6 }}>
                  {(newsData["newsDesc"] + "")
                    .split("\n")
                    .map(function (item, idx) {
                      return <p key={idx}>{item}</p>;
                    })}
                </div>
                <div
                  className="lottoNum"
                  style={{
                    padding: 6,
                    minHeight: 100,
                    backgroundColor: "#e0e0e0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "left",
                      position: "relative",
                      padding: "3px 0",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={["far", "hand-point-right"]}
                      style={{ margin: "0 8px", fontSize: 24, padding: 0 }}
                    />
                    <h3
                      style={{
                        color: "#212121",
                        fontFamily: "Roboto Mono",
                        fontSize: 16,
                        fontWeight: "bold",
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      เปิดข่าวส่องเลข
                    </h3>
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "-2px",
                        display: "none",
                      }}
                    >
                      <Button
                        type="ghost"
                        style={{
                          padding: 0,
                          margin: 0,
                          borderRadius: "15px",
                          width: 30,
                          height: 30,
                          border: 0,
                          marginLeft: 4,
                        }}
                        icon={
                          <FontAwesomeIcon
                            icon={["fas", "expand-alt"]}
                            style={{
                              margin: 0,
                              padding: 0,
                              color: "gray",
                              fontSize: 16,
                              transform: "translateY(0px)",
                            }}
                          />
                        }
                      />
                    </div>
                  </div>
                  <div
                    className="item-number-list"
                    style={{
                      padding: "4px 8px",
                      marginBottom: "-6px",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <List
                      style={{}}
                      id="news-list-num"
                      grid={{
                        gutter: 16,
                      }}
                      dataSource={LottoNum.sort((a, b) => a - b)}
                      renderItem={(item) => (
                        <List.Item
                          style={{
                            marginBottom: 5,
                          }}
                          className="list-item-number"
                        >
                          <Button
                            style={{
                              height: 56,
                              width: 56,
                              maxHeight: 56,
                              maxWidth: 56,
                              color: "#2196f3",
                              borderRadius: "50%",
                              fontFamily: "Roboto Mono",
                              fontSize: 22,
                              fontWeight: "bold",
                              textAlign: "center",
                              padding: 0,
                              margin: "0 3px",
                            }}
                          >
                            {item}
                          </Button>
                        </List.Item>
                      )}
                    />
                  </div>
                </div>
                <div
                  className="relationships-news"
                  style={{
                    padding: 6,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "left",
                      position: "relative",
                      padding: "6px 0",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={["far", "newspaper"]}
                      style={{ margin: "0 8px", fontSize: 24, padding: 0 }}
                    />
                    <h3
                      style={{
                        color: "#212121",
                        fontFamily: "Roboto Mono",
                        fontSize: 16,
                        fontWeight: "bold",
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      {/* <i class="far fa-hand-point-right"></i> */}
                      ข่าวที่น่าสนใจ
                    </h3>
                  </div>
                  <div className="item-relationships-news-list">
                    <List
                      dataSource={[newsData, newsData]}
                      renderItem={(item) => (
                        <List.Item style={{ width: "100%" }}>						 
                          <NewsBlogSide data={item} />
                        </List.Item>
                      )}
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </article>
      </Layout>
    </>
  );
}

function NewsListContent({ pid, newsAll }) {
  return (
    <>
      <Layout id="news-page-layout">
        <Row>
          <Col span={24} className="row-news-menu">
            <NewsMenuItem value={"Nav First - NewsMenuItem"} />
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
                          <NewsListSection pid={pid} newsAll={newsAll} />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </section>
              </div>
            </div>
          </Col>
        </Row>
      </Layout>
    </>
  );
}

function NewsCenterContent() {
  let { id } = useParams();
  id = id || "ab";

  const [listNewsData, setListNewsData] = useState([]);

  const dateInt = (dateStr) => {
    return new Date(dateStr).getTime();
  };

  const getImageData = (newsImagePath) => {
    const pathImg = newsImagePath;
    if (!pathImg) return [];
    const path2Url = (path) => {
      return (
        BASE_URL +
        "/" +
        [...path.split("\\")].filter((itm, index) => index > 0 && itm).join("/")
      );
    };

    return path2Url(pathImg);
  };

  useEffect(() => {
    const fetchNewsList = async () => {
      axiosInstance.get("/api/news-data").then(
        (response) => {
          const data = [...response.data]
            // .filter((itm) => itm.group_id === 2)
            // .filter((itm, index) => index < 4 && itm)
            .sort((a, b) => dateInt(b.updatedAt) * 1 - dateInt(a.updatedAt) * 1)
            .map((itm) => {
              return {
                ...itm,
                imageURL: getImageData(itm.newsImagePath),
                groupName: itm.tbNewsGroup.groupName,
              };
            });

          setListNewsData(data);
          // console.log("news data", data);
        },
        (err) => {
          console.log("api fail", err);
        }
      );
    };
    fetchNewsList();
  }, []);
  const catalog = id.length === 2 && !Number(id);
  const Section = catalog ? NewsListContent : NewsViewContent;

  document.body.style.position = "";
  document.body.style.top = "";
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

  return (
    <>
      <Section pid={id} newsAll={listNewsData} />
    </>
  );
}

function NewsContent() {
  // usePageViews();

  return (
    <>
      <Switch>
        <Route exact path="/news/">
          <NewsCenterContent />
        </Route>
        <Route exact path="/news/:id" children={<NewsCenterContent />} />
      </Switch>
    </>
  );
}

// const data = [];

const NewsListSection = ({ pid, newsAll }) => {
  // console.log(
  //   pid,
  //   [...newsAll].filter((itm) => itm.tbNewsGroup.groupCode === pid)
  // );

  return (
    <div>
      <Row className="lotto-news-list">
        <Col span={24}>
          <div className="jsx-0 news-list news-list-0">
            <div>
              <List
                style={{}}
                id="news-list-catalog"
                grid={{
                  gutter: 16,
                  // xs: 1,
                  // sm: 2,
                  // md: 4,
                  // lg: 4,
                  // xl: 6,
                  // xxl: 3,
                }}
                dataSource={[...newsAll].filter(
                  (itm) => itm.tbNewsGroup.groupCode === pid
                )}
                renderItem={(item) => (
                  <List.Item style={{}}>
                    <NewsBlog newsData={item} />
                  </List.Item>
                )}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default NewsContent;
