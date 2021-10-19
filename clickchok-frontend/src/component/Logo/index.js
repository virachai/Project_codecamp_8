import { NavLink } from "react-router-dom";
import logoImage from "./logo-Item-v1.png";
import "./index.css";

const LogoItem = (props) => {
  return (
    <>
      <div className="logo logo-item">
        <NavLink to={props.link || "/"}>
          <img src={logoImage} alt="Logo Item" />
        </NavLink>
      </div>
    </>
  );
};

export default LogoItem;
