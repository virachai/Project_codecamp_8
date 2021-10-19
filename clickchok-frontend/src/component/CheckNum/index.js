import { NavLink } from "react-router-dom";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
library.add(fas);

const CheckNumBar = (props) => {
  // console.log(props.title);
  return (
    <>
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
          <NavLink to="/number-checker/">
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
          </NavLink>
        </div>
      </div>
    </>
  );
};

// const SearchCarNum = ({ value }) => {
//   return (
//     <div>
//       <div
//         style={{
//           height: 60,
//           maxHeight: 60,
//           backgroundColor: "#E1E8ED",
//           width: "100%",
//           textAlign: "center",
//           display: "flex",
//           flexWrap: "nowrap",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         {/* <CarFilled style={{ fontSize: "40px", color: "#00bcd4", margin: 10 }} /> */}
//         {/* <i class="fas fa-motorcycle"></i> */}
//         {/* <div>
//           <FontAwesomeIcon
//             icon={["fas", "motorcycle"]}
//             style={{ fontSize: "40px", color: "#00bcd4", margin: 10 }}
//           />
//         </div> */}

//         <div>
//           <FontAwesomeIcon
//             icon={["fas", "car"]}
//             style={{ fontSize: "40px", color: "#00bcd4", margin: 5 }}
//           />
//         </div>

//         <div style={{ minWidth: "calc(100% - 90px)", margin: 5 }}>
//           <Button
//             icon={<SearchOutlined />}
//             style={{
//               minWidth: "calc(100%)",
//               borderRadius: 11,
//               color: "#757575",
//               fontFamily: "Source Sans Pro",
//             }}
//           >
//             รถคุณให้โชค? ตรวจเลขทะเบียนกัน
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

export default CheckNumBar;
