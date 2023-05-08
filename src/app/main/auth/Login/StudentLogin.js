import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Checkbox, Divider, FormControlLabel } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { submitStudentLogin } from "app/main/auth/store/loginSlice";
import * as yup from "yup";
import _ from "@lodash";
import { useHistory, Link } from "react-router-dom";
import { showMessage } from "app/store/fuse/messageSlice";
import platform from "platform";

import { closeLoader, openLoader } from "app/store/fuse/loadingSlice";
import {
  getDataInLocal,
  setAuthToken,
  setDataInLocal,
  setUser,
} from "@fuse/utils/deps";
import { setNavigation } from "app/store/fuse/navigationSlice";
import studentNavigationConfig from "app/fuse-configs/studentNavigationConfig";
import clsx from "clsx";

import axios from "../../../axios/axiosInstanceStudent";
import * as styles from "../Auth.module.css";

import { setActiveTestDetails, setUserData } from "../store/userSlice";

const schema = yup.object().shape({
  username: yup
    .string()
    .email("Company Email must be a valid email")
    .required("You must enter email"),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(4, "Password is too short - should be 4 chars minimum."),
  // .max(50, 'Password is too Long - should be 50 chars maximum.')
});

const defaultValues = {
  username: "",
  password: "",
};

function StudentLogin(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const login = useSelector(({ auth }) => auth.login);

  const {
    control,
    setValue,
    formState,
    handleSubmit,
    reset,
    trigger,
    setError,
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [rememberMe, setRememberMe] = useState({});
  useEffect(() => {
    const remem = getDataInLocal("remember_me");
    setRememberMe(remem);
    if (!_.isEmpty(remem)) {
      setValue("username", remem?.username);
      setValue("password", remem?.password);
    }
    console.log(remem, "remember_me");
  }, []);
  console.log(errors, isValid, dirtyFields);
  function onSubmit(model) {
    dispatch(openLoader());
    const deviceInfo = getDeviceInfo();
    let rememberData = rememberMe;
    if (
      // rememberData.find((ele, ind) => ele?.username === model.username) &&
      !remember
    ) {
      // rememberData = rememberData.filter(
      //   (ele, ind) => ele?.username !== model.username
      // );
      rememberData = {};
    } else if (
      // !rememberData.find((ele, ind) => ele?.username === model.username) &&
      remember
    ) {
      // rememberData = [...rememberData, model];
      rememberData = model;
    }
    console.log(rememberData, "==============");

    axios
      .post("/user/v1/login", { ...model, deviceInfo })
      .then((response) => {
        dispatch(closeLoader());
        if (response.data.status) {
          setDataInLocal("remember_me", rememberData);
          setRememberMe(rememberData);
          const { body, message } = response.data;

          const { token } = body;

          const user = {
            data: {
              displayName: body.userName,
              role: body.userTypeName,
              UserSessionID: body.UserSessionID,
              photoURL: "assets/images/avatars/profile.jpg",
              email: body.email,

              shortcuts: [],
            },
            message,
          };

          dispatch(setActiveTestDetails(body?.activeTestDetails));
          // dispatch(getNotifications());
          dispatch(setUserData(user));

          setUser(JSON.stringify(user));
          setAuthToken(token);

          if (body.userType === 6) {
            dispatch(setNavigation(studentNavigationConfig));
            history.push({
              pathname: "/home",
            });
          }

          dispatch(
            showMessage({
              message: response.data.message,
              variant: "success",
              autoHideDuration: 3000,
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
            })
          );
        } else {
          dispatch(
            showMessage({
              message: response.data.message,
              variant: "error",
              autoHideDuration: 3000,
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
            })
          );
        }
      })
      .catch((error) => {
        dispatch(closeLoader());

        dispatch(
          showMessage({
            message: "Oops something went wrong",
            variant: "error",
            autoHideDuration: 3000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          })
        );
      });
  }

  function getDeviceInfo() {
    platform.name; // 'IE'
    platform.version; // '10.0'
    platform.layout; // 'Trident'
    platform.os; // 'Windows Server 2008 R2 / 7 x64'
    platform.description; // 'IE 10.0 x86 (platform preview; running in IE 7 mode) on Windows Server 2008 R2 / 7 x64'
    platform.product;
    return {
      name: platform.name,
      version: platform.version,
      layout: platform.layout,
      os: platform.os,
      product: platform.product,
      isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
    };
  }

  return (
    <div className="w-full">
      <form
        className="flex flex-col justify-center w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Login</h2>
        <p className={styles.introtext}>
          Welcome Back! Please enter your details.
        </p>
        <label htmlFor="company_email">Company Email</label>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              type="text"
              id="company_email"
              error={!!errors.username}
              helperText={errors?.username?.message}
              // onChange={(e) => {
              //   field.onChange(e.target.value);
              // const data = rememberMe.find(
              //   (ele, ind) => ele.username === e.target.value
              // );
              // if (data) {
              //   setValue("password", data.password);
              //   // onSubmit(data);
              // }
              // }}
              // label="Username/Email"
              // InputProps={{
              // 	endAdornment: (
              // 		<InputAdornment position="end">
              // 			<Icon className="text-20" color="action">
              // 				user
              // 			</Icon>
              // 		</InputAdornment>
              // 	)
              // }}
              variant="outlined"
            />
          )}
        />
        <label htmlFor="password">Password</label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              // label="Password"
              type="password"
              id="password"
              error={!!errors.password}
              helperText={errors?.password?.message}
              variant="outlined"
              InputProps={{
                className: "pr-2",
                type: showPassword ? "text" : "password",
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      <Icon className="text-20" color="action">
                        {showPassword ? "visibility" : "visibility_off"}
                      </Icon>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={remember}
              onChange={() => setRemember((pre) => !pre)}
            />
          }
          label="Remember me"
          className={styles.smt}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={`${styles.btnsubmit} w-full mx-auto mt-14 m-14`}
          aria-label="LOG IN"
          // disabled={_.isEmpty(dirtyFields) || !isValid}
          value="legacy"
        >
          Login
        </Button>

        <div className={styles.forgotTxt}>
          <Link className="font - normal" to="/forget-password">
            Forgot Password?
          </Link>
        </div>
      </form>
      <Divider variant="middle" className={styles.divider} />
      <div className={styles.dnttxt}>
        Don't have an account?
        <Link className={clsx(styles.signup, "font - normal")} to="/signup">
          Signup
        </Link>
      </div>
    </div>
  );
}

export default StudentLogin;
