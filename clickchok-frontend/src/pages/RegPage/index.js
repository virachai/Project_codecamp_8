// import React from "react";
import React, { useState } from "react";
import { isLoggedIn } from "axios-jwt";
import { regFn } from "../../config/axios";
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

// https://automizy.com/blog/registration-confirmation-emails/
// https://automizy.com/blog/confirmation-email-examples/
// https://www.studentnewsdaily.com/thank-you-for-signing-up-for-the-email/
// Please check your email for a confirmation link

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

const RegPage = () => {
  // const [visible, setVisible] = useState(true);

  const [form] = Form.useForm();

  let history = useHistory();
  if (isLoggedIn()) {
    return <Redirect to={"/"} />;
  }

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const body = {
      email: values.email,
      password: values.password,
    };

    const userAction = regFn(body);
    if (!userAction) return;
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // let tempY = window.scrollY;

  const handleCancel = () => {
    window.history.back();
    console.log("handleCancel");
    return;
  };

  const onReset = () => {
    form.resetFields();
  };

  if (history || useState) {
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
            ลงทะเบียน
          </div>
        </div>

        <div className="login-section" style={{ padding: 10, maxWidth: 414 }}>
          <div>
            <h1 style={{ fontSize: 31 }}>
              <span>Sign up to ClickChok</span>
            </h1>
          </div>
          <Form
            {...layout}
            // layout="vertical"
            form={form}
            name="control-hooks"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="form-login-page"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be minimum 6 characters." },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

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

              <NavLink to="/login/">
                <Button
                  type="link"
                  htmlType="button"
                  style={{ maxWidth: "fit-content" }}
                >
                  Log in
                </Button>
              </NavLink>

              <Button
                type="link"
                htmlType="button"
                style={{ maxWidth: "fit-content" }}
              >
                Forgot password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default RegPage;
