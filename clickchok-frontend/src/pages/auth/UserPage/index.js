// import React from "react";
//import React from "react";
import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  // Checkbox,
  // Modal
} from "antd";
import {
  // useLocation,
  // useHistory,
  NavLink,
} from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

library.add(fas);
// const layout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 16 },
// };
const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

// const tailLayout = {
//   wrapperCol: { offset: 8, span: 16 },
// };

const UserPage = () => {
  // const [visible, setVisible] = useState(true);

  const [form] = Form.useForm();

  // let history = useHistory();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  let tempY = window.scrollY;

  const handleCancel = () => {
    //history.back(2);
    //history.push("/");
    window.history.back();

    console.log("handleCancel");
    return;
    // const scrollY = document.body.style.top;
    // document.body.style.position = "";
    // document.body.style.top = "";
    // window.scrollTo(0, parseInt(scrollY || "0") * -1);
    // document.body.style.width = "100%";
    // setVisible(false);
    //console.log(pathname);

    // history.push(pathname);
    // <Redirect to={"/news/"} />;
    //window.history.back();
    //window.location
  };

  const showModal = () => {
    //console.log(tempY);
    //tempY = window.scrollY;
    //console.log(tempY);
    document.body.style.position = "fixed";
    document.body.style.top = `-${tempY}px`;

    //setVisible(true);
    setTimeout(function () {
      document.body.style.width = "100%";
    }, 500);

    document.body.style.top = `-${tempY}px`;
  };

  // if (visible) {
  //   showModal();
  // }

  const onReset = () => {
    form.resetFields();
  };

  if (showModal || useState) {
  }

  return (
    <>
      <div className="login-page">
        <button
          type="button"
          aria-label="Close"
          class="ant-modal-close"
          style={{ right: "unset", left: 0 }}
          onClick={() => handleCancel()}
        >
          <span class="ant-modal-close-x">
            <span
              role="img"
              aria-label="close"
              class="anticon anticon-close ant-modal-close-icon"
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
        <div class="ant-modal-header">
          <div class="ant-modal-title" style={{ textAlign: "center" }}>
            โปรไฟล์
          </div>
        </div>

        <div className="user-section" style={{ padding: 10, maxWidth: 414 }}>
          User Page
        </div>
      </div>
    </>
  );
};

export default UserPage;
