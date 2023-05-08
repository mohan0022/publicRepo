/* eslint-disable react-hooks/exhaustive-deps */
import FuseDialog from "@fuse/core/FuseDialog";
import FuseMessage from "@fuse/core/FuseMessage";
import FuseSuspense from "@fuse/core/FuseSuspense";
import { getUser } from "@fuse/utils/deps";
import { makeStyles } from "@material-ui/core/styles";
import { setUserData } from "app/main/auth/store/userSlice";
import clsx from "clsx";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { renderRoutes } from "react-router-config";
import i18n from "i18n";
import { changeLanguage } from "app/store/i18nSlice";
import {
  selectNavigation,
  setActiveRoute,
} from "app/store/fuse/navigationSlice";
import { useLocation } from "react-router-dom";
import routes from "app/fuse-configs/routesConfig";
import FooterLayout1 from "./components/FooterLayout1";
import NavbarWrapperLayout1 from "./components/NavbarWrapperLayout1";
import RightSideLayout1 from "./components/RightSideLayout1";
import ToolbarLayout1 from "./components/ToolbarLayout1";

const useStyles = makeStyles((theme) => ({
  root: {
    "&.boxed": {
      clipPath: "inset(0)",
      maxWidth: (props) => `${props.config.containerWidth}px`,
      margin: "0 auto",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
    "&.container": {
      "& .container": {
        maxWidth: (props) => `${props.config.containerWidth}px`,
        width: "100%",
        margin: "0 auto",
      },
    },
  },
}));

function Layout1(props) {
  const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
  const navigation = useSelector(selectNavigation);
  const role = useSelector(({ auth }) => auth.user.data.role);
  const classes = useStyles({ ...props, config });
  const dispatch = useDispatch();
  const location = useLocation();

  // useEffect(() => {
  //   const user = getUser();

  //   dispatch(setUserData(JSON.parse(user)));
  // }, []);

  const [activeRoute, setActiveRote] = useState([]);

  useEffect(() => {
    // if (role === "Student") {
    setActiveRote(routes);
    // } else if (role === "Teacher") {
    //   setActiveRote(teacherRoutes);
    // } else if (role === "Institution") {
    //   setActiveRote(instituteRoutes);
    // }
  }, [role]);

  useEffect(() => {
    const languageId = i18n.language || window.localStorage.i18nextLng || "en";
    dispatch(changeLanguage("aa"));
    dispatch(changeLanguage(languageId));
  }, []);

  useEffect(() => {
    navigation &&
      navigation.forEach((item) => {
        if (location.pathname.includes(item.url))
          dispatch(setActiveRoute(item));
      });
  }, [location, navigation]);

  return (
    <div
      id="fuse-layout"
      className={clsx(classes.root, config.mode, "w-full flex")}
    >
      <div id="side-content" className="flex flex-auto min-w-0">
        {/* <NavbarWrapperLayout1 /> */}

        <main
          id="fuse-main"
          className="flex flex-col flex-auto min-h-screen min-w-0 relative z-10"
        >
          <ToolbarLayout1 className="sticky top-0" />

          <div
            id="main-content"
            className="flex flex-col flex-auto min-h-0 relative z-10"
          >
            <FuseDialog />

            <FuseSuspense>{renderRoutes(activeRoute)}</FuseSuspense>
          </div>

          {/* <FooterLayout1 className="sticky bottom-0" /> */}
        </main>
      </div>

      <RightSideLayout1 />
      <FuseMessage />
    </div>
  );
}

export default memo(Layout1);
