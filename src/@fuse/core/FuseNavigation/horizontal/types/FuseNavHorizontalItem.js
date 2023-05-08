import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { Divider } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import { withRouter } from "react-router-dom";
import FuseNavBadge from "../../FuseNavBadge";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    minHeight: 48,
    paddingBottom: "0px",
    "& .fuse-list-item-divider": {
      margin: "0px 0px 0px 8px",
      width: "100%",
      height: "3px",
    },
    "&.active": {
      // backgroundColor: `${theme.palette.secondary.main}!important`,
      "& .fuse-list-item-divider": {
        backgroundColor: `${theme.palette.secondary.main}!important`,
      },
      color: `${theme.palette.secondary.main}!important`,
      pointerEvents: "none",
      "& .fuse-list-item-text-primary": {
        color: "inherit",
      },
      "& .fuse-list-item-icon": {
        color: "inherit",
      },
    },
    "& .fuse-list-item-icon": {
      color: "rgb(255,255,255)",
    },
    "& .fuse-list-item-text": {
      padding: "0 0 0 16px",
    },
    color: theme.palette.text.primary,
    textDecoration: "none!important",
  },
}));

function FuseNavHorizontalItem(props) {
  const classes = useStyles(props);
  const { item } = props;
  return useMemo(
    () => (
      <ListItem
        button
        component={NavLinkAdapter}
        to={item.url}
        activeClassName="active"
        className={clsx("fuse-list-item", classes.root)}
        exact={item.exact}
      >
        {item.icon && (
          <Icon
            className={clsx(
              "fuse-list-item-icon text-20 flex-shrink-0",
              item.iconClass
            )}
            color="action"
          >
            {item.icon}
          </Icon>
        )}

        <ListItemText
          className="fuse-list-item-text"
          primary={item.title}
          classes={{ primary: "text-16 fuse-list-item-text-primary" }}
        />
        <Divider className="fuse-list-item-divider" />
        {item.badge && (
          <FuseNavBadge className="ltr:ml-8 rtl:mr-8" badge={item.badge} />
        )}
      </ListItem>
    ),
    [
      classes.root,
      item.badge,
      item.exact,
      item.icon,
      item.iconClass,
      item.title,
      item.url,
    ]
  );
}

FuseNavHorizontalItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    icon: PropTypes.string,
    url: PropTypes.string,
  }),
};

FuseNavHorizontalItem.defaultProps = {};

const NavHorizontalItem = withRouter(memo(FuseNavHorizontalItem));

export default NavHorizontalItem;
