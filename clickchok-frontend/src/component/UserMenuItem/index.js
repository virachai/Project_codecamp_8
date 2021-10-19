import { NavLink } from "react-router-dom";
import {
  Button,
  //Modal
} from "antd";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
library.add(fas);

const UserMenuItem = (props) => {
  if (props) {
  }

  const size = "default";

  return (
    <>
      <NavLink to={props.linkTo || "#"}>
        <Button
          type="link"
          icon={
            props.menuIcon && (
              <FontAwesomeIcon
                icon={["fas", props.menuIcon]}
                style={{
                  fontSize: "28px",
                  margin: 0,
                  marginBottom: "-4px",
                  // color: menuActive && colorIcon,
                }}
              />
            )
          }
          size={size}
          style={{ height: 54, margin: 0, padding: 0 }}
        >
          <span
            style={{
              fontSize: 16,
              fontFamily: "Roboto Mono",
              fontWeight: "bold",
              // color: colorIcon,
            }}
          >
            {props.menuName}
          </span>
        </Button>
      </NavLink>
    </>
  );
};

export default UserMenuItem;
