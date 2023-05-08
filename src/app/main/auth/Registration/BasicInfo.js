import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  Icon,
  IconButton,
  InputAdornment,
  makeStyles,
  MenuItem,
  Radio,
  TextField,
} from "@material-ui/core";
import { Alert, Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import _ from "@lodash";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";
import { mobileExp, passwordExp } from "utilities/Constants";
import {
  setBasictInfo,
  setCompanyEmail,
  setSessionId,
  signup,
  signupError,
} from "../store/registerSlice";
import * as styles from "../Auth.module.css";
import axios from "../../../axios/axiosInstanceStudent";

const defaultValues = {
  name: "",
  password: "",
  companyName: "",
  companyEmail: "",
  mobile: "",
  othercompanyName: "",
  gstno: "",
};

function BasicInfo({ setactiveStep }) {
  const dispatch = useDispatch();
  const register = useSelector(({ auth }) => auth.register);
  const [other, setOther] = useState(false);
  const schema = yup.object().shape({
    name: yup.string().min(3).required("You must enter name."),
    password: yup
      .string()
      .required("Please enter your password.")
      .matches(
        passwordExp,
        "Password must have one uppercase, one lowercase, one numerical value and min 8 characters."
      ),
    companyName: other
      ? yup.string()
      : yup.string().min(3).required("You must enter company name."),
    othercompanyName: other
      ? yup.string().min(3).required("You must enter company name.")
      : yup.string(),
    companyEmail: yup
      .string()
      .email("Company Email must be a valid email.")
      .required("You must enter company email."),
    mobile: yup
      .string()
      .matches(mobileExp, "Mobile number must be valid.")
      .required("You must enter mobile number."),
    gstno: yup.string(),
  });

  const {
    control,
    setValue,
    formState,
    handleSubmit,
    reset,
    trigger,
    setError,
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const [showPassword, setShowPassword] = useState(false);
  const [stateCompanyOptions, setStateCompanyOptions] = useState([]);
  const [stateCompany, setStateCompany] = useState({});
  const [CompanyLoading, setCompanyLoading] = useState(false);
  // useEffect(() => {
  //   dispatch(setBasictInfo(getValues()));
  // }, [
  //   getValues().companyEmail,
  //   getValues().companyName,
  //   getValues().mobile,
  //   getValues().name,
  //   getValues().othercompanyName,
  //   getValues().password,
  // ]);

  // console.log(register.basicInfo, "JJJJJ");

  function onSubmit(model) {
    // dispatch(signup(model));
    const formData = {
      name: model.name,
      password: model.password,
      companyName: other ? model.othercompanyName : model.companyName,
      companyEmail: model.companyEmail,
      mobile: model.mobile,
      gstno: model.gstno,
    };
    axios
      .post("user/v1/registeration", formData)
      .then((response) => {
        if (response.data.status) {
          const { body, message } = response.data;
          dispatch(setSessionId(body.sessionId));
          dispatch(setCompanyEmail(model.companyEmail));
          setactiveStep(1);
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

  const handleCompanyChange = async (event) => {
    try {
      setCompanyLoading(true);
      if (!event) {
        return;
      }
      const res = await axios.post("/user/v1/getCompanyList", {
        search: event.target.value,
      });
      const industries = res.data.body.result;
      setStateCompanyOptions(industries);
      setCompanyLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full">
      <form
        className="flex flex-col justify-center w-full"
        // onSubmit={(e) => {
        //   handleSubmit(onSubmit);
        //   // e.preventDefault();
        // }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="name">Name*</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              type="text"
              id="name"
              error={!!errors.name}
              helperText={errors?.name?.message}
              // label="Username/Email"
              //   InputProps={{
              //     endAdornment: (
              //       <InputAdornment position="end">
              //         <Icon className="text-20" color="action">
              //           user
              //         </Icon>
              //       </InputAdornment>
              //     ),
              //   }}
              variant="outlined"
            />
          )}
        />
        <label htmlFor="companyEmail">Company Email*</label>
        <Controller
          name="companyEmail"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              type="text"
              id="companyEmail"
              error={!!errors.companyEmail}
              helperText={errors?.companyEmail?.message}
              // label="Username/Email"
              //   InputProps={{
              //     endAdornment: (
              //       <InputAdornment position="end">
              //         <Icon className="text-20" color="action">
              //           user
              //         </Icon>
              //       </InputAdornment>
              //     ),
              //   }}
              variant="outlined"
            />
          )}
        />
        <label htmlFor="companyName">Company Name*</label>
        {/* <Controller
          name="companyName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              // select
              type="text"
              id="companyName"
              error={!!errors.companyName}
              helperText={errors?.companyName?.message}
              // onChange={(e) => {
              //   console.log(e.target);
              // }}
              // label="Username/Email"
              //   InputProps={{
              //     endAdornment: (
              //       <InputAdornment position="end">
              //         <Icon className="text-20" color="action">
              //           user
              //         </Icon>
              //       </InputAdornment>
              //     ),
              //   }}
              variant="outlined"
            />
            //  {currencies.map((option) => (
            //  <MenuItem key={1} value={1233}>
            //   option.label
            // </MenuItem>
            //    ))}
            //  </TextField>
          )}
        /> */}

        <Controller
          name="companyName"
          control={control}
          rules={{
            required: "Please enter something",
          }}
          render={({ field, fieldState }) => {
            return (
              <Autocomplete
                {...field}
                value={stateCompany}
                onChange={(e, data) => {
                  field.onChange(data?.CommonMasterID || "");
                  setStateCompany(data);
                }}
                disabled={other}
                onInputChange={(event) => handleCompanyChange(event)}
                // multiple
                loading={CompanyLoading}
                id="tags-filled"
                options={stateCompanyOptions}
                getOptionLabel={(option) => option.DisplayName}
                // popupIcon={
                // 	<img src={arrow} alt="img" width="100%" height="100%" />
                // }
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    variant="outlined"
                    // label="State"
                    // placeholder="companyName"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            );
          }}
        />
        <FormControlLabel
          className={styles.smt}
          control={
            <Checkbox
              value={other}
              onChange={() => {
                setOther((pre) => !pre);
              }}
            />
          }
          label="Other"
        />

        {other && (
          <>
            <label htmlFor="othercompanyName">Other Company Name*</label>
            <Controller
              name="othercompanyName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-16"
                  // select
                  type="text"
                  id="othercompanyName"
                  error={!!errors.othercompanyName}
                  helperText={errors?.othercompanyName?.message}
                  // onChange={(e) => {
                  //   console.log(e.target);
                  // }}
                  // label="Username/Email"
                  //   InputProps={{
                  //     endAdornment: (
                  //       <InputAdornment position="end">
                  //         <Icon className="text-20" color="action">
                  //           user
                  //         </Icon>
                  //       </InputAdornment>
                  //     ),
                  //   }}
                  variant="outlined"
                />
                //  {currencies.map((option) => (
                //  <MenuItem key={1} value={1233}>
                //   option.label
                // </MenuItem>
                //    ))}
                //  </TextField>
              )}
            />
          </>
        )}
        <label htmlFor="password">Password*</label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              // label="Password"
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
              required
            />
          )}
        />
        <label htmlFor="mobile">Mobile Number*</label>
        <Controller
          name="mobile"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              type="text"
              id="mobile"
              error={!!errors.mobile}
              helperText={errors?.mobile?.message}
              onKeyPress={(e) => {
                if (!(e.key >= 0 || e.key <= 9)) {
                  e.preventDefault();
                }
              }}
              inputProps={{ maxLength: 10 }}
              // label="Username/Email"
              //   InputProps={{
              //     endAdornment: (
              //       <InputAdornment position="end">
              //         <Icon className="text-20" color="action">
              //           user
              //         </Icon>
              //       </InputAdornment>
              //     ),
              //   }}
              variant="outlined"
            />
          )}
        />
        <label htmlFor="gstno">GST Number</label>
        <Controller
          name="gstno"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              type="text"
              id="gstno"
              error={!!errors.gstno}
              helperText={errors?.gstno?.message}
              // onKeyPress={(e) => {
              //   if (!(e.key >= 0 || e.key <= 9)) {
              //     e.preventDefault();
              //   }
              // }}
              inputProps={{ maxLength: 15 }}
              // label="Username/Email"
              //   InputProps={{
              //     endAdornment: (
              //       <InputAdornment position="end">
              //         <Icon className="text-20" color="action">
              //           user
              //         </Icon>
              //       </InputAdornment>
              //     ),
              //   }}
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
          // onClick={handleSubmit(onSubmit)}
        >
          Next
        </Button>
      </form>

      <Divider variant="middle" className={styles.divider} />
      <div className={styles.dnttxt}>
        Don't have an account?
        <Link className={clsx(styles.signup, "font - normal")} to="/login">
          Login
        </Link>
      </div>
    </div>
  );
}

export default BasicInfo;
