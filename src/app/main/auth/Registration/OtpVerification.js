import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@material-ui/core";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import OtpInput from "react-otp-input";
import * as yup from "yup";
import _ from "@lodash";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { closeLoader, openLoader } from "app/store/fuse/loadingSlice";
import { showMessage } from "app/store/fuse/messageSlice";
import * as styles from "../Auth.module.css";
import { setSessionId, signupError } from "../store/registerSlice";
import axios from "../../../axios/axiosInstanceStudent";

const schema = yup.object().shape({
  otp: yup
    .string()
    .matches(/^[0-9]{4}$/, "Otp must be valid.")
    .required("You must enter otp."),
});

const defaultValues = {
  otp: "",
};

function OtpVerification({ setactiveStep }) {
  const register = useSelector(({ auth }) => auth.register);
  const dispatch = useDispatch();
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
  const [seconds, setSeconds] = useState(60000);
  const [resendEnabled, setResendEnabled] = useState(false);
  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1000), 1000);
    } else {
      setResendEnabled(true);
    }
  }, [seconds]);

  function onSubmit(model) {
    const formData = new FormData();
    formData.append("otp", model.otp.trim());
    formData.append("sessionId", register.sessionId.trim());
    axios
      .post("user/v1/otp", formData)
      .then((response) => {
        if (response.data.status) {
          const { body, message } = response.data;
          setactiveStep(2);
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
          dispatch(signupError(response.data.message));
        }
        return "";
      })
      .catch((e) => {
        console.log(e, "===>signup");
      });
  }

  const resendOtp = () => {
    dispatch(openLoader());
    axios
      .post("/user/v1/forgotPassword", { username: register.companyEmail })
      .then((response) => {
        dispatch(closeLoader());
        if (response.data.status) {
          dispatch(setSessionId(response.data.body.otpSecret));
          setResendEnabled(false);
          setSeconds(60000);
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
  };

  return (
    <div className="w-full">
      <form
        className="flex flex-col justify-center w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
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
          )}
        />
        {resendEnabled ? (
          <div
            role="none"
            className={styles.forgotTxt}
            onClick={() => {
              resendOtp();
            }}
            style={{ marginTop: "15px", cursor: "pointer" }}
          >
            Resend OTP
          </div>
        ) : (
          <div className={styles.forgotTxt} style={{ marginTop: "15px" }}>
            Resend OTP in {moment.utc(seconds).format("mm:ss")}
          </div>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={`${styles.btnsubmit} w-full mx-auto mt-14 m-14`}
          aria-label="LOG IN"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          value="legacy"
        >
          Verify
        </Button>
      </form>
    </div>
  );
}

export default OtpVerification;
