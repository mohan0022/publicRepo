import { createSlice } from "@reduxjs/toolkit";
import { showMessage } from "app/store/fuse/messageSlice";
import jwtService from "app/services/authService";
import { createUserSettingsFirebase, setUserData } from "./userSlice";

export const signup = (userData) => async (dispatch) => {
  return jwtService
    .signInWithEmailAndPassword(userData)
    .then((user) => {
      dispatch(setUserData(user));
      return dispatch(signupSuccess());
    })
    .catch((errors) => {
      dispatch(
        showMessage({
          message: errors,
          variant: "error",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return dispatch(signupError(errors));
    });
};

export const forgetPassword = (username) => async (dispatch) => {
  return jwtService
    .forgetPassword(username)
    .then((res) => {
      showMessage({
        message: res?.message,
        variant: "success",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      return dispatch(setSecret(res?.secret));
    })
    .catch((errors) => {
      dispatch(
        showMessage({
          message: errors,
          variant: "error",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return dispatch(setParentInfoSuccess(false));
    });
};

export const getLanguages = () => async (dispatch) => {
  return jwtService
    .getLanguages()
    .then((data) => {
      return dispatch(setLanguages(data));
    })
    .catch((errors) => {});
};

export const getInstitutions = () => async (dispatch) => {
  return jwtService
    .getInstitutions()
    .then((data) => {
      return dispatch(setInstitutions(data));
    })
    .catch((errors) => {});
};

export const getClasses = (institutionId) => async (dispatch) => {
  return jwtService
    .getClasses(institutionId)
    .then((data) => {
      return dispatch(setClasses(data));
    })
    .catch((errors) => {});
};

export const getSections = (inititutionId, classID) => async (dispatch) => {
  return jwtService
    .getSections(inititutionId, classID)
    .then((data) => {
      return dispatch(setSections(data));
    })
    .catch((errors) => {});
};

export const getStates = () => async (dispatch) => {
  return jwtService
    .getStates()
    .then((data) => {
      return dispatch(setStates(data));
    })
    .catch((errors) => {});
};
export const getCities = () => async (dispatch) => {
  return jwtService
    .getCities()
    .then((data) => {
      return dispatch(setCities(data));
    })
    .catch((errors) => {});
};

export const getCourses = () => async (dispatch) => {
  return jwtService
    .getCourses()
    .then((data) => {
      return dispatch(setCourses(data));
    })
    .catch((errors) => {});
};

export const generateOTP = (mobile) => async (dispatch) => {
  return jwtService
    .generateOTP(mobile)
    .then((message) => {
      dispatch(
        showMessage({
          message,
          variant: "success",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
    })
    .catch((errors) => {});
};

const initialState = {
  success: false,
  errors: null,
  languages: [],
  institutions: [],
  classes: [],
  sections: [],
  states: [],
  cities: [],
  courses: [],
  studentsInfo: {},
  parentsInfo: {},
  studentInfoSuccess: false,
  parentInfoSuccess: false,
  isSecret: null,
  sessionId: "",
  companyEmail: "",
  basicInfo: {},
  otpVerification: {},
  additionalInfo: {},
};

const registerSlice = createSlice({
  name: "auth/register",
  initialState,
  reducers: {
    signupSuccess: (state, action) => {
      state.success = true;
      state.errors = [];
    },
    signupError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
    },

    setLanguages: (state, action) => {
      state.languages = action.payload;
    },

    setInstitutions: (state, action) => {
      state.institutions = action.payload;
    },

    setClasses: (state, action) => {
      state.classes = action.payload;
    },
    setSections: (state, action) => {
      state.sections = action.payload;
    },
    setStates: (state, action) => {
      state.states = action.payload;
    },
    setCities: (state, action) => {
      state.cities = action.payload;
    },
    setCourses: (state, action) => {
      state.courses = action.payload;
    },

    setStudentsInfo: (state, action) => {
      state.studentsInfo = action.payload;
    },
    setParentstInfo: (state, action) => {
      state.parentsInfo = action.payload;
    },
    setStudentInfoSuccess: (state, action) => {
      state.studentInfoSuccess = action.payload;
    },
    setParentInfoSuccess: (state, action) => {
      state.parentInfoSuccess = action.payload;
    },
    setSecret: (state, action) => {
      state.isSecret = action.payload;
    },
    setSessionId: (state, action) => {
      state.sessionId = action.payload;
    },
    setCompanyEmail: (state, action) => {
      state.companyEmail = action.payload;
    },
    setBasictInfo: (state, action) => {
      state.basicInfo = action.payload;
    },
    setOtptInfo: (state, action) => {
      state.otpVerification = action.payload;
    },
    setAdditionalInfo: (state, action) => {
      state.additionalInfo = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  signupSuccess,
  signupError,
  setLanguages,
  setInstitutions,
  setClasses,
  setSections,
  setStates,
  setCities,
  setCourses,
  setStudentsInfo,
  setParentstInfo,
  setStudentInfoSuccess,
  setParentInfoSuccess,
  setSecret,
  setSessionId,
  setCompanyEmail,
  setAdditionalInfo,
  setBasictInfo,
  setOtptInfo,
} = registerSlice.actions;

export default registerSlice.reducer;
