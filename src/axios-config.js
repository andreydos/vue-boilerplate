import config from "@/config";

export default function({ axios, Vue }) {
  // set language
  axios.defaults.headers.common["Accept-language"] =
    Vue.prototype.$cookie.get(`${config.APP_NAME}.lang`) ||
    config.defaultLanguage;

  axios.interceptors.request.use(
    config => {
      // Do something before request is sent

      return config;
    },
    error => {
      // Do something with request error
      console.error(error);
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    response => {
      // Do something with response data

      return response;
    },
    error => {
      // Do something with response error
      console.error(error);
      return Promise.reject(error);
    }
  );
}
