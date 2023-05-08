import "@fake-db";
import { useSelector } from "react-redux";
import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    backgroundColor: "transparent",
  },
}));

const Root = () => {
  const classes = useStyles();
  const loading = useSelector(({ fuse }) => fuse.loading.state);

  return (
    <>
      <Backdrop id="common-loader" className={classes.backdrop} open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
    </>
  );
};

export default Root;
