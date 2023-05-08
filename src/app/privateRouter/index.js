/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { getAuthToken, getUser } from "@fuse/utils/deps";
import { useDispatch, useSelector } from "react-redux";
import FuseLayout from "@fuse/core/FuseLayout";
import { setNavigation } from "app/store/fuse/navigationSlice";
import studentNavigationConfig from "app/fuse-configs/studentNavigationConfig";
import { MonetizationOn } from "@material-ui/icons";
import axios from "../axios/axiosInstanceStudent";

const { REACT_APP_URL_MONITORING_INERVAL } = process.env;

// let moniterURL = [];

export const PrivateRouter = () => {
  // const dispatch = useDispatch();

  // const history = useHistory();

  // const isAuthed = getAuthToken() || false;

  // useEffect(() => {
  //   detectRouterChange();
  //   if (isAuthed) {
  //     const user = getUser();

  //     if (user) {
  //       const role = JSON.parse(user).data?.role;
  //       if (role === "Recruiter") {
  //         dispatch(setNavigation(studentNavigationConfig));
  //       }
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   // const waitingDuration = parseInt(REACT_APP_URL_MONITORING_INERVAL, 10) * 1000 || 600000;
  //   const waitingDuration = 5000;
  //   const user = getUser();
  //   const interval = setInterval(() => {
  //     if (moniterURL.length > 0) {
  //       axios
  //         .post("/task/v1/saveURL", {
  //           data: [...moniterURL],
  //           UserSessionID: JSON.parse(user).data?.UserSessionID,
  //         })
  //         .then((response) => {
  //           moniterURL = [];
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }
  //   }, waitingDuration);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  // const detectRouterChange = useCallback(() => {
  //   history.listen((location, action) => {
  //     moniterURL.push({
  //       url: window.location.href,
  //       time: Math.floor(+new Date() / 1000),
  //     });
  //   });
  // }, []);

  // return isAuthed ? <FuseLayout /> : <Redirect to="/login" />;
  return <FuseLayout />;
};

export default PrivateRouter;
