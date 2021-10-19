import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

import { NavLink } from "react-router-dom";
import "./index.css";

library.add(fas);
const imgFeature =
  "https://s.isanook.com/ho/0/rp/r/w728/ya0xa0m1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL2hvLzAvdWQvNDEvMjA4MzY1L2hvcm82LjIuanBn.jpg";

const contentStyle = {
  // height: "100%",
  // maxHeight: "320px",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  width: "100%",
};

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

  return `${day} ${monthThai} ${year} (${hour}:${minute})`;
};

const NewsBlogSide = (props) => {
if(!props) return <></>;
if(!props.data) return <></>;
if(!props.data.id) return <></>;

  const { newsName, id, tbNewsGroup, updatedAt, imageURL } = props.data;
  //console.log(value);
  // const newsOrder = value.substr(0, 1);
  return (
    <div style={{ width: "100%" }}>
      <article className="PostStandard highlight" style={contentStyle}>
        <div
          className="gb-post-standard-thumbnail thumbnail highlight"
          style={{ maxWidth: "calc(100% - 200px)", paddingRight: 8 }}
        >
          <NavLink title="title" to={"/news/" + id}>
            <div className="thumbnailImg crop">
              <img src={imageURL || imgFeature} alt="Name" />
            </div>
          </NavLink>
        </div>
        <div
          className="desc"
          style={{
            width: "100%",
            // maxWidth: "calc(100% - 210px)",
            minWidth: 192,
            fontFamily: "Source Sans Pro",
            fontSize: 16,
            height: 140,
            minHeight: 140,
            position: "relative",
          }}
        >
          <div
            className="item-news-cat"
            style={{
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            <NavLink to={"/news/" + tbNewsGroup["groupCode"]}>
              #{tbNewsGroup["groupName"]}
            </NavLink>
          </div>
          <div
            className="item-news-title"
            style={{ overflow: "hidden", maxHeight: 81, position: "relative" }}
          >
            <NavLink to={"/news/" + id}>
              <p style={{ margin: "3px 0 0 0" }}>{newsName}</p>
            </NavLink>
            {/* <div className="txt-more"></div> */}
          </div>
          <div
            className="item-news-date"
            style={{
              textAlign: "right",
              fontWeight: "bold",
              fontSize: 14,
              position: "absolute",
              bottom: 6,
              right: 10,
              opacity: 0.8,
            }}
          >
            <FontAwesomeIcon
              icon={["fas", "clock"]}
              style={{ margin: 0, color: "#2196f3" }}
            />
            <span style={{ marginLeft: 6 }}>{formatDate(updatedAt)}</span>
          </div>
        </div>
        {/* <div className="desc">
          <div className="PostBody highlight" style={{ padding: "4px 8px" }}>
            <h3
              className="postTitle gb-post-standard-title"
              style={{ contentStyle }}
            >
              <NavLink
                title="title"
                to="/news/1000001/"
                style={{
                  color: "#212121",
                  fontFamily: "kanit",
                  fontSize: 20,
                }}
              >
                {newsOrder} คอหวยโล่งอก! กองสลากฯ ยืนยัน งวดวันที่ 30 ธันวาคม
                ไม่เลื่อนออกรางวัล
              </NavLink>
            </h3>
          </div>
        </div> */}
      </article>
    </div>
  );
};

export default NewsBlogSide;
