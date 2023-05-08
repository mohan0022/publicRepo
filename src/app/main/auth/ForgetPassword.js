import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { darken } from "@material-ui/core/styles/colorManipulator";
import { useDispatch, useSelector } from "react-redux";
import { removeStudentId } from "@fuse/utils/deps";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "@lodash";
import {
  Button,
  Divider,
  Icon,
  IconButton,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { forgetPassword } from "./store/registerSlice";
import axios from "../../axios/axiosInstanceStudent";
import { openLoader, closeLoader } from "../../store/fuse/loadingSlice";
import { showMessage } from "../../store/fuse/messageSlice";
import Root from "../../Root";
import * as styles from "./Auth.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#E5E5E5",
    color: theme.palette.primary.dark,
  },
  leftSection: { background: "#F7F7F7" },
  rightSection: {
    background: `linear-gradient(to right, ${"#0B2572"} 100%, ${"#0B2572"} 83%)`,
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
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
});

const defaultValues = {
  email: "",
};

function ForgetPassword(props) {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const register = useSelector(({ auth }) => auth.register);

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
  const [signupError, setSignupError] = useState(null);

  function onSubmit(model) {
    dispatch(openLoader());
    axios
      .post("/user/v1/forgotPassword", { username: model.email })
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
            pathname: "/verify",
            state: { secret: response.data.body.otpSecret },
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
        <h2>Forgot Password</h2>
        <p className={styles.introtext}>
          Enter your registered email to send a password reset link.
        </p>
        <label htmlFor="email">Registered Email</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              autoFocus
              className="mb-16"
              type="text"
              id="email"
              error={!!errors.email}
              helperText={errors?.email?.message}
              // label="Email"
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

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={`${styles.btnsubmit} w-full mx-auto mt-14 m-14`}
          aria-label="LOG IN"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          value="legacy"
        >
          Send Reset Link
        </Button>
      </form>
      <Divider variant="middle" className={styles.divider} />
      <div className={styles.dnttxt}>
        <Link className={clsx(classes.signup, "font - normal")} to="/login">
          Back to Login
        </Link>
      </div>
    </div>
  );
}

export default ForgetPassword;
