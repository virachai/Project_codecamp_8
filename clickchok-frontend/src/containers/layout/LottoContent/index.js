// Page Switch Content
// import React, { useState } from "react";
import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import LottoMenuItem from "../../../component/LottoMenuItem";
import LottoBlog from "../../../component/LottoBlog";
import CheckNumBar from "../../../component/CheckNum";
import { Layout, Row, Col } from "antd";
import axiosInstance, { BASE_URL } from "../../../config/axios";
// import { SearchOutlined } from "@ant-design/icons";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

const title2digi = "II สองตัวมาแรง";
const title3digi = "III สามตัวมาแรง";

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
        newDigi.push({ title: swapDigi, count: 1 });
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

  return [...digiData];
  // console.log(found, mapData);
};

const getLottoNews = (numTitle, listNewsData) => {
  const count = [...listNewsData].filter((itm) =>
    [...getHotNumber(itm.newsDesc)].some((itm) => {
      // if (itm.title === numTitle) console.log(numTitle, itm.title);
      return itm.title === numTitle || itm.title === swapNumDigi(numTitle);
    })
  );
  // console.log("ViewModal", numTitle, count);
  return count;
};

function LottoContent() {
  const [listNewsData, setListNewsData] = useState([]);
  if (listNewsData || setListNewsData) {
  }

  // const dateInt = (dateStr) => {
  //   return new Date(dateStr).getTime();
  // };

  // const dateInt = (dateStr) => {
  //   return new Date(dateStr).getTime();
  // };

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
          setListNewsData(
            [...response.data].map((itm) => {
              return { ...itm, imageURL: getImageData(itm.newsImagePath) };
            })
          );
          // const data = [...response.data]
          //   .filter((itm) => itm.group_id === 2)
          //   .sort((a, b) => dateInt(b.updatedAt) - dateInt(a.updatedAt))
          //   .map((itm) => {
          //     return { ...itm, imageURL: getImageData(itm.newsImagePath) };
          //   });
          //   .filter((itm, index) => index < 4 && itm);

          //console.log("api data", data);
          //setListNewsData4(data);
        },
        (err) => {
          console.log("api fail", err);
        }
      );
    };
    fetchNewsList();
  }, []);

  const descText = listNewsData.map((itm) => itm.newsDesc).join("");
  const hotLotto = getHotNumber(descText);

  const mapLotto = new Map();
  hotLotto.forEach((itm) => {
    mapLotto.set(itm.title, itm.count);
  });

  const lottoUnique = [...mapLotto.keys()];
  const lottoTop = lottoUnique
    .map((itm) => {
      return {
        title: itm,
        count: [...getLottoNews(itm, listNewsData)].length,
        news: [...getLottoNews(itm, listNewsData)],
      };
    })
    .sort((a, b) => b.count - a.count);
  // console.log(lottoTop);
  const lotto2digi = lottoTop.filter((itm) => itm.title.length === 2);
  // console.log(lotto2digi);

  const lotto3digi = lottoTop.filter((itm) => itm.title.length === 3);

  // console.log(lotto2digi);
  return (
    <>
      <Layout id="homepage-layout">
        <Row>
          <Col span={24} className="row-news-menu">
            <LottoMenuItem value={"Nav First - LottoMenuItem"} />
          </Col>
        </Row>
        <Switch>
          <Route path="/lotto-stat/">
            <Row>
              <Col span={24} style={{ textAlign: "center", padding: "30px 0" }}>
                <div>
                  <FontAwesomeIcon
                    icon={["fas", "tools"]}
                    style={{
                      fontSize: "64px",
                      color: "#f44336",
                    }}
                  />
                </div>
                <div>
                  <h2>Page Under Construction</h2>
                </div>
              </Col>
            </Row>
          </Route>
          <Route exact path="/lotto/">
            <Row>
              <Col span={24}>
                <LottoBlog
                  title={title2digi}
                  data={lotto2digi.filter((elm, index) => index < 6 && elm)}
                  link={"/lotto/2digi"}
                  loading={null}
                  listNewsData={listNewsData}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <CheckNumBar value={"Search"} />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <LottoBlog
                  title={title3digi}
                  data={lotto3digi.filter((elm, index) => index < 6 && elm)}
                  link={"/lotto/3digi"}
                  loading={null}
                  listNewsData={listNewsData}
                />
              </Col>
            </Row>
          </Route>
          <Route exact path="/lotto/2digi">
            <Row>
              <Col span={24}>
                <LottoBlog
                  title={title2digi}
                  data={lotto2digi}
                  link={null}
                  limit={12}
                  listNewsData={listNewsData}
                />
              </Col>
            </Row>
          </Route>
          <Route exact path="/lotto/3digi">
            <Row>
              <Col span={24}>
                <LottoBlog
                  title={title3digi}
                  data={lotto3digi}
                  link={null}
                  limit={12}
                  listNewsData={listNewsData}
                />
              </Col>
            </Row>
          </Route>
        </Switch>
      </Layout>
    </>
  );
}

export default LottoContent;
