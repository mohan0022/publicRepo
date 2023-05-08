import { fuseDark, skyBlue } from "@fuse/colors";
import { lightBlue, red } from "@material-ui/core/colors";

const lightText = {
  primary: "rgb(17, 24, 39)",
  secondary: "rgb(107, 114, 128)",
  disabled: "rgb(149, 156, 169)",
};

const darkText = {
  primary: "rgb(255,255,255)",
  secondary: "rgb(229, 231, 235)",
  disabled: "rgb(156, 163, 175)",
};

const themesConfig = {
  navbar: {
    palette: {
      type: "light",
      text: lightText,
      primary: {
        light: "#b3d1d1",
        main: "#0B2572",
        dark: "#003737",
      },
      secondary: {
        light: "#b3d1d1",
        main: "#FFC20D",
        dark: "#003737",
        contrastText: "#272727",
      },
      background: {
        paper: "#FFFFFF",
        default: "#FFFFFF",
      },
      error: red,
    },
    status: {
      danger: "orange",
    },
  },
  main: {
    palette: {
      type: "light",
      text: lightText,
      common: {
        black: "rgb(17, 24, 39)",
        white: "rgb(255, 255, 255)",
      },
      // primary: fuseDark,
      primary: {
        light: "#b3d1d1",
        main: "#0B2572",
        dark: "#EB6C10",
      },
      secondary: {
        light: "#b3d1d1",
        main: "#FFC20D",
        dark: "#EB6C10",
      },
      background: {
        paper: "#FFFFFF",
        default: "#FFFFFF",
      },
      error: red,
    },
    status: {
      danger: "orange",
    },
  },
  footer: {
    palette: {
      type: "light",
      text: lightText,
      primary: {
        light: "#b3d1d1",
        main: "#006565",
        dark: "#003737",
      },
      secondary: {
        light: "#ffecc0",
        main: "#FFBE2C",
        dark: "#ff9910",
        contrastText: "#272727",
      },
      background: {
        paper: "#FFFFFF",
        default: "#FAF6F3",
      },
      error: red,
    },
    status: {
      danger: "orange",
    },
  },
  default: {
    palette: {
      type: "light",
      text: lightText,
      common: {
        black: "rgb(17, 24, 39)",
        white: "rgb(255, 255, 255)",
      },
      primary: fuseDark,
      secondary: {
        light: "#b3d1d1",
        main: "#0B2572",
        dark: "#EB6C10",
      },
      background: {
        paper: "#FFFFFF",
        default: "#0B2572",
      },
      error: red,
    },
    status: {
      danger: "orange",
    },
  },
};

export default themesConfig;
