import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
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
import OtpInput from "react-otp-input";
import moment from "moment";
import axios from "../../axios/axiosInstanceStudent";
import { openLoader, closeLoader } from "../../store/fuse/loadingSlice";
import { showMessage } from "../../store/fuse/messageSlice";
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
  otp: yup.string().required("You must provide OTP"),
});

const defaultValues = {
  otp: "",
};

function VerifyOTP(props) {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const { t } = useTranslation();

  const [seconds, setSeconds] = useState(60000);
  const [resendEnabled, setResendEnabled] = useState(false);
  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1000), 1000);
    } else {
      setResendEnabled(true);
    }
  }, [seconds]);

  useEffect(() => {
    if (!location.state.secret) {
      history.push({
        pathname: "/login",
      });
    }
  }, [location, history]);

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

  function onSubmit(model) {
    dispatch(openLoader());
    axios
      .post("/user/v1/validateEmailOtp", {
        passcode: model.otp,
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
            pathname: "/change-password",
            state: { secret: response.data.body.secret },
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
        <h2>Enter OTP</h2>
        <p className={styles.introtext}>OTP is sent to your registered email</p>
        <label htmlFor="otp">Otp</label>
        <Controller
          name="otp"
          control={control}
          render={({ field }) => (
            <OtpInput
              {...field}
              numInputs={4}
              inputStyle={clsx(styles.otpInput)}
              separator={<div className={styles.space} />}
              isInputNum
            />
            // <TextField
            //   {...field}
            //   autoFocus
            //   className="mb-16"
            //   type="text"
            //   id="otp"
            //   error={!!errors.otp}
            //   helperText={errors?.otp?.message}
            //   // label="otp"
            //   variant="outlined"
            // />
          )}
        />
        <div className={styles.forgotTxt} style={{ marginTop: "15px" }}>
          {moment.utc(seconds).format("mm:ss")}
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={`${styles.btnsubmit} w-full mx-auto mt-14 m-14`}
          aria-label="LOG IN"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          value="legacy"
        >
          SUBMIT
        </Button>
      </form>
    </div>
  );
}

export default VerifyOTP;
