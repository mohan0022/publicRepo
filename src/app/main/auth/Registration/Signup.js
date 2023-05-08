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
  Icon,
  IconButton,
  InputAdornment,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { signup } from "../store/registerSlice";

import Root from "../../../Root";
import BasicInfo from "./BasicInfo";
import * as styles from "../Auth.module.css";
import OtpVerification from "./OtpVerification";
import AdditionalInfo from "./AdditionalInfo";

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
  completed: {
    color: "#008764 !important",
  },
  active: {
    color: "#0B2572 !important",
  },
  stepper: {
    backgroundColor: "transparent",
    marginTop: "24px",
    marginBottom: "24px",
    padding: "0px",
  },
  stepperLabel: {
    color: "#0B2572 !important",
  },
  label: {
    fontSize: "16px",
  },
  icon: {
    height: "40px",
    width: "40px",
    borderRadius: "20px",
    alignSelf: "center",
  },
}));

const schema = yup.object().shape({
  username: yup.string().min(3).required("You must enter email/username/phone"),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(4, "Password is too short - should be 4 chars minimum."),
});

const defaultValues = {
  username: "",
  password: "",
};

function Signup(props) {
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
  const [activeStep, setactiveStep] = useState(0);

  const steps = ["Basic Info", "OTPVerification", "Additional Info"];

  // const stepconnector = () =>{

  //   if(window.innerWidth > 576){
  //     return true
  //   }

  //   return false
  // }

  return (
    <div className="w-full">
      <h2>
        {activeStep === 0
          ? "Sign up"
          : activeStep === 1
          ? "Enter OTP"
          : "Additional Info"}
      </h2>
      <p className={styles.introtext}>
        {activeStep === 0
          ? "Hi there! Please enter your details to get started."
          : activeStep === 1
          ? "Enter the OTP sent to your company email."
          : "Hi there! Please enter your details to get started."}
      </p>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        className={classes.stepper}
      >
        {steps.map((label, index) => (
          <Step
            key={label}
            onClick={() => {
              // if (index < activeStep) {
              // setactiveStep(index);
              // }
            }}
          >
            <StepLabel
              classes={{
                active: clsx(classes.active),
                completed: clsx(classes.completed),
                label: clsx(classes.label),
                // iconContainer: clsx(classes.icon),
              }}
              StepIconProps={{
                classes: {
                  active: clsx(classes.active),
                  completed: clsx(classes.completed),
                  // root: clsx(classes.icon),
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === 0 ? (
        <BasicInfo setactiveStep={setactiveStep} />
      ) : activeStep === 1 ? (
        <OtpVerification setactiveStep={setactiveStep} />
      ) : (
        <AdditionalInfo setactiveStep={setactiveStep} />
      )}
    </div>
  );
}

export default Signup;
