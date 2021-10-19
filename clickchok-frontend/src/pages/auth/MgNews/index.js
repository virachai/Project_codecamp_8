// import React from "react";
//import React from "react";
import jwt_decode from "jwt-decode";
import { NavLink } from "react-router-dom";
// import axios from "axios";
import {
  isLoggedIn,
  // applyAuthTokenInterceptor,
  // refreshTokenIfNeeded,
  // getAccessToken,
  getRefreshToken,
} from "axios-jwt";
// import React from "react";
import React, { useState, useEffect } from "react";
import axiosInstance, { BASE_URL } from "../../../config/axios";
import {
  Button,
  notification,
  List,
  // Typography,
  Checkbox,
  Modal,
} from "antd";

import {
  // useLocation,
  useHistory,
  Redirect,
  useLocation,
  // Route,
  //NavLink,
} from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import UserMenuItem from "../../../component/UserMenuItem";
import {
  ClockCircleOutlined,
  EditFilled,
  DeleteFilled,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import "./index.css";
// import axiosInstance from "../../../config/axios";

library.add(fas);
const { confirm } = Modal;

// https://medium.com/swlh/0-aca5522c14c8
// isTokenExpired(accessToken)
// http://192.168.43.129:8000/uploads/news/1627213887882_b9b57aa6-fb1b-4a3a-9ec9-7a663328334d.jpg
// let selectItem = [];
const imgLink =
  "http://192.168.43.129:8000/uploads/news/1627213887882_b9b57aa6-fb1b-4a3a-9ec9-7a663328334d.jpg";

// function delay(t, val) {
//   return new Promise(function (resolve) {
//     setTimeout(function () {
//       resolve(val);
//     }, t);
//   });
// }

// function timeout(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }
// async function sleep(fn, ...args) {
//   await timeout(3000);
//   return fn(...args);
// }

// while (goOn) {
//   // other code
//   var [parents] = await Promise.all([
//       listFiles(nextPageToken).then(requestParents),
//       timeout(5000)
//   ]);
//   // other code
// }

// async function main() {
//   await taskOne();
//   await taskTwo();
//   await taskThree();
//   await taskFour();
//   await taskFive();
//   await taskSix();
//   await taskSeven();
//   await taskEight();
//   await taskNine();
//   await taskTen();
// }
// main();

// function taskOne() {
//   setTimeout(function () {
//     console.log("this is task 1");
//   }, 500);
// }
// function taskTwo() {
//   console.log("this is task 2");
// }

const fetchNewsList = async (setNewsListData) => {
  console.log("fetchNewsList");
  axiosInstance.get("/backend/news-data").then(
    (response) => {
      console.log("get OK", response.data);
      setNewsListData(
        [...response.data]
          .reverse()
          .map((itm) => (itm = { ...itm, onSelected: false }))
      );
      if (Array.isArray(response.data))
        document.querySelector("#news-count").innerHTML = response.data.length;
      // console.log(setLen);
    },
    (err) => {
      console.log(err);
    }
  );
};

const reloadData = async (setNewsListData, newsListData = []) => {
  const tmp = [...newsListData];
  const clearData = (setNewsListData) => {
    setTimeout(function () {
      setNewsListData([]);
    }, 100);
  };
  const fetchData = (setNewsListData, tmp) => {
    setTimeout(function () {
      if (tmp.length > 0) setNewsListData(tmp);
      else fetchNewsList(setNewsListData);
    }, 100);
  };

  await clearData(setNewsListData);
  await fetchData(setNewsListData, tmp);
};

const NewsItem = (props) => {
  if (props && BASE_URL) {
  }

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
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
    // console.log(path2Url(pathImg));
    // return [
    //   {
    //     uid: "-1",
    //     name: pathImg.split("\\")[pathImg.split("\\").length - 1],
    //     status: "done",
    //     url: path2Url(pathImg),
    //   },
    // ];
  };

  const { newsName, id, updatedAt, tbNewsGroup, newsImagePath, onSelected } =
    props.itemValue;

  // console.log("onSelected", onSelected, props.itemValue);
  // const [delNewsId, setDelNewsId] = useState(false);
  // console.log(id, "Line111", props.delItem);
  // console.log(getImageData(newsImagePath), newsImagePath);
  // const groupName = tbNewsGroup.find((itm) => itm.id === id);
  // console.log("tbNewsGroup", tbNewsGroup.groupName);

  return (
    <>
      <div
        className="news-item"
        style={{ fontFamily: "Source Sans Pro", fontSize: 16 }}
      >
        <div className="image-preview">
          <img
            src={getImageData(newsImagePath) || imgLink}
            alt={"Image " + id}
            style={{ height: 100 }}
          />
        </div>
        <div className="news-preview">
          <div style={{ position: "relative", height: 28 }}>
            <div className="news-checkbox" style={{ fontStyle: "italic" }}>
              <Checkbox
                defaultChecked={onSelected}
                onChange={() => {
                  props.onDeleteNews([id]);
                  // console.log("onSelected", onSelected, id);
                }}
              >
                {tbNewsGroup.groupName} {onSelected}
              </Checkbox>
            </div>

            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                marginTop: "-4px",
              }}
            >
              <Button
                onClick={() => props.onDeleteNews(id)}
                style={{ marginRight: 6 }}
                type="text"
                icon={
                  <DeleteFilled style={{ color: "var(--accentRedColor)" }} />
                }
              />
              <ClockCircleOutlined style={{ fontSize: 14, marginRight: 6 }} />
              {formatDate(updatedAt)}
              <NavLink to={"/mg-news-form/" + id || "#"}>
                <Button
                  style={{ margin: 0 }}
                  type="text"
                  icon={
                    <EditFilled style={{ color: "var(--primary300Color)" }} />
                  }
                />
              </NavLink>
            </div>
          </div>
          <div className="news-title">
            <NavLink to={"/mg-news-form/" + id || "#"}>
              [{id}] {newsName}
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

const UserMenuSection = (props) => {
  if (props) {
  }

  return (
    <>
      <div className="user-menu-section">
        <UserMenuItem
          menuName={"เพิ่ม"}
          menuIcon={"plus-square"}
          linkTo={"/mg-news-form/"}
        />
        <UserMenuItem
          menuName={"ลบ"}
          menuIcon={"minus-square"}
          linkTo={"#remove"}
        />
        <UserMenuItem
          menuName={"ค้นหา"}
          menuIcon={"search"}
          linkTo={"#search"}
        />
        <UserMenuItem
          menuName={"จัดกลุ่ม"}
          menuIcon={"border-all"}
          linkTo={"/mg-newsgroup/"}
        />
        <UserMenuItem
          menuName={"อื่นๆ"}
          menuIcon={"ellipsis-v"}
          linkTo={"#other"}
        />
      </div>
    </>
  );
};

const NewsListSection = (props) => {
  if (props) {
  }

  // const [newsListData, setNewsListData] = useState([]);
  const { newsListData, setNewsListData } = props;

  useEffect(() => {
    fetchNewsList(setNewsListData);
  }, [setNewsListData]);

  // const [delItem, setDelItem] = useState([]);

  return (
    <>
      <List
        style={{ marginLeft: 12 }}
        size="large"
        dataSource={newsListData}
        renderItem={(item) => (
          <List.Item
            style={{
              padding: "9px 0",
              height: 110,
              maxHeight: 110,
              // borderBottom: "1px solid #e0e0e0",
            }}
          >
            <NewsItem itemValue={item} onDeleteNews={props.onDeleteNews} />
          </List.Item>
        )}
      />
    </>
  );
};

const ViewNewsConfirm = ({ values }) => {
  console.log(values);
  // const listItems = values.map((item, index) => (
  //   <span key={index}>{item}, </span>
  // ));
  const listItems = values.join(", ");
  return (
    <>
      <p>Click to Delete News!</p>
      <div>
        <strong>News Id:</strong> {listItems}
      </div>
    </>
  );
};

const MgNewsPage = () => {
  let history = useHistory();

  const location = useLocation();
  // const { pathname } = location;
  const hashData = location.hash;

  const [newsListData, setNewsListData] = useState([]);
  // const [deleteItem, setDeleteItem] = useState([]);

  const handleCancel = () => {
    history.push("/profile/");
  };

  document.body.style.position = "";
  document.body.style.top = "";

  const refresh = getRefreshToken();
  const decoded = jwt_decode(refresh);
  const memberData = decoded
    ? decoded.memberData
    : { username: null, firstName: null, lastName: null };

  // console.log(memberData);
  if (!isLoggedIn()) {
    return <Redirect to={"/"} />;
  }

  const onDeleteNewsData = (data) => {
    if (data.length < 0) return;
    console.log(data.length, data);

    //.patch("/backend/news", { item: data })
    if (data.length === 1) {
      axiosInstance
        .delete("/backend/news/" + data[0])
        .then((response) => {
          if (!response) return;
          // console.log(response.data);
          // setDeleteItem([]);
          notification.success({
            message: "You have been deleted item",
            description: `Item: ${data.length} rows`,
          });
          return true;
        })
        .catch((err) => {
          console.log("err: ", err);
          notification.error({
            message: "Delete Failed !",
          });
          return;
        });
      return;
    }

    axiosInstance
      .patch("/backend/news", { item: data })
      .then((response) => {
        if (!response) return;
        // console.log(response.data);
        // setDeleteItem([]);
        notification.success({
          message: "You have been deleted item",
          description: `Item: ${data.length} rows`,
        });
        // notification.info({
        //   message: `Process Success.`,
        // });
        return true;
      })
      .catch((err) => {
        console.log("err: ", err);
        notification.error({
          message: "Delete Failed !",
        });
        return;
      });
  };

  //var unique = a.filter(onlyUnique);
  const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  const onDeleteNews = (item) => {
    const itmArray = [...newsListData]
      .filter((itm) => itm.onSelected)
      .map((itm) => itm.id);

    console.log(item, itmArray.length, !Number.isInteger(item));
    // if (item) return;
    // if (!deleteItem && item === null) return;
    // console.log("deleteItem", deleteItem, item.length);
    if (Array.isArray(item) && item.length > 0) {
      // console.log("deleteItem", [...deleteItem].includes(item[0]));
      // console.log(typeof item, item);
      const tmp = [...newsListData].filter(onlyUnique).map(
        (itm) =>
          (itm = {
            ...itm,
            onSelected:
              Number(itm.id) === Number(item[0])
                ? !itm.onSelected
                : itm.onSelected,
          })
      );

      setNewsListData([]);
      setNewsListData([...tmp]);
      return;
    }
    // if (item) return;

    if (!Array.isArray(item) && Number.isInteger(item)) {
      // a.filter(onlyUnique)
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: <ViewNewsConfirm values={[item]} />,
        onOk() {
          onDeleteNewsData([item]);
          reloadData(setNewsListData, []);
        },
        onCancel() {
          reloadData(setNewsListData, newsListData);
        },
      });
      return;
    }
    if (itmArray.length === 0) {
      reloadData(setNewsListData, newsListData);
      return;
    }

    if (Array.isArray(item) && !Number.isInteger(item) && item.length === 0) {
      console.log("#newsListData457", itmArray);

      confirm({
        icon: <ExclamationCircleOutlined />,
        content: <ViewNewsConfirm values={itmArray} />,
        onOk() {
          onDeleteNewsData(itmArray);
          reloadData(setNewsListData, []);
        },
        onCancel() {
          reloadData(setNewsListData, newsListData);
        },
      });
      return;
    }
  };

  if (hashData === "#remove") {
    setTimeout(function () {
      onDeleteNews([]);
      history.push("/mg-news/");
      // undo delete = http://192.168.43.129:8000/api/reset/news
      // reloadData(setNewsListData);
      //console.log("#remove", newsListData);
      //reloadData(setNewsListData, newsListData);
    }, 100);
  }

  return (
    <>
      <div className="mg-news-page">
        <div className="ant-modal-header" style={{ position: "relative" }}>
          <button
            type="button"
            aria-label="Close"
            className="ant-modal-close"
            style={{ right: "unset", left: 0 }}
            onClick={() => handleCancel()}
          >
            <span className="ant-modal-close-x">
              <span
                role="img"
                aria-label="close"
                className="anticon anticon-close ant-modal-close-icon"
              >
                <FontAwesomeIcon
                  icon={["fas", "arrow-left"]}
                  style={{
                    opacity: 0.8,
                  }}
                />
              </span>
            </span>
          </button>
          <div className="ant-modal-title" style={{ textAlign: "center" }}>
            จัดการข่าวหวย
          </div>
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              height: 56,
            }}
          >
            <NavLink to={"/profile/" || "#"}>
              <Button
                type="text"
                style={{
                  borderRadius: 20,
                  margin: "8px 0",
                  height: 40,
                  padding: "10px 11px",
                }}
              >
                <FontAwesomeIcon
                  icon={["fas", "user"]}
                  style={{
                    opacity: 0.8,
                    fontSize: 18,
                  }}
                />
              </Button>
            </NavLink>
          </div>
        </div>

        <div
          className="profile-section-mini"
          style={{ padding: 0, maxWidth: 414, textAlign: "center" }}
        >
          <div className="avatar-section" style={{ padding: 15 }}>
            <div style={{ width: 60 }}>
              <Button
                type="ghost"
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: "white",
                }}
              >
                <FontAwesomeIcon
                  icon={["fas", "user"]}
                  style={{ fontSize: 32, color: "var(--neutral500Color)" }}
                />
              </Button>
            </div>
            <div
              style={{
                width: "calc(100% - 120px)",
                padding: "4px 16px",
                textAlign: "left",
              }}
            >
              <div>{memberData.username}</div>
              <div>
                {memberData.firstName} {memberData.lastName}
              </div>
            </div>

            <div style={{ width: 60 }}>
              <h4
                id="news-count"
                style={{
                  padding: 0,
                  margin: 0,
                  paddingTop: 4,
                  marginBottom: "-4px",
                }}
              >
                0
              </h4>
              <span style={{ color: "gray" }}>News</span>
            </div>
          </div>

          <div className="profile-section-border user-menu-area">
            <UserMenuSection />
          </div>
          <div style={{ textAlign: "left" }}>
            <NewsListSection
              onDeleteNews={onDeleteNews}
              newsListData={newsListData}
              setNewsListData={setNewsListData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MgNewsPage;
