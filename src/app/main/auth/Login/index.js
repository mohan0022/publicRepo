import { Grow } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { darken } from "@material-ui/core/styles/colorManipulator";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import Root from "app/Root";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { motion } from "framer-motion";
import { useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import ParenttLogin from "./ParentLogin";
import StudentLogin from "./StudentLogin";
import * as styles from "../Auth.module.css";
import { changeTab } from "../store/loginSlice";

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
  indicator: {
    backgroundColor: "#0D2C83",
    opacity: 0.5,
  },
}));

function Login({ children }) {
  const classes = useStyles();
  const login = useSelector(({ auth }) => auth.login);
  const [selectedTab, setSelectedTab] = useState(0);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // console.log(login);
  function handleTabChange(event, value) {
    dispatch(changeTab(value));
  }

  return (
    <div
      className={clsx(
        classes.root,
        "flex flex-row flex-auto items-center justify-center flex-shrink-0"
      )}
    >
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        className={clsx("flex w-full h-full", styles.wrap)}
      >
        <div
          style={{
            backgroundImage: `url("assets/images/myslate/loginbg.png")`,
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className={styles.leftSection}
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            >
              <div className={styles.leftText}>
                <img
                  className={clsx(styles.logo)}
                  src="assets/images/myslate/Talentely Logo.png"
                  alt="logo"
                />
                <p className={styles.welcometxt}>Welcome to</p>
                <h1>Talentely</h1>
                <p className={styles.introtxt}>
                  The future depends on what you do today. Get started with the
                  best career opportunities
                </p>
              </div>
            </motion.div>

            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
            >
              <Typography variant="subtitle1" color="inherit" className="mt-32">
                {t("MAINTITLE")}
              </Typography>
            </motion.div> */}
          </div>
        </div>
        <Card
          className={clsx(
            styles.rightSection,
            "items-center justify-center shadow-0"
          )}
          square
        >
          <CardContent
            className={`${styles.loginContainer} items-center justify-center py-96`}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
            />

            {/* <Grow in>
              <Tabs
                classes={{ indicator: classes.indicator }}
                // action={ref => {
                // 	return ref.updateIndicator();
                // }}
                centered
                onChange={handleTabChange}
                variant="fullWidth"
                className="w-full mb-32"
                value={selectedTab}
                indicatorColor="primary"
              >
                <Tab
                  className="min-w-0"
                  label="Recruiter Login"
                  style={{ color: "#0D2C83" }}
                  disabled
                />
                <Tab
                  className="min-w-0"
                  label="College Login"
                  style={{ color: "#0D2C83" }}
                  disabled
                />
              </Tabs>
            </Grow> */}
            {children}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default Login;
