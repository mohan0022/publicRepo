// set local storage
import * as moment from "moment";
import axiosStudent from "../../app/axios/axiosInstanceStudent";

export const setDataInLocal = (key, data) => {
  if (key === "user_token") {
    localStorage.setItem(key, data);
  } else {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

export const convertLocalDate = (timestamp) => {
  return moment.unix(timestamp).format("MM/DD/YYYY");
};

export const getDataInLocal = (key) => {
  let sessionData = "";
  if (key === "user_token") {
    sessionData = localStorage.getItem(key);
  } else {
    sessionData = localStorage.getItem(key) || null;
    sessionData = JSON.parse(sessionData);
  }
  return sessionData;
};

export const removeDataInLocal = (key) => {
  localStorage.removeItem(key);
};

export const getAuthToken = () => {
  return getDataInLocal("user_token");
};

export const getStudentId = () => {
  return getDataInLocal("studentId");
};

export const removeAuthToken = () => {
  removeDataInLocal("user_token");
};

export const removeStudentId = () => {
  removeDataInLocal("studentId");
};

export const getUser = () => {
  return getDataInLocal("user");
};

export const removeUser = () => {
  removeDataInLocal("user");
};

export const setUser = (props) => {
  setDataInLocal("user", props ? `${props}` : "");
};

export const setAuthToken = (props) => {
  setDataInLocal("user_token", props ? `${props}` : "");
  if (props) {
    axiosStudent.defaults.headers.common.Authorization = `Bearer ${props}`;
  }
};

export const setStudentId = (props) => {
  setDataInLocal("studentId", props ? `${props}` : null);
};

export const objectCompare = (newObj, oldObj) => {
  return JSON.stringify(newObj) === JSON.stringify(oldObj);
};

export const isNonEmptyValue = (value) => {
  return value !== undefined && value !== null && value !== "";
};

export const isArray = (props) => {
  const givenType = typeof props;
  const isArrayBooleanVal = props instanceof Array;
  return givenType && isArrayBooleanVal;
};

export const isNonEmptyArray = (props) => {
  const isArr = isNonEmptyValue(props) && isArray(props);
  return props && props.length && isArr;
};

export const isNonEmptyObject = (obj) => {
  return !(
    obj === undefined ||
    obj === null ||
    !(obj instanceof Object) ||
    Object.keys(obj).length === 0
  );
};

export const getQueryParams = () => {
  const currentURL = window.location.href;
  const rawQueryString = currentURL.split("?");
  const queryParams =
    rawQueryString && rawQueryString.length > 1
      ? rawQueryString[1].split("&")
      : "";
  const queryParamObj = {};
  for (let i = 0; i < queryParams.length; i += 1) {
    const queryParam = queryParams[i];
    if (queryParam.includes("=")) {
      const paramKey = queryParam.split("=")[0];
      const paramValue = queryParam.split("=")[1];
      queryParamObj[paramKey] = paramValue;
    }
  }
  return queryParamObj;
};

export const dateFormatter = (string) => {
  const date = new Date(string);
  const dateStr = `${`00${date.getMonth() + 1}`.slice(
    -2
  )}/${`00${date.getDate()}`.slice(
    -2
  )}/${date.getFullYear()} ${`00${date.getHours()}`.slice(
    -2
  )}:${`00${date.getMinutes()}`.slice(-2)}:${`00${date.getSeconds()}`.slice(
    -2
  )}`;
  return dateStr;
};

export const deepCopy = (data) => {
  return JSON.parse(JSON.stringify(data));
};

export const getDomain = () => {
  const url = window.location.host;
  const parts = url.split(".");
  return parts.length > 1 && parts?.[0] !== "frontend-dot-net-zero-pathways"
    ? parts?.[0]
    : "nsw";
};

export const paymentHandler = async (e) => {
  const API_URL = "http://localhost:8000/";
  e.preventDefault();
  const orderUrl = `${API_URL}order`;
  // const response = await axiosStudent.get(orderUrl);
  // const { data } = response;
  const options = {
    key: "111",
    name: "Your App Name",
    description: "Some Description",
    order_id: "111",
    //   handler: async (response:any) => {
    //     try {
    //      const paymentId = response.razorpay_payment_id;
    //      const url = `${API_URL}capture/${paymentId}`;
    //      const captureResponse = await axiosStudent.post(url, {})
    //      console.log(captureResponse.data);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   },
    theme: {
      color: "#686CFD",
    },
  };
  const rzp1 = new window.Razorpay(options);
  rzp1.open();
};

export const trimText = (props) => {
  const yourString = props.text; // replace with your string.
  const maxLength = props.length; // maximum number of characters to extract

  // trim the string to the maximum length
  let trimmedString = yourString.substr(0, maxLength);

  // re-trim if we are in the middle of a word
  trimmedString = trimmedString.substr(
    0,
    Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
  );

  return trimmedString;
};

export const createBoobkmark = async (params) => {
  const response = await axiosStudent.post(
    "/bookmark/v1/createBookmark",
    params
  );
  const data = await response.data;

  return data;
};

export const createNotes = async (props) => {
  const response = await axiosStudent.post("/notes/v1/createNotes", props);
  const data = await response.data;

  return data;
};

export const reportError = async (params) => {
  const response = await axiosStudent.post("/task/v1/report", params);
  const data = await response.data;

  return data;
};

export const getCoursesForDropDown = async () => {
  const response = await axiosStudent.get("/courses/v1/listSimple");
  const data = await response.data;

  return data;
};

export const froalaConfig = () => {
  return {
    // toolbarSticky: false,
    // toolbarInline: true,
    toolbarBottom: true,
    key: "vYA6mC4E5F4G4I4B11dNSWXf1h1MDb1CF1PLPFf1C1EESFKVlA3C11A8D6D2B4F4G2C3H3==",
    placeholderText: "",
    colorsButtons: ["|"],
    attribution: false,
    height: 120,
    toolbarButtons: {
      moreText: {
        buttons: [
          "bold",
          "italic",
          "underline",
          "textColor",
          // "strikeThrough",
          // "subscript",
          // "superscript",
          // "fontFamily",
          // "fontSize",
          // "backgroundColor",
          // "inlineClass",
          // "inlineStyle",
          // "clearFormatting",
        ],
        buttonsVisible: 4,
      },
      moreParagraph: {
        buttons: [
          "alignLeft",
          "alignCenter",
          "alignRight",
          // "formatOLSimple",
          // "alignJustify",
          // "formatOL",
          // "formatUL",
          // "paragraphFormat",
          // "paragraphStyle",
          // "lineHeight",
          // "outdent",
          // "indent",
          // "quote",
        ],
        buttonsVisible: 3,
      },
      moreRich: {
        buttons: [
          "formatOL",
          "formatUL",
          // "insertLink",
          // "insertImage",
          // "insertVideo",
          // "insertTable",
          // "emoticons",
          // "fontAwesome",
          // "specialCharacters",
          // "embedly",
          // "insertFile",
          // "insertHR",
        ],
      },
      moreMisc: {
        buttons: [
          "outdent",
          "indent",
          // "undo",
          // "redo",
          // "fullscreen",
          // "print",
          // "getPDF",
          // "spellChecker",
          // "selectAll",
          // "html",
          // "help",
        ],
        buttonsVisible: 2,
      },
    },
    toolbarButtonsMD: {
      moreText: {
        buttons: [
          "bold",
          "italic",
          "underline",
          "textColor",
          // "strikeThrough",
          // "subscript",
          // "superscript",
          // "fontFamily",
          // "fontSize",
          // "backgroundColor",
          // "inlineClass",
          // "inlineStyle",
          // "clearFormatting",
        ],
        buttonsVisible: 4,
      },
      moreParagraph: {
        buttons: [
          "alignLeft",
          "alignCenter",
          "alignRight",
          // "formatOLSimple",
          // "alignJustify",
          // "formatOL",
          // "formatUL",
          // "paragraphFormat",
          // "paragraphStyle",
          // "lineHeight",
          // "outdent",
          // "indent",
          // "quote",
        ],
        buttonsVisible: 3,
      },
      moreRich: {
        buttons: [
          "formatOL",
          "formatUL",
          // "insertLink",
          // "insertImage",
          // "insertVideo",
          // "insertTable",
          // "emoticons",
          // "fontAwesome",
          // "specialCharacters",
          // "embedly",
          // "insertFile",
          // "insertHR",
        ],
      },
      moreMisc: {
        buttons: [
          "outdent",
          "indent",
          // "undo",
          // "redo",
          // "fullscreen",
          // "print",
          // "getPDF",
          // "spellChecker",
          // "selectAll",
          // "html",
          // "help",
        ],
        buttonsVisible: 2,
      },
    },
    toolbarButtonsSM: {
      moreText: {
        buttons: [
          "bold",
          "italic",
          "underline",
          "textColor",
          // "strikeThrough",
          // "subscript",
          // "superscript",
          // "fontFamily",
          // "fontSize",
          // "backgroundColor",
          // "inlineClass",
          // "inlineStyle",
          // "clearFormatting",
        ],
        buttonsVisible: 4,
      },
      moreParagraph: {
        buttons: [
          "alignLeft",
          "alignCenter",
          "alignRight",
          // "formatOLSimple",
          // "alignJustify",
          // "formatOL",
          // "formatUL",
          // "paragraphFormat",
          // "paragraphStyle",
          // "lineHeight",
          // "outdent",
          // "indent",
          // "quote",
        ],
        buttonsVisible: 3,
      },
      moreRich: {
        buttons: [
          "formatOL",
          "formatUL",
          // "insertLink",
          // "insertImage",
          // "insertVideo",
          // "insertTable",
          // "emoticons",
          // "fontAwesome",
          // "specialCharacters",
          // "embedly",
          // "insertFile",
          // "insertHR",
        ],
      },
      moreMisc: {
        buttons: [
          "outdent",
          "indent",
          // "undo",
          // "redo",
          // "fullscreen",
          // "print",
          // "getPDF",
          // "spellChecker",
          // "selectAll",
          // "html",
          // "help",
        ],
        buttonsVisible: 2,
      },
    },
    fontFamily: {
      "Roboto,sans-serif": "Roboto",
      "Oswald,sans-serif": "Oswald",
      "Montserrat,sans-serif": "Montserrat",
      "'Open Sans Condensed',sans-serif": "Open Sans Condensed",
      "'Coiny', cursive": "Anesk",
      Bamini: "Bamini",
      Vanavil: "Vanavil",
      // 'Montserrat,sans-serif': 'Montserrat',
      // "'Open Sans Condensed',sans-serif": 'Open Sans Condensed'
    },
    fontFamilySelection: true,
    charCounterCount: false,
    quickInsertEnabled: false,
    // Set the image upload parameter.
    // imageUploadParam: 'file',
    // Set the image upload URL.
    // imageUploadURL: 'assets/upload_image',
    // imageUploadURL: `${process.env.REACT_APP_TEACHER_BASE_URL}/teacher/v1/uploadfile`,
    // Additional upload params.
    //   imageUploadParams: {token: 'ey' },
    // Set request type.
    // imageUploadMethod: 'POST',
    // Set max image size to 5MB.
    // imageMaxSize: 5 * 1024 * 1024,
    // Allow to upload PNG and JPG.
    // imageAllowedTypes: ['jpeg', 'jpg', 'png'],

    // Set the video upload parameter.
    // videoUploadParam: 'uploadedVideo',

    // Set the video upload URL.
    // videoUploadURL: `${process.env.REACT_APP_TEACHER_BASE_URL}api/teacher/v1/upload`,

    // Additional upload params.
    //  videoUploadParams: {id: 'my_editor'},

    // Set request type.
    // videoUploadMethod: 'POST',
    imageUpload: false,
    // imageUploadMethod: 'POST',
    // Set max video size to 50MB.
    // videoMaxSize: 50 * 1024 * 1024,

    // Allow to upload MP4, WEBM and OGG
    // videoAllowedTypes: ['webm', 'jpg', 'ogg', 'mp4']
    // events: {
    // 	'image.beforeUpload': function (images) {
    // 		// console.log('l-------------', images, editor);
    // 		// Before image is uploaded
    // 		const data = new FormData();
    // 		data.append('file', images[0]);

    // 		axiosTeacher
    // 			.post('/teacher/v1/uploadfile', data)
    // 			.then(res => {
    // 				// alert('adddd');
    // 				return res.data;
    // 				// editor.image.insert(img_url, false, null, editor.image.get(), response);
    // 				// editor.image.insert(res.data.body, null, null, editor.image.get());
    // 				/*eslint no-undef: "error"*/
    // 				//eslint-disable-next-line
    // 				// editor.image.insert(res.data.body, false, null, editor.image.get(), images);
    // 			})
    // 			.catch(err => {
    // 				console.log(err);
    // 			});
    // 		// return false;
    // 	},
    // 	'image.uploaded': function (response) {
    // 		alert('Ddd');
    // 		// //eslint-disable-next-line
    // 		// editor.image.insert('fool', false, null, editor.image.get(), response);
    // 		// return false;
    // 	}
    // }
  };
};
