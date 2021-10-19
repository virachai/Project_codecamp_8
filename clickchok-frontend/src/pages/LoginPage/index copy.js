// import React from "react";
//import React from "react";
import {
  isLoggedIn,
  setAuthTokens,
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
  applyAuthTokenInterceptor,
} from "axios-jwt";
import axios from "axios";
import React from "react";
import {
  Form,
  Input,
  Button,
  notification,
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

// https://codeforgeek.com/refresh-token-jwt-nodejs-authentication/
// npm i express express-jwt jsonwebtoken cors

library.add(fas);
// const layout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 16 },
// };

const API_URL = "http://172.26.0.1:8000";
const BASE_URL = API_URL;

// 1. Create an axios instance that you wish to apply the interceptor to
const axiosInstance = axios.create({ baseURL: BASE_URL });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem("accessToken");
//     if (accessToken) {
//       config.headers["x-auth-token"] = accessToken;
//     }
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.request.use(
//   (req) => {
//     if (axios.defaults.headers.common["Authorization"]) return req;
//     throw { message: "the token is not available" };
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// 2. Define token refresh function.
// const requestRefresh = (refresh) => {
//   // Notice that this is the global axios instance, not the axiosInstance!  <-- important
//   return new Promise((resolve, reject) => {
//     axios.post(`${BASE_URL}/auth/refresh_token`, { refresh }).then(
//       (response) => {
//         resolve(response.data.access_token);
//       },
//       (error) => {
//         reject(console.log(error));
//       }
//     );
//   });
// };
const requestRefresh = (refresh) => {
  // Notice that this is the global axios instance, not the axiosInstance!  <-- important
  return axios
    .post(`${BASE_URL}/auth/refresh_token`, { refresh })
    .then((response) => response.data.access_token);
};

// applyAuthTokenInterceptor(axiosInstance, { requestRefresh }); // Notice that this uses the axiosInstance instance.  <-- important
applyAuthTokenInterceptor(axiosInstance, {
  header: "Authorization", // header name
  headerPrefix: "Bearer ", // header value prefix
  requestRefresh, // async function that takes a refreshToken and returns a promise the resolves in a fresh accessToken
});

// 4. Logging in
const login = async (params) => {
  //console.log("Login Success:", params);
  // return;
  const response = await axiosInstance
    .post("/auth/login", params)
    .then((response) => {
      //console.log("response: ", response);
      //console.log("access_token: ", response.data.access_token);
      //console.log("refresh_token: ", response.data.refresh_token);
      //return;
      // save tokens to storage
      setAuthTokens({
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
      });
      //document.title = `You Login Success`;
      notification.info({
        message: `You Login Success`,
      });
      return true;
    })
    .catch((err) => {
      console.log("err: ", err);
      notification.error({
        message: "เข้าสู่ระบบล้มเหลว",
      });
      return false;
    });
  // return;
  if (response) {
  }
  return false;
};

// 5. Logging out
const logout = () => {
  if (!isLoggedIn()) {
    console.log("logout failed");
    return false;
  }
  //let history = useHistory();
  console.log("logout success.");
  clearAuthTokens();
  //document.title = `You Logout Success`;
  notification.info({
    message: `You Logout Success`,
  });
  return true;
  //history.push("/");
  //return <Redirect to="/"></Redirect>;
};

// Now just make all requests using your axiosInstance instance
// axiosInstance.get('/api/endpoint/that/requires/login').then(response => { })

// Check if refresh token exists

// Get access to tokens
// const accessToken = getAccessToken();
// const refreshToken = getRefreshToken();

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
    const userAction = login(values);
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

  const onLogout = () => {
    const userAction = logout();
    if (!userAction) return;
    form.resetFields();

    setTimeout(function () {
      history.push("/");
    }, 1000);
  };

  if (showModal || onLogout) {
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
