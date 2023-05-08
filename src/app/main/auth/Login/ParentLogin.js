import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { submitParentLogin } from "app/main/auth/store/loginSlice";
import * as yup from "yup";
import _ from "@lodash";
import { Link, useHistory } from "react-router-dom";
import clsx from "clsx";
import * as styles from "../Auth.module.css";

const schema = yup.object().shape({
  email: yup.string().min(3).required("You must enter email/username/phone"),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(4, "Password is too short - should be 4 chars minimum."),
  // .max(50, 'Password is too Long - should be 50 chars maximum.')
});

const defaultValues = {
  email: "",
  password: "",
};

function ParentLogin(props) {
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
  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    if (login.success) {
      history.push("/");
    }
  }, [login.success, history]);

  useEffect(() => {
    if (login.errors) {
      setLoginError(login.errors);
    }
  }, [login.errors, loginError]);

  function onSubmit(model) {
    setLoginError(null);

    dispatch(submitParentLogin(model));
  }

  return (
    <div className="w-full">
      <form
        className="flex flex-col justify-center w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              type="text"
              error={!!errors.email}
              helperText={errors?.email?.message}
              label="Email"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                      user
                    </Icon>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              label="OTP"
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

        {loginError ? <Alert severity="error">{loginError}</Alert> : null}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="w-full mx-auto mt-12"
          aria-label="LOG IN"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          value="legacy"
          style={{ background: "#0B2572", color: "#ffffff" }}
        >
          Login
        </Button>
      </form>
      <div className={styles.dnttxt}>
        Don't have an account?
        <Link className={clsx(styles.signup, "font - normal")} to="/login">
          Signup
        </Link>
      </div>
    </div>
  );
}

export default ParentLogin;
