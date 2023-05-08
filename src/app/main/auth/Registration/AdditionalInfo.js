import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Chip,
  Divider,
  FormControlLabel,
  FormLabel,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import _ from "@lodash";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";
import { signup, signupError } from "../store/registerSlice";
import * as styles from "../Auth.module.css";
import axios from "../../../axios/axiosInstanceStudent";

const schema = yup.object().shape({
  addressLine1: yup.string().required("You must enter addressLine1."),
  state: yup.string().required("You must enter state."),
  district: yup.string().required("You must enter district."),
  industry: yup.string().required("You must select industry."),
  pincode: yup
    .string()
    .matches(/^[0-9]{6}$/, "PIN Code must be valid.")
    .required("You must enter pin code."),
});

const defaultValues = {
  industry: "",
  addressLine1: "",
  addressLine2: "",
  state: "",
  district: "",
  pincode: "",
};

function AdditionalInfo({ setactiveStep }) {
  const register = useSelector(({ auth }) => auth.register);
  const dispatch = useDispatch();
  const history = useHistory();
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

  const [companyType, setcompanyType] = useState(1);
  const [stateDropdownOptions, setStatesOptions] = useState([]);
  const [stateDistrictOptions, setStateDistrictOptions] = useState([]);
  const [stateDistrict, setStateDistrict] = useState({});
  const [stateLoading, setStateLoading] = useState(false);
  const [districtLoading, setDistrictLoading] = useState(false);
  const [stateDropdown, setStatesDropdown] = useState("");
  const [stateIndustryOptions, setStateIndustryOptions] = useState([]);
  const [stateIndustry, setStateIndustry] = useState({});
  const [industryLoading, setIndustryLoading] = useState(false);
  function onSubmit(model) {
    // dispatch(signup(model));
    const FormData = {
      companyType,
      Industry: model.industry,
      address1: model.addressLine1,
      address2: model.addressLine2,
      state: model.state,
      district: model.district,
      pincode: model.pincode,
      sessionId: register.sessionId,
    };
    axios
      .post("user/v1/registerinfo", FormData)
      .then((response) => {
        if (response.data.status) {
          const { body, message } = response.data;
          // dispatch(setSessionId(body.sessionId));
          // setactiveStep(1);
          history.push({
            pathname: "/home",
          });
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
          dispatch(signupError(response.data.message));
        }
        return "";
      })
      .catch((e) => {
        console.log(e, "===>signup");
      });
  }

  const currencies = [
    {
      value: "USD",
      label: "$",
    },
    {
      value: "EUR",
      label: "€",
    },
    {
      value: "BTC",
      label: "฿",
    },
    {
      value: "JPY",
      label: "¥",
    },
  ];

  const handleDrodownChange = async (event) => {
    try {
      setStateLoading(true);
      if (!event) {
        return;
      }
      const res = await axios.post("/user/v1/state", {
        state: event.target.value,
      });
      const states = res.data.body.state;
      setStatesOptions(states);
      setStateLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleIndustryChange = async (event) => {
    try {
      setIndustryLoading(true);
      if (!event) {
        return;
      }
      const res = await axios.post("/user/v1/industry", {
        industry: event.target.value,
      });
      const industries = res.data.body.industry;
      setStateIndustryOptions(industries);
      setIndustryLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDistrictChange = async (event, values) => {
    try {
      if (!event) {
        return;
      }

      setDistrictLoading(true);
      const { CommonMasterID } = stateDropdown;
      const res = await axios.post("/user/v1/district", {
        stateId: CommonMasterID,
        district: event.target.value,
      });
      const { district } = res.data.body;
      setStateDistrictOptions(district);
      setDistrictLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full">
      <form
        className="flex flex-col justify-center w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="companyType">Company Type*</label>
        <RadioGroup
          name="controlled-radio-buttons-group"
          row
          id="companyType"
          value={companyType}
          onChange={(e) => {
            setcompanyType(parseInt(e.target.value, 10));
          }}
        >
          <FormControlLabel
            value={1}
            control={<Radio />}
            label="Company"
            style={{ marginTop: "0px", marginBottom: "0px" }}
          />
          <FormControlLabel
            value={2}
            control={<Radio />}
            label="Consultant"
            style={{ marginTop: "0px", marginBottom: "0px" }}
          />
        </RadioGroup>
        <label htmlFor="industry">Select Industry*</label>
        <Controller
          name="industry"
          control={control}
          rules={{
            required: "Please enter something",
          }}
          render={({ field, fieldState }) => {
            return (
              <Autocomplete
                {...field}
                value={stateIndustry}
                onChange={(e, data) => {
                  field.onChange(data?.CommonMasterID || "");
                  setStateIndustry(data);
                }}
                onInputChange={(event) => handleIndustryChange(event)}
                // multiple
                loading={industryLoading}
                id="tags-filled"
                options={stateIndustryOptions}
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
                    placeholder="Industry"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            );
          }}
        />
        {/* <Controller
          name="industry"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="industry"
              select
              variant="outlined"
              error={!!errors.industry}
              helperText={errors?.industry?.message}
              //   label="Select"
              //   value={currency}
              //   onChange={handleChange}
              //   helperText="Please select your currency"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        /> */}
        <label htmlFor="addressLine1">Company Address*</label>
        <Controller
          name="addressLine1"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              type="text"
              id="addressLine1"
              error={!!errors.addressLine1}
              helperText={errors?.addressLine1?.message}
              placeholder="Address Line 1"
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
        <Controller
          name="addressLine2"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              type="addressLine2"
              error={!!errors.addressLine2}
              helperText={errors?.addressLine2?.message}
              variant="outlined"
              placeholder="Address Line 2"
            />
          )}
        />
        <Grid container rowSpacing={1} columnSpacing={3}>
          <Grid item xs={6}>
            <Controller
              name="state"
              control={control}
              rules={{
                required: "Please enter something",
              }}
              render={({ field, fieldState }) => {
                return (
                  <Autocomplete
                    {...field}
                    value={stateDropdown}
                    onChange={(e, data) => {
                      field.onChange(data?.CommonMasterID || "");
                      setStatesDropdown(data);
                    }}
                    onInputChange={(event) => handleDrodownChange(event)}
                    // multiple
                    loading={stateLoading}
                    id="tags-filled"
                    options={stateDropdownOptions}
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
                        placeholder="State"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        className={`${styles.gridField} mb-16`}
                      />
                    )}
                  />
                );
              }}
            />
          </Grid>

          <Grid item xs={6} style={{ alignItems: "flex-end" }}>
            <Controller
              name="district"
              control={control}
              rules={{
                required: "Please enter something",
              }}
              render={({ field, fieldState }) => {
                return (
                  <Autocomplete
                    value={stateDistrict}
                    onChange={(e, data) => {
                      field.onChange(data?.CommonMasterID || "");
                      setStateDistrict(data);
                    }}
                    onInputChange={(event) => {
                      handleDistrictChange(event);
                    }}
                    // popupIcon={
                    // 	<img src={arrow} alt="img" width="100%" height="100%" />
                    // }
                    // multiple
                    id="tags-filled"
                    loading={districtLoading}
                    options={stateDistrictOptions}
                    getOptionLabel={(option) => option.DisplayName}
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
                        // label="District"
                        placeholder="District"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        className={`${styles.gridField} mb-16`}
                      />
                    )}
                  />
                );
              }}
            />
          </Grid>
          {/* <Grid item xs={6}>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className={`${styles.gridField} mb-16`}
                  select
                  id="state"
                  error={!!errors.state}
                  helperText={errors?.state?.message}
                  placeholder="State"
                  variant="outlined"
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="district"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className={`${styles.gridField} mb-16`}
                  select
                  id="district"
                  error={!!errors.district}
                  helperText={errors?.district?.message}
                  placeholder="District"
                  variant="outlined"
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid> */}
          <Grid item xs={6}>
            <Controller
              name="pincode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className={`${styles.gridField} mb-16`}
                  type="text"
                  id="pincode"
                  error={!!errors.pincode}
                  helperText={errors?.pincode?.message}
                  placeholder="PIN Code"
                  onKeyPress={(e) => {
                    if (!(e.key >= 0 || e.key <= 9)) {
                      e.preventDefault();
                    }
                  }}
                  inputProps={{ maxLength: 6 }}
                  variant="outlined"
                />
              )}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={`${styles.btnsubmit} w-full mx-auto mt-14 m-14`}
          aria-label="LOG IN"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          value="legacy"
        >
          Sign up
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

export default AdditionalInfo;
