import { lazy } from "react";

const homeAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/home",
      component: lazy(() => import("./home")),
    },
  ],
};

export default homeAppConfig;
