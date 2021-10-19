import { NavLink } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
library.add(fas);

const LogoIconItem = (props) => {
  let className = "logo logo-icon-item";
  if (props.className) {
    className += " " + props.className;
  }
  // console.log(props.title);
  return (
    <>
      <div className={className}>
        <div style={{ display: "inline-block" }} className="logo-item-logo">
          <NavLink to={props.link || "/"}>
            <FontAwesomeIcon
              icon={["fas", props.icon]}
              style={{
                fontSize: "26px",
                margin: 0,
                marginBottom: "-8px",
                // color: menuActive && colorIcon,
              }}
            />
          </NavLink>
        </div>
        {props.title && (
          <div style={{ display: "inline-block" }} className="logo-item-text">
            <NavLink to={props.link || "/"}>
              <h2>{props.title}</h2>
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
};

export default LogoIconItem;
