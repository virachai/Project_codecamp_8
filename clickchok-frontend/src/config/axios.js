import {
  isLoggedIn,
  setAuthTokens,
  clearAuthTokens,
  applyAuthTokenInterceptor,
} from "axios-jwt";
import axios from "axios";
import { notification } from "antd";
// 192.168.43.129
// export const BASE_URL = "http://172.26.0.1:8000";
export const BASE_URL = "http://172.26.0.1:8000";

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
// Notice that this is the global axios instance, not the axiosInstance!  <-- important
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

// headers: {
//   "X-Auth-Token": token
// }

const requestRefresh = (refresh) => {
  console.log("config : requestRefresh");
  // Notice that this is the global axios instance, not the axiosInstance!  <-- important
  return axios
    .post(`${BASE_URL}/auth/refresh_token`, { refresh })
    .then((response) => {
      console.log(response);
      if (response.data) return response.data.access_token;
    });
  // .catch((err) => {
  //   console.log(err);
  //   if (err) return err;
  // });
};

// applyAuthTokenInterceptor(axiosInstance, { requestRefresh }); // Notice that this uses the axiosInstance instance.  <-- important
// applyAuthTokenInterceptor(axiosInstance, {
//   header: "Authorization", // header name
//   headerPrefix: "Bearer ", // header value prefix
//   requestRefresh, // async function that takes a refreshToken and returns a promise the resolves in a fresh accessToken
// });
applyAuthTokenInterceptor(axiosInstance, {
  header: "X-Auth-Token", // header name
  headerPrefix: "Bearer ", // header value prefix
  requestRefresh, // async function that takes a refreshToken and returns a promise the resolves in a fresh accessToken
});

// 4. Logging in
export const loginFn = async (params) => {
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
  // if (!response) {
  //   notification.error({
  //     message: "เข้าสู่ระบบล้มเหลว",
  //   });
  // }
  if (response) {
  }
  return false;
};

// 5. Logging out
export const logoutFn = () => {
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

// 6. RegFn
export const regFn = async (params) => {
  //console.log("Login Success:", params);
  // return;
  const response = await axiosInstance
    .post("/api/reg", params)
    .then((response) => {
      console.log("response: ", response);
      notification.info({
        message: `สมัครสมาชิกแล้ว`,
      });
      return true;
    })
    .catch((err) => {
      console.log("err: ", err);
      notification.error({
        message: `สมัครสมาชิกล้มเหลว`,
      });
      return false;
    });

  if (!response) {
  }
  return false;
};

export default axiosInstance;
