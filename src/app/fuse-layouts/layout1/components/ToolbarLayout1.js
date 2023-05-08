import AppBar from "@material-ui/core/AppBar";
import Hidden from "@material-ui/core/Hidden";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

import GridViewIcon from "@mui/icons-material/GridView";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import { Divider } from "@material-ui/core";
import NavbarToggleButton from "app/fuse-layouts/shared-components/NavbarToggleButton";
import QuickPanelToggleButton from "app/fuse-layouts/shared-components/quickPanel/QuickPanelToggleButton";
import UserMenu from "app/fuse-layouts/shared-components/UserMenu";
import Navigation from "app/fuse-layouts/shared-components/Navigation";
import clsx from "clsx";
import { memo } from "react";
import { useSelector } from "react-redux";
import Logo from "app/fuse-layouts/shared-components/Logo";
import { selectToolbarTheme } from "app/store/fuse/settingsSlice";
import FuseShortcuts from "@fuse/core/FuseShortcuts";
import AdjustFontSize from "../../shared-components/AdjustFontSize";
import FullScreenToggle from "../../shared-components/FullScreenToggle";
import LanguageSwitcher from "../../shared-components/LanguageSwitcher";
import NotificationPanelToggleButton from "../../shared-components/notificationPanel/NotificationPanelToggleButton";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import GridViewIcon from '@mui/icons-material/GridView';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function ToolbarLayout(props) {
  const navbar = useSelector(({ fuse }) => fuse.navbar);
  const toolbarTheme = useSelector(selectToolbarTheme);

  const classes = useStyles(props);

  return (
    <ThemeProvider theme={toolbarTheme}>
      <AppBar
        id="fuse-toolbar"
        className={clsx(
          classes.root,
          "flex relative z-20 shadow-md",
          props.className
        )}
        color="secondary"
        style={{ backgroundColor: "#0B2572" }}
        position="static"
      >
        <Toolbar className="p-0 min-h-48 md:min-h-64">
          <div className="flex flex-1 px-16">
            {/* <HomeOutlinedIcon style={{width:"36px",height:"26px",position:'relative',left:"1068px"}}/> */}

            {/* <GridViewIcon style={{width:"36px",height:"26px",position:'relative',left:"1086px"}}/> */}
            {/* <WorkOutlineOutlinedIcon style={{width:"36px",height:"26px",position:'relative',left:"1097px"}}/> */}
            <Logo />
            {/* <>
              <Hidden mdDown>
                {!navbar.open && (
                  <NavbarToggleButton className="w-40 h-40 p-0 mx-0" />
                )}
              </Hidden>

              <Hidden lgUp>
                <NavbarToggleButton className="w-40 h-40 p-0 mx-0 sm:mx-8" />
              </Hidden>
            </> */}
            {/* <Hidden mdDown>
              <FuseShortcuts />
            </Hidden> */}
          </div>

          <div className="flex items-center px-8 h-full overflow-x-auto">
            <Navigation layout="vertical" />
            {/* <LanguageSwitcher /> */}
            {/* <Divider
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                height: "28px",
                width: "3px",
                margin: "0px 10px",
              }}
            /> */}
            {/* <NotificationPanelToggleButton /> */}

            {/* <UserMenu /> */}
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default memo(ToolbarLayout);
