import axios from "axios";
axios.interceptors.request.use(function (req) {
  return req;
});

axios.interceptors.response.use((res) => {
  if (res.data.success == `User is authorized`) {
    console.log(res.data.success == `User is authorized`);
    return localStorage.setItem("Authorization", res.data.data);
  }
  if (res.data.token) {
    return localStorage.setItem("Authorization", res.data.token);
  }
  return res;
});

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else delete axios.defaults.headers.common["Authorization"];
};
