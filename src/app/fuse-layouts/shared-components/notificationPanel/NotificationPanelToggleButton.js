import Badge from "@material-ui/core/Badge";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import { useSelector, useDispatch, useStore } from "react-redux";
import withReducer from "app/store/withReducer";
import { useState, useEffect } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Popover from "@material-ui/core/Popover";
import { ListItemText } from "@material-ui/core";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import reducer from "./store";

// import { selectNotifications } from './store/dataSlice';
import { toggleNotificationPanel } from "./store/stateSlice";

function NotificationPanelToggleButton(props) {
  const user = useSelector(({ auth }) => auth.user);
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const history = useHistory();

  const store = useStore();

  const taskID = user?.activeTestDetails?.TaskID;

  const [isNotification, setIsNotification] = useState(false);

  const courseID = user?.activeTestDetails?.CourseID;

  const [menu, setMenu] = useState(null);

  const NotificationMenuClose = () => {
    setMenu(null);
  };

  // const NotificationMenuClick = event => {
  // 	setMenu(event.currentTarget);
  // };

  return (
    <>
      {/* onClick={ev => dispatch(toggleNotificationPanel())} */}
      {/* onClick={NotificationMenuClick} */}
      {/* {taskID} */}

      <IconButton
        className="w-40 h-40"
        onClick={(ev) => dispatch(toggleNotificationPanel())}
      >
        <Badge color="default" variant="dot" invisible={!taskID}>
          {props.children}
        </Badge>
      </IconButton>
    </>
  );
}

NotificationPanelToggleButton.defaultProps = {
  children: <Icon style={{color:'#FFFFFF'}}>notifications</Icon>,
};

export default withReducer(
  "notificationPanel",
  reducer
)(NotificationPanelToggleButton);
