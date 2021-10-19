// Page Switch Content
// import React, { useState } from "react";
import React, { useState, useEffect } from "react";
import NewsMenuItem from "../../../component/NewsMenuItem";
import NewsBlog from "../../../component/NewsBlog";
import LottoBlog from "../../../component/LottoBlog";
import CheckNumBar from "../../../component/CheckNum";
import { Layout, Row, Col, Carousel } from "antd";
import axiosInstance, { BASE_URL } from "../../../config/axios";
// import Item from "antd/lib/list/Item";

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

const HomeContent = (props) => {
  if (props) {
  }

  const [listNewsData, setListNewsData] = useState([]);

  const descText = listNewsData.map((itm) => itm.newsDesc).join("");
  const hotLotto = getHotNumber(descText);

  //console.log(hotLotto);

  const mapLotto = new Map();
  hotLotto.forEach((itm) => {
    mapLotto.set(itm.title, itm.count);
  });

  // console.log(mapLotto);
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
  const lotto2digi = lottoTop
    .filter((itm) => itm.title.length === 2)
    .filter((elm, index) => index < 3 && elm);
  const lotto3digi = lottoTop
    .filter((itm) => itm.title.length === 3)
    .filter((elm, index) => index < 3 && elm);
  // console.log(lotto2digi);

  return (
    <>
      <Layout id="homepage-layout">
        <Row>
          <Col span={24} className="row-news-menu">
            <NewsMenuItem value={"NewsMenuItem"} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className="HomePage">
              <div className="CategoryPage-horoscope main">
                <section>
                  <div className="container">
                    <Row>
                      <Col span={24}>
                        <div className="highlight">
                          <CarouselSection
                            setListNewsData={setListNewsData}
                            listNewsData={listNewsData}
                          />
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
            <CheckNumBar value={"Search"} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <LottoBlog
              title={"II สองตัวมาแรง"}
              data={lotto2digi}
              link={"/lotto/2digi"}
              loading={null}
              listNewsData={listNewsData}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <LottoBlog
              title={"III สามตัวมาแรง"}
              data={lotto3digi}
              link={"/lotto/3digi"}
              loading={null}
              listNewsData={listNewsData}
            />
          </Col>
        </Row>
      </Layout>
    </>
  );
};

const CarouselSection = (props) => {
  if (props) {
  }
  // const [listNewsData, setListNewsData] = useState([]);
  const { setListNewsData } = props;
  const [listNewsData4, setListNewsData4] = useState([]);

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
    const fetchNewsList = async (setListNewsData) => {
      axiosInstance.get("/api/news-data").then(
        (response) => {
          setListNewsData(
            [...response.data].map((itm) => {
              return { ...itm, imageURL: getImageData(itm.newsImagePath) };
            })
          );
          const data = [...response.data]
            .filter((itm) => itm.group_id === 2)
            .sort((a, b) => dateInt(b.updatedAt) - dateInt(a.updatedAt))
            .filter((itm, index) => index < 4 && itm)
            .map((itm) => {
              return { ...itm, imageURL: getImageData(itm.newsImagePath) };
            });

          //console.log("api data", data);
          setListNewsData4(data);
        },
        (err) => {
          console.log("api fail", err);
        }
      );
    };
    fetchNewsList(setListNewsData);
  }, [setListNewsData]);

  const viewItem = (newsData) => {
    // console.log("viewItem");
    return (
      <div key={"news-key-" + newsData.id}>
        <NewsBlog newsData={newsData} />
      </div>
    );
  };

  const listItem = listNewsData4.map((itm) => viewItem(itm));

  return (
    <div>
      <Carousel>{listItem}</Carousel>
    </div>
  );
};

export default HomeContent;
