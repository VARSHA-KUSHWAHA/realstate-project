import React, { useEffect, useState } from "react";
import axios from "axios";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState(true);

  const onFinish = async (values) => {
    try {
      const res = await axios.post(
        ${process.env.REACT_APP_BACKEND_URL}/common/api/login,
        {
          username: values.username,
          password: values.password,
        }
      );
      if (res.data.status === 0) {
        setMessage(res.data.message);
        setMessageColor(false);
      } else {
        localStorage.setItem("email", values.username);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("token", res.data.token);

        if (res.data.role === "buyer") {
          navigate("/buyer-dashboard");
        } else {
          navigate("/seller-dashboard");
        }
      }
    } catch (err) {
      console.log("backend error", err.message);
    }
  };

  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (
      localStorage.getItem("email") &&
      localStorage.getItem("role") === "buyer"
    ) {
      navigate("/buyer-dashboard");
    } else if (
      localStorage.getItem("email") &&
      localStorage.getItem("role") === "seller"
    ) {
      navigate("/seller-dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, role]);
  return (
    <div className=" bg-[url('./images/wellcome.jpg')] h-screen w-full bg-cover bg-no-repeat min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Login
        </h2>
        <div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Link
                to="/forgot-password"
                className="login-form-forgot font-medium"
              >
                Forgot Password
              </Link>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Login
              </Button>
              <span className="ml-2 gap-2">
                Or{" "}
                <Link to="/Signup-Now" className="font-medium">
                  Register Now
                </Link>
              </span>
            </Form.Item>
            <div
              className={
                messageColor
                  ? "font-medium text-blue-600 mt-3"
                  : "font-medium text-red-500 mt-3"
              }
            >
              {message}
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
} 


