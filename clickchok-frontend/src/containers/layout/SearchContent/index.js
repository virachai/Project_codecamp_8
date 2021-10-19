// Page Switch Content
import React, { useState, useEffect } from "react";
import axiosInstance from "../../../config/axios";
import { Layout, Row, Col, Button, Input, Form, notification } from "antd";
import {
  // CarFilled,
  SyncOutlined,
  FacebookFilled,
  TwitterSquareFilled,
  // PlusSquareOutlined,
  RightSquareOutlined,
  SearchOutlined,
} from "@ant-design/icons";
// import { createFromIconfontCN } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import LottoBlog from "../../../component/LottoBlog";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

import "./index.css";
library.add(fas);
library.add(far);

notification.config({
  placement: "topLeft",
  top: 60,
  duration: 2,
});

// String.prototype.replaceBetween = function(start, end, what) {
//   return this.substring(0, start) + what + this.substring(end);
// };

// console.log("The Hello World Code!".replaceBetween(4, 9, "Hi"));

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
        // if (swapDigi.length === 3) newDigi.push({ title: swapDigi, count: 1 });
      }
    }
  });
  return newDigi;
};

const openNotificationIcon = (type, msg, desc) => {
  notification[type]({
    message: msg,
    description: desc,
  });
};

const SearchResult = ({ found = false }) => {
  const textFound = !found
    ? "เสียใจด้วย คุณไม่เคยถูกรางวัล"
    : "ยินดีด้วย คุณเคยถูกรางวัล";
  const iconFound = !found ? "frown" : "smile";
  return (
    <>
      <div
        className="number-search-result"
        style={{ justifyContent: "center" }}
      >
        <div style={{ marginRight: 3 }}>
          <FontAwesomeIcon
            icon={["fas", iconFound]}
            style={{
              fontSize: "22px",
              padding: 0,
              color: "var(--neutral100Color)",
            }}
          />
        </div>
        <div style={{ marginLeft: 3 }}>
          <h3
            style={{
              margin: 0,
              padding: 0,
              paddingTop: 2,
              color: "var(--neutral100Color)",
            }}
          >
            {textFound}
          </h3>
        </div>
      </div>
    </>
  );
};

function SearchTab(props) {
  const [form] = Form.useForm();
  const [carNumber, setCarNumber] = useState("");

  const onFinish = (values) => {
    console.log("onFinish", values);
    const car = values["carNumberItem"];
    if (!car) {
      openNotificationIcon("warning", "โปรดใส่ข้อมูล", "กรุณาลองใหม่");
      props.setCarNumFind("");
      return;
    }
    const theNum = car.replace(/^\D+/g, "");
    if (theNum.length < 3) {
      openNotificationIcon("warning", "ข้อมูลตัวเลขไม่เพียงพอ", "กรุณาลองใหม่");
      props.setCarNumFind("");
      return;
    }
    props.setCarNumFind(car);
    form.resetFields();
    setCarNumber("");
    //event.preventDefault();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="search-tab">
        <div className="number-checker-section">
          <div>
            <FontAwesomeIcon
              icon={["fas", "motorcycle"]}
              style={{ fontSize: "34px", margin: 5 }}
            />
          </div>

          <div>
            <h3>{props.number ? props.number : "รถของคุณเคยให้โชคไหม?"}</h3>
          </div>
          <div>
            <FontAwesomeIcon
              icon={["fas", "car"]}
              style={{ fontSize: "34px", margin: 5 }}
            />
          </div>
        </div>
        <div className="search-bar-section" style={{ padding: 4 }}>
          {props.result !== null && <SearchResult found={props.result} />}

          {props.result === null && (
            <div>
              <Form
                form={form}
                layout="inline"
                name="control-hooks"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{ position: "relative" }}
                initialValues={{ btFind: true, carNumberItem: "" }}
              >
                <Form.Item
                  name="carNumberItem"
                  value={carNumber}
                  onChange={(elm) => setCarNumber(elm)}
                  style={{
                    width: "calc(100%)",
                    maxWidth: "calc(100% - 100px)",
                    borderRadius: 0,
                    color: "#757575",
                    fontFamily: "Source Sans Pro",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {/* <Input /> */}
                  {true && (
                    <Input
                      placeholder={"เลขทะเบียนรถ"}
                      // prefix={<CarFilled className="site-form-item-icon" />}
                      type="text"
                      maxLength="16"
                    />
                  )}
                </Form.Item>

                <Form.Item
                  style={{
                    padding: 0,
                    margin: 0,
                    marginLeft: "-39px",
                    width: "100%",
                    maxWidth: 39,
                  }}
                >
                  {carNumber !== "" && (
                    <Button
                      style={{
                        margin: 0,
                        border: 0,
                        backgroundColor: "transparent",
                      }}
                      onClick={() => {
                        form.resetFields();
                        setCarNumber("");
                      }}
                    >
                      X
                    </Button>
                  )}
                </Form.Item>

                <Form.Item
                  name="btFind"
                  rules={[{ required: false }]}
                  style={{
                    width: "100px",
                    fontWeight: "bold",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  <Button
                    style={{
                      width: "100px",
                      fontWeight: "bold",
                    }}
                    icon={<SearchOutlined />}
                    type="primary"
                    htmlType="submit"
                  >
                    ค้นหา
                  </Button>
                </Form.Item>
              </Form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function ResultSection(props) {
  const testLayout = (e) => {
    const divIcon = e.target.closest(".result-section-center");
    if (!divIcon) return;
    divIcon.classList.toggle("not-found");
    //console.log(e.target.closest(".result-section-center"));
  };
  let classNameSection = "result-section-center";
  if (!props.isFound) {
    classNameSection += " not-found";
  }

  return (
    <>
      <div className="result-section" style={{ padding: 8 }}>
        <Row>
          <Col span={8} style={{ textAlign: "left" }}>
            <div>
              <NavLink
                to="/number-checker/"
                onClick={() => props.setCarNumFind("")}
              >
                <Button type="primary" size="small" icon={<SyncOutlined />}>
                  ตรวจใหม่
                </Button>
              </NavLink>
            </div>
          </Col>
          <Col
            span={8}
            style={{ textAlign: "center" }}
            className={classNameSection}
            onClick={testLayout}
          >
            <div style={{ maxHeight: 50 }} className="icon-crown">
              <div>
                <FontAwesomeIcon
                  icon={["fas", "crown"]}
                  style={{
                    fontSize: "60px",
                    margin: 0,
                  }}
                />
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ height: "auto" }} className="car-shape-icon">
                <FontAwesomeIcon
                  icon={["fas", "car"]}
                  style={{
                    fontSize: "128px",
                    margin: 0,
                  }}
                />
              </div>

              <div className="rect-shape-icon">
                <div>
                  <FontAwesomeIcon
                    icon={["far", "circle"]}
                    style={{
                      fontSize: "60px",
                      margin: 0,
                      padding: 0,
                      color: "white",
                    }}
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col span={8} style={{ textAlign: "right" }}>
            <div className="icons-list">
              <TwitterSquareFilled
                style={{
                  fontSize: "24px",
                  padding: 0,
                  margin: 0,
                  marginLeft: 8,
                }}
              />

              <FacebookFilled
                style={{
                  fontSize: "24px",
                  padding: 0,
                  margin: 0,
                  marginLeft: 8,
                }}
              />

              <RightSquareOutlined
                style={{
                  fontSize: "24px",
                  padding: 0,
                  margin: 0,
                  marginLeft: 8,
                }}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <LottoBlog
              title={"II รางวัลเลขสองตัว"}
              data={props.data2digi}
              link={null}
              loading={1}
              limit={3}
              modal={null}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <LottoBlog
              title={"III รางวัลเลขสามตัว"}
              data={props.data3digi}
              link={null}
              loading={1}
              limit={3}
              modal={null}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}

function HistorySection(props) {
  return (
    <>
      <div className="history-search">
        <div
          className="history-search-bar"
          style={{
            padding: "4px 8px",
            backgroundColor: "var(--neutral300Color)",
          }}
        >
          <div
            style={{
              width: "calc(100% - 30px)",
              fontFamily: "Source Sans Pro",
              fontWeight: "bold",
            }}
          >
            ประวัติการค้นหาล่าสุด
          </div>
          <div style={{ width: "calc(30px)" }}>
            <NavLink to="#clear" style={{ fontFamily: "Source Sans Pro" }}>
              ล้าง
            </NavLink>
          </div>
        </div>
        <div className="history-search-list">
          <HistoryLine checked={true} exam={true} />
          <HistoryLine number={"สส999"} />
          <HistoryLine number={"รถ2021"} />
        </div>
      </div>
    </>
  );
}

function HistoryLine(props) {
  return (
    <>
      <div
        className="history-line-item"
        style={{
          borderBottom: "1px solid var(--neutral300Color)",
          padding: 4,
          marginRight: 0,
        }}
      >
        <div
          style={{
            justifyContent: "start",
          }}
        >
          <span>
            <FontAwesomeIcon
              icon={["fas", "search"]}
              style={{
                fontSize: "16px",
                marginLeft: 10,
                marginRight: 0,
                opacity: 0.5,
              }}
            />
          </span>
          <span
            style={{
              opacity: 0.95,
              padding: 8,
              fontFamily: "Source Sans Pro",
              marginBottom: "2px",
            }}
          >
            {props.number || "1กฮ2345"}
          </span>
          {props.checked && (
            <span>
              <FontAwesomeIcon
                icon={["fas", "check"]}
                style={{
                  fontSize: "16px",
                  marginLeft: 10,
                  marginRight: 0,
                  opacity: 1,
                  color: "green",
                }}
              />
            </span>
          )}
        </div>
        {props.exam && (
          <div>
            <span style={{ marginRight: 8, opacity: 0.5, fontSize: "90%" }}>
              (ตัวอย่าง)
            </span>
          </div>
        )}
      </div>
    </>
  );
}

function SearchContent() {
  const [carNum, setCarNum] = useState("");
  const [lottoData, setLottoData] = useState([]);

  const setCarNumFind = (num) => {
    // console.log(num);
    setCarNum(num);
  };

  const countLotto = (arr) => {
    if (!arr) return [];

    return arr
      .map((itm) => {
        // console.log("data2digi", typeof itm.title);
        return {
          title: itm.title,
          count: [...lottoData].filter(
            (data) =>
              String(data.drawNumber) === String(itm.title) && data.drawType > 1
          ).length,
        };
      })
      .sort((a, b) => b.count - a.count);
  };

  let data2digi = [];
  let data3digi = [];

  // const resultFind = !carNum ? null : carNum === "1กฮ2345";
  if (carNum !== null) {
    data2digi = countLotto([...getNumDigi(carNum, 2)]);
    data3digi = countLotto([...getNumDigi(carNum, 3)]);

    console.log(data2digi);
  }

  const checkNumFound = (arr) => {
    if (!arr) return false;

    return [...arr].some((itm) => itm.count > 0);
  };

  const resultFind = !carNum
    ? null
    : checkNumFound([...data2digi, ...data3digi]);

  useEffect(() => {
    const fetchList = async () => {
      axiosInstance.get("/api/get/lotto").then(
        (response) => {
          // console.log("api response", response.data);
          setLottoData(response.data);
        },
        (err) => {
          console.log("api fail", err);
        }
      );
    };
    fetchList();
  }, []);
  return (
    <>
      <Layout id="search-page-layout">
        <Row>
          <Col span={24} className="hero-section hero-section-grad">
            {/* <SearchTab number={"สส999"} /> */}
            <SearchTab
              number={carNum}
              result={resultFind}
              setCarNumFind={setCarNumFind}
            />
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            {!carNum && <HistorySection />}
            {carNum && (
              <ResultSection
                setCarNumFind={setCarNumFind}
                isFound={resultFind}
                data2digi={data2digi}
                data3digi={data3digi}
              />
            )}
          </Col>
        </Row>
      </Layout>
    </>
  );
}

export default SearchContent;
