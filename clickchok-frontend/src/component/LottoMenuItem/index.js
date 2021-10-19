// import { MoreOutlined } from "@ant-design/icons";
// import { NavLink, useLocation } from "react-router-dom";
import NavMenuItem from "../NavMenuItem";
import "./index.css";

const LottoMenuItem = ({ value }) => {
  //if (value) console.log(value);
  return (
    <>
      <div className="container" style={{ position: "relative" }}>
        <nav className="jsx-2580299878 nav clearfix nav-firstpage">
          <ul className="jsx-2580299878" id="navbar">
            <li style={{ maxWidth: "50%" }}>
              <NavMenuItem
                value={{
                  menuName: "เลขเด็ดข่าวดัง",
                  menuLink: "/lotto/",
                  menuActive: true,
                  menuIndex: 0,
                }}
              />
            </li>
            <li style={{ maxWidth: "50%" }}>
              <NavMenuItem
                value={{
                  menuName: "สถิติหวยย้อนหลัง",
                  menuLink: "/lotto-stat/",
                  menuActive: false,
                  menuIndex: 1,
                }}
              />
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

// const LottoMenuItem = () => {
//   return (
//     <>
//       <div className="news-menu-item"></div>
//     </>
//   );
// };

export default LottoMenuItem;
