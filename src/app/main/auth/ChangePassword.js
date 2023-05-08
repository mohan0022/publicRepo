import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { darken } from "@material-ui/core/styles/colorManipulator";
import { useDispatch, useSelector } from "react-redux";
import { removeStudentId } from "@fuse/utils/deps";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "@lodash";
import {
  Button,
  Icon,
  IconButton,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useTranslation } from "react-i18next";
import { closeLoader, openLoader } from "app/store/fuse/loadingSlice";
import { showMessage } from "app/store/fuse/messageSlice";
import { passwordExp } from "utilities/Constants";
import axios from "../../axios/axiosInstanceStudent";
import Root from "../../Root";
import * as styles from "./Auth.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#E5E5E5",
    color: theme.palette.primary.dark,
  },
  leftSection: { background: "#F7F7F7" },
  rightSection: {
    background: `linear-gradient(to right, ${"#E56100"} 100%, ${"#0B2572"} 83%)`,
    color: "#ffffff",
  },
  logo: {
    width: "19rem",
  },
  signup: {
    color: "#FED441",
  },
}));

const schema = yup.object().shape({
  password: yup
    .string()
    .required("Please enter your password.")
    .matches(
      passwordExp,
      "Password must have one uppercase, one lowercase, one numerical value and min 8 characters."
    ),
  // .max(50, 'Password is too Long - should be 50 chars maximum.'),
  confirmPassword: yup
    .string()
    .required("Please enter your password.")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const defaultValues = {
  password: "",
  confirmPassword: "",
};

function ChangePassword(props) {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const register = useSelector(({ auth }) => auth.register);
  const { t } = useTranslation();

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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupError, setSignupError] = useState(null);

  function onSubmit(model) {
    dispatch(openLoader());
    axios
      .post("/user/v1/resetPassword", {
        password: model.password,
        secret: location.state.secret,
      })
      .then((response) => {
        dispatch(closeLoader());
        if (response.data.status) {
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
          history.push({
            pathname: "/login",
          });
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

  return (
    <div className="w-full">
      <form
        className="flex flex-col justify-center w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Change Password</h2>
        <p className={styles.introtext}>
          Enter your password to change password.
        </p>
        <label htmlFor="password">Password</label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              autoFocus
              id="password"
              type="password"
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

        <label htmlFor="confirmPassword">Confirm Password</label>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              // label="Confirm Password"
              type="password"
              id="confirmPassword"
              error={!!errors.confirmPassword}
              helperText={errors?.confirmPassword?.message}
              variant="outlined"
              InputProps={{
                className: "pr-2",
                type: showConfirmPassword ? "text" : "password",
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      <Icon className="text-20" color="action">
                        {showConfirmPassword ? "visibility" : "visibility_off"}
                      </Icon>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        {signupError ? <Alert severity="error">{signupError}</Alert> : null}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={`${styles.btnsubmit} w-full mx-auto mt-14 m-14`}
          aria-label="LOG IN"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          value="legacy"
        >
          RESET
        </Button>
      </form>
    </div>
  );
}

export default ChangePassword;
