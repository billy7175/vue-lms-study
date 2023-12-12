import axios from "axios";

const instance = axios.create({
  // withCredentials: true, //  NOT WORKING...
  // ...other options
});

// instance.defaults.withCredentials = true;  // NOT WORKING...

// withCredentials : true 설정 for use of broswer cookie
axios.interceptors.request.use(
  function (config) {
    config.withCredentials = true;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default {
  install: (app) => {
    // app.config.globalProperties.$axios에 Axios 인스턴스를 등록합니다.
    app.config.globalProperties.$axios = instance;
  },
};
