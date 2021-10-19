import { MoreOutlined } from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";
import "./index.css";
import axiosInstance from "../../config/axios";
import React, { useState, useEffect } from "react";

const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};
// usage example:
// var a = ["a", 1, "a", 2, "1"];
// var unique = a.filter(onlyUnique);

const NavFirstPageLinkItem = ({ value }) => {
  //if (value) console.log(value);
  const {
    menuName = "Menu",
    menuLink = "#blank",
    menuActive = false,
    menuIndex = 0,
  } = value;
  let classLink = "news-menu-link";

  const location = useLocation();
  const { pathname } = location;
  // console.log(pathname, menuLink);
  // console.log("menuLink", menuLink.substr(0, menuLink.length - 1));
  let linkSelect = pathname === menuLink || pathname + "/" === menuLink;
  if (!linkSelect && menuLink === "/news/") {
    linkSelect = pathname === "/";
  }

  //const isActive = menuActive ? "is-active" : "not-active";
  if (menuActive || 0) {
  }
  classLink += linkSelect ? " is-active" : " not-active";

  return (
    <>
      <NavLink to={menuLink} className={classLink} name={menuIndex}>
        <span>{menuName}</span>
      </NavLink>
    </>
  );
};
// NavFirstPage
const NewsMenuItem = (props) => {
  if (props) {
  }

  const [groupData, setGroupData] = useState([]);

  useEffect(() => {
    const fetchNewsList = async () => {
      axiosInstance.get("/api/news-data").then(
        (response) => {
          const data = [...response.data];

          const groupName = data
            .filter((itm) => itm.tbNewsGroup.id !== 2)
            .map((itm) => itm.tbNewsGroup);
          console.log("Name", groupName);

          const groupCode = data
            .filter((itm) => itm.tbNewsGroup.id !== 2)
            .map((itm) => itm.tbNewsGroup.groupCode);

          const countCode = groupCode.map((item, index, arr) => {
            return {
              code: item,
              count: [...arr.filter((codeCheck) => codeCheck === item)].length,
              oldIndex: index,
              name: groupName.find((elm) => elm.groupCode === item)[
                "groupName"
              ],
            };
          });
          const groupSort = groupCode
            .filter(onlyUnique)
            .map((itm) => {
              return countCode.find((element) => element.code === itm);
            })
            .sort((a, b) => Number(b.count) - Number(a.count))
            .filter((itm, index) => index < 2 && itm);
          // console.log("countCode", countCode);
          // console.log("groupCode", groupCode);
          // console.log("Sort", groupSort);
          setGroupData(groupSort);
          // const groupCode = data.map((itm) => itm.tbNewsGroup.groupCode);
          // setNewsData(newsId[0]);
          // console.log("news data", newsId[0]);
        },
        (err) => {
          console.log("api fail", err);
        }
      );
    };
    fetchNewsList();
  }, []);
  //if (value) console.log(value);

  const listGroupMenu = groupData.map((itm, index) => {
    const gCode = "/news/" + itm.code;
    const gName = itm.name;
    return (
      <li key={index}>
        <NavFirstPageLinkItem
          value={{
            menuName: gName,
            menuLink: gCode,
            menuActive: false,
            menuIndex: index,
          }}
        />
      </li>
    );
  });
  return (
    <>
      <div className="container" style={{ position: "relative" }}>
        <nav className="nav clearfix nav-firstpage">
          <ul className="jsx-0" id="navbar" style={{}}>
            <li>
              <NavFirstPageLinkItem
                value={{
                  menuName: "ข่าวเด่น",
                  menuLink: "/news/",
                  menuActive: true,
                  menuIndex: 0,
                }}
              />
            </li>
            {listGroupMenu}
            {/* <li>
              <NavFirstPageLinkItem
                value={{
                  menuName: "รถกู้ภัย",
                  menuLink: "/news/ab",
                  menuActive: false,
                  menuIndex: 2,
                }}
              />
            </li> */}
            <li
              style={{
                position: "absolute",
                right: 0,
                maxWidth: 35,
              }}
            >
              <a href="#post">
                <span>
                  <MoreOutlined
                    rotate={90}
                    style={{ color: "#212121", fontSize: "28px" }}
                  />
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

// const NewsMenuItem = () => {
//   return (
//     <>
//       <div className="news-menu-item"></div>
//     </>
//   );
// };

export default NewsMenuItem;
