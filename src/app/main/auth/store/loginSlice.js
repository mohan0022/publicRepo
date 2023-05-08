import { createSlice } from "@reduxjs/toolkit";
import { showMessage } from "app/store/fuse/messageSlice";
import authService from "app/services/authService";
import { setUserData } from "./userSlice";

export const submitStudentLogin = (userData) => async (dispatch) => {
  return authService
    .signInWithEmailAndPassword(userData)
    .then((user) => {
      dispatch(setUserData(user));
      dispatch(
        showMessage({
          message: user.message,
          variant: "success",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return dispatch(loginSuccess());
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
      return dispatch(loginError(errors));
    });
};

export const submitParentLogin =
  ({ email, password }) =>
  async (dispatch) => {
    return authService
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch(setUserData(user));

        return dispatch(loginSuccess());
      })
      .catch((errors) => {
        return dispatch(loginError("Invalid user or ppassword"));
      });
  };

const initialState = {
  success: false,
  errors: null,
  tab: 0,
};

const loginSlice = createSlice({
  name: "auth/login",
  initialState,
  reducers: {
    loginSuccess: (state, action) => ({
      ...state,
      success: true,
      errors: null,
    }),
    loginError: (state, action) => ({
      ...state,
      success: false,
      errors: action.payload,
    }),
    changeTab: (state, action) => ({
      ...state,
      tab: action.payload,
    }),
  },
  extraReducers: {},
});

export const { loginSuccess, loginError, changeTab } = loginSlice.actions;

export default loginSlice.reducer;
