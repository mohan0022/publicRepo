import axios from "axios";

const { REACT_APP_BASE_URL } = process.env;

const instance = axios.create({
  baseURL: REACT_APP_BASE_URL,
  headers: {
    accept: "application/json",
    "content-type": "application/json",
  },
});

instance.interceptors.request.use((request) => {
  // add auth header with jwt if account is logged in and request is to the api url

  if (localStorage.getItem("user_token")) {
    request.headers.common.Authorization = `bearer ${localStorage.getItem(
      "user_token"
    )}`;
  }
  if (localStorage.getItem("i18nextLng")) {
    request.headers.common.language = localStorage.getItem("i18nextLng");
  }

  return request;
});
// instance.interceptors.response.use(
// 	response => {
// 		console.log('l-----------', response);
// 		// if (response.) {
// 		//     //perform the manipulation here and change the response object
// 		// }
// 		return response;
// 	},
// 	error => {
// 		return Promise.reject(error.message);
// 	}
// );

export default instance;
