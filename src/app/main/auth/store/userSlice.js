/* eslint import/no-extraneous-dependencies: off*/
import { createSlice } from "@reduxjs/toolkit";
import firebase from "firebase/app";
import "firebase/auth";
import history from "@history";
import _ from "@lodash";
import {
  setInitialSettings,
  setDefaultSettings,
} from "app/store/fuse/settingsSlice";
import { showMessage } from "app/store/fuse/messageSlice";
import authService from "app/services/authService";

export const setUserDataAuth0 = (tokenData) => async (dispatch) => {
  const user = {
    role: ["admin"],
    from: "auth0",
    data: {
      displayName: tokenData.username || tokenData.name,
      photoURL: tokenData.picture,
      email: tokenData.email,
      settings:
        tokenData.user_metadata && tokenData.user_metadata.settings
          ? tokenData.user_metadata.settings
          : {},
      shortcuts:
        tokenData.user_metadata && tokenData.user_metadata.shortcuts
          ? tokenData.user_metadata.shortcuts
          : [],
    },
  };

  return dispatch(setUserData(user));
};

export const setUserDataFirebase = (user, authUser) => async (dispatch) => {
  if (
    user &&
    user.data &&
    user.data.settings &&
    user.data.settings.theme &&
    user.data.settings.layout &&
    user.data.settings.layout.style
  ) {
    return dispatch(setUserData(user));
  }
  return dispatch(createUserSettingsFirebase(authUser));
};

export const createUserSettingsFirebase =
  (authUser) => async (dispatch, getState) => {
    const guestUser = getState().auth.user;
    const fuseDefaultSettings = getState().fuse.settings.defaults;
    const { currentUser } = firebase.auth();

    /**
     * Merge with current Settings
     */
    const user = _.merge({}, guestUser, {
      uid: authUser.uid,
      from: "firebase",
      role: ["admin"],
      data: {
        displayName: authUser.displayName,
        email: authUser.email,
        settings: { ...fuseDefaultSettings },
      },
    });
    currentUser.updateProfile(user.data);

    dispatch(updateUserData(user));

    return dispatch(setUserData(user));
  };

export const setUserData = (user) => async (dispatch, getState) => {
  history.location.state = {
    redirectUrl: user?.redirectUrl, // for example 'apps/academy'
  };

  dispatch(setDefaultSettings(user?.data?.settings));

  dispatch(setUser(user));
};

export const updateUserSettings = (settings) => async (dispatch, getState) => {
  const oldUser = getState().auth.user;
  const user = _.merge({}, oldUser, { data: { settings } });

  dispatch(updateUserData(user));

  return dispatch(setUserData(user));
};

export const updateUserShortcuts =
  (shortcuts) => async (dispatch, getState) => {
    const { user } = getState().auth;
    const newUser = {
      ...user,
      data: {
        ...user.data,
        shortcuts,
      },
    };

    dispatch(updateUserData(user));

    return dispatch(setUserData(newUser));
  };

export const logoutUser = () => async (dispatch, getState) => {
  const { user } = getState().auth;
  history.push({
    pathname: "/",
  });

  switch (user.from) {
    default: {
      authService.logout();
    }
  }

  dispatch(setInitialSettings());

  return dispatch(userLoggedOut());
};

export const updateUserData = (user) => async (dispatch, getState) => {
  if (!user.role || user.role.length === 0) {
    return;
  }
  switch (user.from) {
    default: {
      authService
        .updateUserData(user)
        .then(() => {
          dispatch(showMessage({ message: "User data saved with api" }));
        })
        .catch((error) => {
          dispatch(showMessage({ message: error.message }));
        });
      break;
    }
  }
};

const initialState = {
  data: {
    displayName: "",
    photoURL: "assets/images/avatars/Velazquez.jpg",
    email: "",
    role: "user",
    CourseID: null,
    TaskID: null,
    TestSessionID: null,
    UserSessionID: null,
    shortcuts: ["calendar", "mail", "contacts", "todo"],
  },
  studentPreference: [],
  platformData: [],
  keywordSearch: null,
  jobSearch: null,
  student: null,
  activeTestDetails: null,
  searchFilter: null,
};

const userSlice = createSlice({
  name: "auth/user",
  initialState,
  reducers: {
    // setUser: (state, action) => action.payload,
    setUser: (state, action) => ({
      ...state,
      data: action.payload.data,
    }),
    userLoggedOut: (state, action) => initialState,
    setActiveTestDetails: (state, action) => ({
      ...state,
      activeTestDetails: action.payload,
    }),
    setStudentPreference: (state, action) => ({
      ...state,
      studentPreference: action.payload,
    }),
    setPlatformData: (state, action) => ({
      ...state,
      platformData: action.payload,
    }),
    setStudent: (state, action) => ({
      ...state,
      student: action.payload,
    }),
    setKeywordSearch: (state, action) => ({
      ...state,
      keywordSearch: action.payload,
    }),
    setJobSearch: (state, action) => ({
      ...state,
      jobSearch: action.payload,
    }),
    setSearchFilter: (state, action) => ({
      ...state,
      searchFilter: action.payload,
    }),
    disablePopup: (state, action) => ({
      ...state,
      activeTestDetails: { ...state.activeTestDetails, isShown: true },
    }),
    clearActiveTestDetails: (state, action) => ({
      ...state,
      activeTestDetails: null,
    }),
  },
  extraReducers: {},
});

export const {
  setUser,
  userLoggedOut,
  setActiveTestDetails,
  clearActiveTestDetails,
  disablePopup,
  setPlatformData,
  setStudent,
  setStudentPreference,
  setKeywordSearch,
  setSearchFilter,
  setJobSearch,
} = userSlice.actions;

export default userSlice.reducer;
