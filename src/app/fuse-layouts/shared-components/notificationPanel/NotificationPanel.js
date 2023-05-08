import FuseScrollbars from "@fuse/core/FuseScrollbars";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import withReducer from "app/store/withReducer";
import { useSnackbar } from "notistack";
import { useEffect, memo } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useLocation } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { useHistory } from "react-router";
import * as moment from "moment";

import Button from "@material-ui/core/Button";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Grid } from "@material-ui/core";
import {
  clearActiveTestDetails,
  setActiveTestDetails,
} from "app/main/auth/store/userSlice";
import NotificationModel from "./model/NotificationModel";
import NotificationCard from "./NotificationCard";
import NotificationTemplate from "./NotificationTemplate";
import {
  getNotifications,
  addNotification,
  dismissAll,
  dismissItem,
} from "./store/dataSlice";
import reducer from "./store";
import {
  closeNotificationPanel,
  toggleNotificationPanel,
} from "./store/stateSlice";
import axios from "../../../axios/axiosInstanceStudent";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 345,
  },
  roots: {
    maxWidth: 345,
  },
}));

let displayed = [];

const storeDisplayed = (id) => {
  displayed = [...displayed, id];
};

const removeDisplayed = (id) => {
  displayed = [...displayed.filter((key) => id !== key)];
};

function NotificationPanel(props) {
  const classes = useStyles();

  const { t } = useTranslation();
  const history = useHistory();

  const location = useLocation();
  const dispatch = useDispatch();
  const state = useSelector(({ notificationPanel }) => notificationPanel.state);
  // const notifications = useSelector(selectNotifications);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const store = useStore();

  const taskID = store?.getState().auth?.user?.activeTestDetails?.TaskID;
  const courseID = store?.getState().auth?.user?.activeTestDetails?.CourseID;

  const type = "test";

  const taskName = store?.getState().auth?.user?.activeTestDetails?.TaskName;

  const timeRemaining =
    store?.getState().auth?.user?.activeTestDetails?.RemainingTime;

  const testDuration =
    store?.getState().auth?.user?.activeTestDetails?.TotalDuration;

  // useEffect(() => {
  // 	/*
  // 	Get Notifications from db
  // 	 */
  // 	dispatch(getNotifications());

  // 	/*
  // 	Add Notifications for demonstration
  // 	 */
  // 	function createNotification(obj) {
  // 		dispatch(addNotification(NotificationModel(obj)));
  // 	}

  // 	setTimeout(
  // 		() => createNotification({ message: 'Great Job! this is awesome.', options: { variant: 'success' } }),
  // 		4000
  // 	);

  // 	setTimeout(
  // 		() => createNotification({ message: 'Hey there is a problem!', options: { variant: 'error' } }),
  // 		6000
  // 	);

  // 	setTimeout(
  // 		() => createNotification({ message: 'There might be a problem here!', options: { variant: 'warning' } }),
  // 		8000
  // 	);

  // 	setTimeout(
  // 		() => createNotification({ message: 'This is some general information.', options: { variant: 'info' } }),
  // 		10000
  // 	);
  // }, [dispatch]);

  // useEffect(() => {
  // 	notifications.forEach(item => {
  // 		const { id: key, message, options = {}, dismissed = false } = item;

  // 		if (dismissed) {
  // 			// dismiss snackbar using notistack
  // 			closeSnackbar(key);
  // 			return;
  // 		}
  // 		// do nothing if snackbar is already displayed
  // 		if (displayed.includes(key)) {
  // 			return;
  // 		}

  // 		// display snackbar using notistack
  // 		enqueueSnackbar(message, {
  // 			key,
  // 			...options,
  // 			// autoHideDuration: 3000,
  // 			content: () => (
  // 				<NotificationTemplate
  // 					item={item}
  // 					onClose={() => {
  // 						closeSnackbar(key);
  // 						dispatch(dismissItem(key));
  // 					}}
  // 				/>
  // 			),
  // 			onClose: (event, reason, myKey) => {
  // 				if (options.onClose) {
  // 					options.onClose(event, reason, myKey);
  // 				}
  // 			},
  // 			onExited: (event, myKey) => {}
  // 		});

  // 		// keep track of snackbars that we've displayed
  // 		storeDisplayed(key);
  // 	});
  // }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);

  useEffect(() => {
    // alert('poli');
    // // dispatch(getNotifications());
    axios.get("/common/v1/notification").then((res) => {
      if (res?.data?.body?.activeTestDetails?.TestSessionID == null) {
        dispatch(clearActiveTestDetails(null));
        // dispatch(quitTest());
      } else {
        dispatch(setActiveTestDetails(res?.data?.body?.activeTestDetails));
      }
    });
  }, []);

  useEffect(() => {
    if (state) {
      dispatch(closeNotificationPanel());
    }
    // eslint-disable-next-line
  }, [location, dispatch]);

  function handleClose() {
    dispatch(closeNotificationPanel());
  }

  function handleDismiss(id) {
    dispatch(dismissItem(id));
  }
  function handleDismissAll() {
    dispatch(dismissAll());
  }

  function onResumeTest() {
    localStorage.setItem("reload", true);
    setTimeout(() => {
      history.replace(`/test/${type}/${courseID}/${taskID}`);
    }, 1000);
  }

  return (
    <SwipeableDrawer
      classes={{ paper: clsx(classes.root) }}
      open={state}
      anchor="right"
      onOpen={(ev) => {}}
      onClose={(ev) => dispatch(toggleNotificationPanel())}
      disableSwipeToOpen
    >
      <IconButton
        className="m-4 absolute top-0 right-0 z-999"
        onClick={handleClose}
      >
        <Icon color="action">close</Icon>
      </IconButton>
      {/* {notifications.length > 0 ? (
				<FuseScrollbars className="p-16">
					<div className="flex flex-col">
						<div className="flex justify-between items-end pt-136 mb-36">
							<Typography className="text-28 font-semibold leading-none">Notifications</Typography>
							<Typography
								className="text-12 underline cursor-pointer"
								color="secondary"
								onClick={handleDismissAll}
							>
								dismiss all
							</Typography>
						</div>
						{notifications.map(item => (
							<NotificationCard key={item.id} className="mb-16" item={item} onClose={handleDismiss} />
						))}
					</div>
				</FuseScrollbars>
			) : (
				<div className="flex flex-1 items-center justify-center p-16">
					<Typography className="text-24 text-center" color="textSecondary">
						There are no notifications for now.
					</Typography>
				</div>
			)} */}

      <FuseScrollbars className="p-16">
        <div className="flex flex-col">
          <div className="flex justify-between items-end pt-0 mb-36">
            <Typography className="text-28 font-semibold leading-none">
              {t("NOTIFICATIONS")}
            </Typography>
            {/* <Typography
							className="text-12 underline cursor-pointer"
							color="secondary"
							onClick={handleDismissAll}
						>
							dismiss all
						</Typography> */}
          </div>
          {/* {notifications.map(item => (
							<NotificationCard key={item.id} className="mb-16" item={item} onClose={handleDismiss} />
						))} */}

          <div className="mb-16">
            {courseID && taskID && (
              <Card className={classes.roots}>
                <CardActionArea>
                  {/* <CardMedia
									component="img"
									alt="Contemplative Reptile"
									height="140"
									image="/static/images/cards/contemplative-reptile.jpg"
									title="Contemplative Reptile"
								/> */}
                  <CardContent>
                    {/* <Typography gutterBottom variant="h6" component="h2">
											Test
										</Typography> */}

                    <Typography variant="h6" component="h2">
                      {taskName}{" "}
                    </Typography>

                    <Grid container spacing={3} className="pt-16">
                      <Grid item xs={6}>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {t("TESTDURATION")}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {moment.utc(testDuration * 1000).format("HH:mm:ss")}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {t("TESTREMAINING")}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {moment.utc(timeRemaining * 1000).format("HH:mm:ss")}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    onClick={() => onResumeTest()}
                    size="small"
                    variant="contained"
                    color="primary"
                    disableElevation
                  >
                    {t("RESUMETEST")}
                  </Button>
                  {/* <Button size="small" color="secondary">
										{t('ENDTEST')}
									</Button> */}
                </CardActions>
              </Card>
            )}
          </div>
        </div>
      </FuseScrollbars>
    </SwipeableDrawer>
  );
}

export default withReducer(
  "notificationPanel",
  reducer
)(memo(NotificationPanel));
