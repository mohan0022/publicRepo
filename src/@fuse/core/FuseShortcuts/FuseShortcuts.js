import { amber } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { selectFlatNavigation } from "app/store/fuse/navigationSlice";
import clsx from "clsx";
import { motion } from "framer-motion";
import { memo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateUserShortcuts } from "app/main/auth/store/userSlice";
import { Dialog, SvgIcon } from "@material-ui/core";
import { createBoobkmark, createNotes } from "@fuse/utils/deps";
import { showMessage } from "app/store/fuse/messageSlice";
import { useTranslation } from "react-i18next";
// import { AddBookmarkIcon } from '@fuse/utils/customIcons';

const useStyles = makeStyles((theme) => ({
  root: {
    "&.horizontal": {},
    "&.vertical": {
      flexDirection: "column",
    },
    "& > svg": {
      margin: theme.spacing(2),
    },
  },
  item: {
    textDecoration: "none!important",
    color: "inherit",
  },
  addIcon: {
    color: "#000",
  },
}));

function AddBookmarkIcon(props) {
  return (
    <SvgIcon {...props}>
      <path
        transform="translate(5,2)"
        d="M12 15V2H2V15L7 12.82L12 15ZM12 0C12.5304 0 13.0391 0.210714 13.4142 0.585786C13.7893 0.960859 14 1.46957 14 2V18L7 15L0 18V2C0 0.89 0.9 0 2 0H12ZM6 4H8V6H10V8H8V10H6V8H4V6H6V4Z"
        fill="black"
      />
    </SvgIcon>
  );
}

function FuseShortcuts(props) {
  const dispatch = useDispatch();
  const shortcuts = ["calendar", "mail", "contacts", "todo"];
  const navigation = [
    {
      id: "example-component",
      title: "Home",
      type: "item",
      icon: "whatshot",
      url: "/example",
      auth: null,
    },
    {
      id: "example-component",
      title: "Subject Dashboard",
      type: "item",
      icon: "whatshot",
      url: "/example",
      auth: null,
    },
    {
      id: "example-component",
      title: "Academy",
      type: "item",
      icon: "whatshot",
      url: "/example",
      auth: null,
    },
    {
      id: "example-component",
      title: "Reports & Analytics",
      type: "item",
      icon: "whatshot",
      url: "/example",
      auth: null,
    },
    {
      id: "example-component",
      title: "To-Do",
      type: "item",
      icon: "whatshot",
      url: "/example",
      auth: null,
    },
    {
      id: "example-component",
      title: "Notes",
      type: "item",
      icon: "whatshot",
      url: "/example",
      auth: null,
    },
    {
      id: "example-component",
      title: "Bookmarks",
      type: "item",
      icon: "whatshot",
      url: "/example",
      auth: null,
    },
    {
      id: "example-component",
      title: "Available Courses",
      type: "item",
      icon: "whatshot",
      url: "/example",
      auth: null,
    },
    {
      id: "example-component",
      title: "Blogs",
      type: "item",
      icon: "whatshot",
      url: "/example",
      auth: null,
    },
  ];
  const { t } = useTranslation();

  const classes = useStyles(props);
  const searchInputRef = useRef(null);
  const [addMenu, setAddMenu] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const shortcutItems = shortcuts
    ? shortcuts.map((id) => navigation.find((item) => item.id === id))
    : [];

  const [openBookmark, setOpenBookmark] = useState(false);
  const [openNote, setOpenNote] = useState(false);

  function addMenuClick(event) {
    setAddMenu(event.currentTarget);
  }

  async function addToBookmark(data) {
    delete data.id;
    delete data.time;
    data.archive = false;
    const response = await createBoobkmark(data);
    if (response.status) {
      setOpenBookmark(false);
      dispatch(
        showMessage({
          message: response.message,
          variant: "success",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
    } else {
      dispatch(
        showMessage({
          message: response.message,
          variant: "error",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
    }
  }

  async function addToNote(data) {
    delete data.id;
    delete data.time;
    data.archive = false;
    const response = await createNotes(data);
    if (response.status) {
      setOpenNote(false);
      dispatch(
        showMessage({
          message: response.message,
          variant: "success",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
    } else {
      dispatch(
        showMessage({
          message: response.message,
          variant: "error",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
    }
  }

  function addMenuClose() {
    setAddMenu(null);
  }

  function search(ev) {
    const newSearchText = ev.target.value;

    setSearchText(newSearchText);

    if (newSearchText.length !== 0 && navigation) {
      setSearchResults(
        navigation.filter((item) =>
          item.title.toLowerCase().includes(newSearchText.toLowerCase())
        )
      );
      return;
    }
    setSearchResults(null);
  }

  function toggleInShortcuts(id) {
    let newShortcuts = [...shortcuts];
    newShortcuts = newShortcuts.includes(id)
      ? newShortcuts.filter((_id) => id !== _id)
      : [...newShortcuts, id];
    dispatch(updateUserShortcuts(newShortcuts));
  }

  function ShortcutMenuItem({ item, onToggle }) {
    return (
      <Link to={item.url} className={classes.item} role="button">
        <MenuItem key={item.id}>
          <ListItemIcon className="min-w-40">
            {item.icon ? (
              <Icon>{item.icon}</Icon>
            ) : (
              <span className="text-20 font-semibold uppercase text-center">
                {item.title[0]}
              </span>
            )}
          </ListItemIcon>
          <ListItemText primary={item.title} />
          <IconButton
            onClick={(ev) => {
              ev.preventDefault();
              ev.stopPropagation();
              onToggle(item.id);
            }}
          >
            <Icon color="action">
              {shortcuts.includes(item.id) ? "star" : "star_border"}
            </Icon>
          </IconButton>
        </MenuItem>
      </Link>
    );
  }
  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.6 },
    show: { opacity: 1, scale: 1 },
  };

  return (
    <div
      className={clsx(
        classes.root,
        props.variant,
        "flex flex-1",
        props.variant === "vertical" && "flex-grow-0 flex-shrink",
        props.className
      )}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={clsx(
          "flex flex-1",
          props.variant === "vertical" && "flex-col"
        )}
      >
        {/* <Link to="/bookmark" className={classes.item} role="button"> */}
        <Tooltip
          title={t("CLICKTOADDBOOKMARK")}
          placement={props.variant === "horizontal" ? "bottom" : "left"}
        >
          <IconButton
            component={motion.div}
            variants={item}
            className="w-40 h-40 p-0"
            aria-owns={addMenu ? "add-menu" : null}
            aria-haspopup="true"
            onClick={() => setOpenBookmark(true)}
          >
            {/* <Icon className={classes.addIcon}>calendar_today</Icon> */}
            <AddBookmarkIcon />
          </IconButton>
        </Tooltip>
        {/* </Link> */}

        {/* <Tooltip
					title="Click to add/remove shortcut"
					placement={props.variant === 'horizontal' ? 'bottom' : 'left'}
				>
					<IconButton
						component={motion.div}
						variants={item}
						className="w-40 h-40 p-0"
						aria-owns={addMenu ? 'add-menu' : null}
						aria-haspopup="true"
						onClick={addMenuClick}
					>
						<Icon className={classes.addIcon}>portrait</Icon>
					</IconButton>
				</Tooltip> */}

        <Tooltip
          title={t("CLICKTOADDNOTE")}
          placement={props.variant === "horizontal" ? "bottom" : "left"}
        >
          <IconButton
            component={motion.div}
            variants={item}
            className="w-40 h-40 p-0"
            aria-owns={addMenu ? "add-menu" : null}
            aria-haspopup="true"
            onClick={() => setOpenNote(true)}
          >
            <Icon className={classes.addIcon}>insert_drive_file</Icon>
          </IconButton>
        </Tooltip>

        {/* <Tooltip
					title="Click to add/remove shortcut"
					placement={props.variant === 'horizontal' ? 'bottom' : 'left'}
				>
					<IconButton
						component={motion.div}
						variants={item}
						className="w-40 h-40 p-0"
						aria-owns={addMenu ? 'add-menu' : null}
						aria-haspopup="true"
						onClick={addMenuClick}
					>
						<Icon className={classes.addIcon}>bookmark_add</Icon>
					</IconButton>
				</Tooltip> */}

        {/* <Tooltip
					title="Click to add/remove shortcut"
					placement={props.variant === 'horizontal' ? 'bottom' : 'left'}
				>
					<IconButton
						component={motion.div}
						variants={item}
						className="w-40 h-40 p-0"
						aria-owns={addMenu ? 'add-menu' : null}
						aria-haspopup="true"
						onClick={addMenuClick}
					>
						<Icon className={classes.addIcon}>star</Icon>
					</IconButton>
				</Tooltip> */}
      </motion.div>

      <Menu
        id="add-menu"
        anchorEl={addMenu}
        open={Boolean(addMenu)}
        onClose={addMenuClose}
        classes={{
          paper: "mt-48 min-w-256",
        }}
        onEntered={() => {
          searchInputRef.current.focus();
        }}
        onExited={() => {
          setSearchText("");
        }}
      >
        <div className="p-16 pt-8">
          <Input
            inputRef={searchInputRef}
            value={searchText}
            onChange={search}
            placeholder="Search for an app or page"
            className=""
            fullWidth
            inputProps={{
              "aria-label": "Search",
            }}
            disableUnderline
          />
        </div>

        <Divider />

        {searchText.length !== 0 &&
          searchResults &&
          searchResults.map((_item) => (
            <ShortcutMenuItem
              key={_item.id}
              item={_item}
              onToggle={() => toggleInShortcuts(_item.id)}
            />
          ))}

        {searchText.length !== 0 && searchResults.length === 0 && (
          <Typography color="textSecondary" className="p-16 pb-8">
            No results..
          </Typography>
        )}

        {searchText.length === 0 &&
          shortcutItems.map(
            (_item) =>
              _item && (
                <ShortcutMenuItem
                  key={_item.id}
                  item={_item}
                  onToggle={() => toggleInShortcuts(_item.id)}
                />
              )
          )}
      </Menu>

      {/* <Dialog
        classes={{
          paper: "w-full m-24",
        }}
        // TransitionComponent={Transition}
        onClose={(ev) => setOpenBookmark(false)}
        open={openBookmark}
      >
        <AddBookmark
          bookmark={{
            title: "",
            description: window.location.href,
            labels: [],
            archive: false,
            link: window.location.href,
            image: "",
          }}
          addToBookmark={(value) => {
            addToBookmark(value);
          }}
        />
      </Dialog> */}

      {/* <Dialog
        classes={{
          paper: "w-full m-24",
        }}
        // TransitionComponent={Transition}
        onClose={(ev) => setOpenNote(false)}
        open={openNote}
      >
        <AddNotes
          note={{
            archive: false,
            checklist: [],
            description: window.getSelection().toString(),
            image: "",
            labels: [],
            time: null,
            title: "",
          }}
          addToNote={(value) => {
            addToNote(value);
          }}
        />
      </Dialog> */}
    </div>
  );
}

FuseShortcuts.propTypes = {};
FuseShortcuts.defaultProps = {
  variant: "horizontal",
};

export default memo(FuseShortcuts);
