import appsConfigs from "app/main/page/appsConfigs";

import React from "react";
import { Redirect } from "react-router-dom";
import FuseUtils from "@fuse/utils";
import { getUser } from "@fuse/utils/deps";

const routeConfigs = [...appsConfigs];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),

  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/home" />,
  },
  {
    component: () => <Redirect to="/error" />,
  },
  // {
  // 	component: () => <Redirect to="/error" />
  // }
];

export default routes;
