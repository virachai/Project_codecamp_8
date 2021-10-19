import { NavLink } from "react-router-dom";
// import { Button } from "antd";
import React, { useState } from "react";
import { Modal, Button, List } from "antd";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { isNumber } from "lodash";
import NewsBlogSide from "../NewsBlogSide";
import "./index.css";

library.add(fas);
library.add(far);

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

  // const mapData = new Map();
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

    // digiData.forEach((itm) => {
    //   mapData.set(itm.title, itm.count);
    // });
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

const ViewModal = (props) => {
  const { listNewsData } = props;
  if (props || listNewsData) {
  }

  const { title } = props.data;

  const newsList = getLottoNews(title, listNewsData);
  console.log("newsList", newsList);
  // console.log("listNewsData", listNewsData);

  const size = "default";
  const style = {};
  // let undefinedCheck;
  const countNum = props.data.count;
  const backgroundCard = getColorsCard(countNum);
  style.background = backgroundCard;
  //   Array(3)         // produces sparse array: [empty × 3]
  // Array(3).slice() // produces [empty × 3]
  // [...Array(3)]    // produces [undefined, undefined, undefined]

  return (
    <>
      <div className="section-view-lotto-num">
        <div
          style={{
            padding: "0 8px",
            margin: 12,
            width: 120,
            position: "relative",
            marginLeft: "calc(50% - 60px)",
            marginRight: "calc(50% - 60px)",
          }}
        >
          <div className="section-lotto-card"></div>
          <div className="lotto-card" style={style}>
            {props.data.title}
            <Button
              className="ant-card-icon"
              type="primary"
              shape="circle"
              size={size}
            >
              <span style={{ transform: "translateY(-2px)", fontSize: "120%" }}>
                {props.data.count || "0"}
              </span>
            </Button>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <p>
            <Button
              type="primary"
              size="default"
              icon={
                <FontAwesomeIcon
                  icon={["fas", "star"]}
                  style={{ margin: "0 4px", padding: 0 }}
                />
              }
              style={{ minWidth: 220, borderRadius: "14px" }}
            >
              อยู่ในข่าวหวยงวดนี้ X {props.data.count || "0"} รายการ
            </Button>
          </p>
        </div>
      </div>

      {/* <p>{typeof props.modal === typeof undefinedCheck}</p> */}
      <div
        className="relationships-news"
        style={{
          padding: 6,
          // overflow: "hidden",
          width: "100%",
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
            ข่าวที่เกี่ยวกับเลขเด็ด ({props.data.title})
          </h3>
        </div>

        <div
          className="item-relationships-news-list"
          style={{
            minHeight: 152,
            maxHeight: 152 * 2.1,
            // overflow: "auto",
            // marginRight: "-25px",
            // paddingRight: 12,
            overflowX: "hidden",
            overflowY: "scroll",
          }}
        >
          <List
            dataSource={newsList}
            renderItem={(item) => (
              <List.Item style={{ width: "100%", height: "max-content" }}>
                <NewsBlogSide data={item} />
              </List.Item>
            )}
          />
        </div>
      </div>
    </>
  );
};

const getColorsCard = (countNum) => {
  const colorsCard = [
    "#808080",
    "#212121",
    "#3E2723",
    "#BF360C",
    "#33691E",
    "#1B5E20",
    "#004D40",
    "#006064",
    "#01579B",
    "#0D47A1",
    "#1A237E",
    "#311B92",
    "#4A148C",
    "#880E4F",
    "#B71C1C",
  ];
  if (countNum !== null && colorsCard) {
    if (isNumber(countNum)) {
      if (countNum > 0 && countNum < colorsCard.length) {
        return colorsCard[countNum];
      } else {
        return colorsCard[colorsCard.length - 1];
      }
    }
  }
  return "gray";
};

const LottoNumItem = (props) => {
  const [visible, setVisible] = useState(false);
  const { listNewsData } = props;
  // console.log("listNewsData", listNewsData);
  // const [scrollY, setScrollY] = useState(0);

  let tempY = window.scrollY;
  // let backgroundCard = "gray";
  const countNum = props.count;
  const backgroundCard = getColorsCard(countNum);

  const handleCancel = () => {
    const scrollY = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
    document.body.style.width = "100%";
    setVisible(false);
    // document.body.style.position = "";
    // document.body.style.top = "";
    // window.location = window.location.href.split("#")[0];
    window.history.back();
  };

  const showModal = () => {
    //console.log(tempY);
    tempY = window.scrollY;
    //console.log(tempY);
    document.body.style.position = "fixed";
    document.body.style.top = `-${tempY}px`;

    // setVisible(true);
    // setTimeout(function () {
    //   document.body.style.position = "fixed";
    //   document.body.style.top = `-${window.scrollY}px`;
    // }, 3000);
    setVisible(true);
    setTimeout(function () {
      document.body.style.width = "100%";
    }, 500);

    document.body.style.top = `-${tempY}px`;
  };

  const getBackgroundCard = (e) => {
    if (props.modal === null) return;
    // console.log(e.target);
    showModal();
  };

  const size = "default";
  const style = {};
  style.background = backgroundCard;
  let undefinedCheck;
  const ModalProps = props.modal || (() => <></>);

  // handleCancel();
  // https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
  return (
    <>
      <NavLink to={"#" + props.title}>
        <div
          className="lotto-card"
          style={style}
          onClick={(event) => getBackgroundCard(event)}
        >
          {props.title}
          <Button
            className="ant-card-icon"
            type="primary"
            shape="circle"
            size={size}
          >
            <span style={{ transform: "translateY(-2px)", fontSize: "120%" }}>
              {props.count || "0"}
            </span>
          </Button>
        </div>
      </NavLink>
      <Modal
        // centered
        title={"เลขเด็ดข่าวดัง"}
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
        {typeof props.modal === typeof undefinedCheck && (
          <ViewModal data={props} listNewsData={listNewsData} />
        )}
        {props.modal !== null && <ModalProps />}
      </Modal>
    </>
  );
};

export default LottoNumItem;
