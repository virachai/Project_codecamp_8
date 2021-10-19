// import React from "react";
//import React from "react";
import { isLoggedIn, getAccessToken, getRefreshToken } from "axios-jwt";
// import axios from "axios";
import React from "react";
import {
  Form,
  Input,
  Button,
  // notification,
  // Checkbox,
  // Modal
} from "antd";
import {
  // useLocation,
  useHistory,
  Redirect,
  // Route,
  NavLink,
} from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
// import axiosInstance, { loginFn, logoutFn } from "../../config/axios";
import { loginFn } from "../../config/axios";

// https://codeforgeek.com/refresh-token-jwt-nodejs-authentication/
// npm i express express-jwt jsonwebtoken cors

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

const LoginPage = () => {
  // const [visible, setVisible] = useState(true);

  const [form] = Form.useForm();

  let history = useHistory();

  const onFinish = (values) => {
    //console.log("Success:", values);
    // login(values);
    const userAction = loginFn(values);
    if (!userAction) return;
    form.resetFields();
    setTimeout(function () {
      history.push("/profile/");
    }, 1000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  let tempY = window.scrollY;

  const handleCancel = () => {
    //history.back(2);
    //history.push("/");
    //window.history.back();

    console.log("handleCancel");
    history.push("/");
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
    if (1) return;
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

  // const onLogout = () => {
  //   const userAction = logout();
  //   if (!userAction) return;
  //   form.resetFields();

  //   setTimeout(function () {
  //     history.push("/");
  //   }, 1000);
  // };

  if (showModal) {
  }

  //axiosInstance.get("/api/endpoint/that/requires/login").then((response) => {});
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  if (accessToken || refreshToken) {
  }

  if (isLoggedIn()) {
    return <Redirect to={"/profile/"} />;
  }

  //Fix Position Render
  document.body.style.position = "";
  document.body.style.top = "";

  return (
    <>
      <div className="login-page">
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
        <div className="ant-modal-header">
          <div className="ant-modal-title" style={{ textAlign: "center" }}>
            เข้าสู่ระบบ
          </div>
        </div>
        {/* <Modal
          // centered
          title={"เข้าสู่ระบบ"}
          visible={visible}
          // onOk={() => handleCancel()}
          onCancel={() => handleCancel()}
          width={414}
          bodyStyle={{
            // height: "calc(100vh - 120px)",
            padding: 8,
            margin: 0,
            height: "calc(100%)",
          }}
          style={{ top: 0, margin: 0 }}
          footer={[]}
          className="main-menu-modal"
        >
          
        </Modal> */}
        <div className="login-section" style={{ padding: 10, maxWidth: 414 }}>
          <div>
            <h1 style={{ fontSize: 31 }}>
              <span>Log in to ClickChok</span>
            </h1>
          </div>
          {!isLoggedIn() && (
            <Form
              {...layout}
              // layout="vertical"
              form={form}
              name="control-hooks"
              // initialValues={{ remember: true }}
              initialValues={{ email: "nilson@email.com", password: "nilson" }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="form-login-page"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              {/* <Form.Item
              name="remember"
              valuePropName="checked"
              style={{ margin: "4px 0" }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

              {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%", marginTop: 6 }}
                >
                  Submit
                </Button>
              </Form.Item>

              <Form.Item className="login-btn-option">
                <Button
                  htmlType="button"
                  onClick={onReset}
                  style={{ minWidth: "30%" }}
                >
                  Reset
                </Button>
                {/* <Button
                htmlType="button"
                onClick={handleCancel}
                style={{ marginRight: 8 }}
              >
                Back
              </Button> */}
                <NavLink to="/signup/">
                  <Button
                    type="link"
                    htmlType="button"
                    style={{ maxWidth: "fit-content" }}
                  >
                    Sign Up
                  </Button>
                </NavLink>

                <Button
                  type="link"
                  htmlType="button"
                  style={{ maxWidth: "fit-content" }}
                >
                  Forgot password
                </Button>

                {/* <Button
                type="link"
                htmlType="button"
                style={{ maxWidth: "fit-content" }}
                onClick={() => logout()}
              >
                Forgot password Cls
              </Button> */}
              </Form.Item>
            </Form>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
