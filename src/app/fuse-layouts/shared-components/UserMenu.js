// import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Popover from "@material-ui/core/Popover";
import { Avatar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { removeAuthToken, removeUser } from "@fuse/utils/deps";
import { logoutUser } from "app/main/auth/store/userSlice";
import { showMessage } from "app/store/fuse/messageSlice";
import axios from "../../axios/axiosInstanceStudent";

function UserMenu(props) {
  const history = useHistory();

  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);

  const [userMenu, setUserMenu] = useState(null);

  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };
  const logout = () => {
    // setUserMenu(null);

    axios
      .post("/user/v1/logout", { UserSessionID: user.data.UserSessionID })
      .then((response) => {
        removeAuthToken();
        removeUser();
        dispatch(logoutUser());

        // removeAuthToken();
        localStorage.clear();
        // history.push('/login');
      })
      .catch((error) => {
        dispatch(
          showMessage({
            message: "Oops something went wrong",
            variant: "error",
            autoHideDuration: 3000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          })
        );
      });
  };

  return (
    <>
      <Button
        className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6"
        onClick={userMenuClick}
        style={{ paddingRight: "2.3rem" }}
      >
        {/* <div className="hidden md:flex flex-col mx-4 items-end">
          <Typography component="span" className="font-semibold flex">
            {user.data.displayName}
          </Typography>
          <Typography
            className="text-11 font-medium capitalize"
            color="textSecondary"
          >
            {user.data.role.toString()}
          </Typography>
        </div> */}

        {user?.data?.photoURL ? (
          <Avatar alt="user photo" src={user.data.photoURL} />
        ) : (
          <Avatar className="md:mx-4">{user?.displayName?.[0]}</Avatar>
        )}
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        classes={{
          paper: "py-8",
        }}
      >
        {!user?.role || user?.role?.length === 0 ? (
          <>
            <MenuItem onClick={logout}>
              <ListItemIcon className="min-w-40">
                <Icon>exit_to_app</Icon>
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>

            {/* <MenuItem component={Link} to="/login" role="button">
							<ListItemIcon className="min-w-40">
								<Icon>lock</Icon>
							</ListItemIcon>
							<ListItemText primary="Login" />
						</MenuItem>
						<MenuItem component={Link} to="/register" role="button">
							<ListItemIcon className="min-w-40">
								<Icon>person_add</Icon>
							</ListItemIcon>
							<ListItemText primary="Register" />
						</MenuItem> */}
          </>
        ) : (
          <>
            <MenuItem
              component={Link}
              to="/pages/profile"
              onClick={userMenuClose}
              role="button"
            >
              <ListItemIcon className="min-w-40">
                <Icon>account_circle</Icon>
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </MenuItem>
            <MenuItem
              component={Link}
              to="/apps/mail"
              onClick={userMenuClose}
              role="button"
            >
              <ListItemIcon className="min-w-40">
                <Icon>mail</Icon>
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </MenuItem>
            <MenuItem
              onClick={() => {
                // dispatch(logoutUser());
                userMenuClose();
              }}
            >
              <ListItemIcon className="min-w-40">
                <Icon>exit_to_app</Icon>
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
          </>
        )}
      </Popover>
    </>
  );
}

export default UserMenu;
