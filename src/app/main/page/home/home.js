import React, { useEffect, useState } from "react";
import "./Home.css";
import {
  TextField,
  Container,
  makeStyles,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Card,
  Typography,
  Button,
  CardActions,
  CardContent,
  Grow,
  Checkbox,
  Chip,
  Grid,
  styled,
  Paper,
  InputAdornment,
  IconButton,
  Icon,
  TableContainer,
  TableHead,
  TableCell,
  Table,
  TableRow,
  TableBody,
} from "@material-ui/core";
// import Grid from "@material-ui/core/Grid";

import clsx from "clsx";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Box from "@mui/material/Box";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import axios from "../../../axios/axiosInstanceStudent";

// import { GetApp } from "@material-ui/icons";
// import axios from '../../../axios/axiosInstanceStudent';
// import Navbar from './navbar';

const useStyles = makeStyles((theme) => ({
  SearchBox: {
    width: "800px",
    height: "150px",
    background: "hsla(0,0%,100%,.8)",
    border: "2px solid #fff",
    boxShadow: "0 5px 20px rgb(112 144 176/28%)!important",
    borderRadius: "8px",
    padding: "20px",
    // margin: "0px !important",
    maxWidth: "calc(100% - 20px) !important",
    margin: "10px",
  },

  SearchField: {
    fontSize: "18px",
    fontWeight: "500",
    width: "60%",
    "& fieldset": {
      border: "none",
      outline: "none",
    },
    "& input::placeholder": {
      fontSize: "15px",
    },
  },
  SearchBtn: {
    background: "#FFC113",
    fontSize: "1.5rem",
    padding: "0px 27px",
    height: "40px",
    "&:hover": {
      backgroundColor: "#d7a61e !important",
      background: "#d7a61e !important",
    },
  },
  thead: {
    "& th": {
      fontSize: "15px",
    },
  },
  tbody: {
    "& td": {
      fontSize: "14px",
    },
  },
  profilelink: {
    textDecoration: "underline",
    color: "rgb(11, 37, 114)",
    cursor: "pointer",
    "&:hover": {
      fontWeight: "500",
    },
  },
}));
// xs={12} sm={4} md={2}
const dataDropdown = ["A", "B"];

function FirstTab() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [StudentDetails, setStudentDetails] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStudentDetails([
        {
          studentName: "engg student",
          rollno: "45",
          college: "zxc college",
          degree: "BE",
          department: "CSE",
          link: "7377hjg2382",
        },
        {
          studentName: "demo student",
          rollno: "10",
          college: "abc college",
          degree: "BE",
          department: "CSE",
          link: "7377hjg2382",
        },
        {
          studentName: "rudra",
          rollno: "18",
          college: "qwe college",
          degree: "BE",
          department: "CSE",
          link: "7377hjg2382",
        },
        {
          studentName: "gowsi",
          rollno: "07",
          college: "mnb  college",
          degree: "BE",
          department: "CSE",
          link: "7377hjg2382",
        },
        {
          studentName: "sasi",
          rollno: "15",
          college: "lkj college",
          degree: "BE",
          department: "CSE",
          link: "7377hjg2382",
        },
      ]);
    }, 3000);
  }, []);

  const searchStudent = () => {
    console.log(search, "searchStudent");
    const regex = /^[a-zA-Z]+$/;
    if (regex.test(search)) {
      console.log("need to show table");
    } else if (search) {
      console.log("navigate to student profile page");
    }
    // if(search?.includes())
  };

  return (
    <>
      <div>
        <Grid
          style={{
            minHeight:
              StudentDetails?.length > 0 ? "auto" : "calc(100vh - 64px)",
            justifyContent: "center",
            flexDirection: "column",
            margin: StudentDetails?.length > 0 && "40px 0px",
            alignItems: "center",
            transition: "0.5s",
            transitionProperty: "margin-bottom",
          }}
          container
        >
          <Typography
            style={{
              fontSize: "35px",
              fontWeight: "300",
              maxWidth: "700px",
              width: "100%",
              marginBottom: "15px",
              padding: "10px",
            }}
          >
            Your time-sensitive consignments are delivered the next day on a
            priority basis
          </Typography>
          <Box className={classes.SearchBox}>
            <Typography style={{ fontSize: "16px", fontWeight: "500" }}>
              Search Students
            </Typography>
            <Grid
              container
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "5px",
              }}
            >
              <TextField
                className={classes.SearchField}
                variant="outlined"
                id="searchfield"
                placeholder="Enter Student Unique ID"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    document.getElementById("searchbutton").click();
                  }
                }}
                autoFocus
              />
              <Button
                id="searchbutton"
                onClick={searchStudent}
                className={classes.SearchBtn}
              >
                Search
              </Button>
            </Grid>
            {/* <input type="text" /> */}
          </Box>
        </Grid>

        {StudentDetails?.length > 0 && (
          <div style={{ padding: "20px", maxWidth: "1400px", margin: "auto" }}>
            <TableContainer
              style={{
                border: "1px solid #dbdfec",
                borderRadius: "10px",
              }}
            >
              <Table>
                <TableHead
                  className={classes.thead}
                  style={{ fontSize: "15px" }}
                >
                  <TableRow>
                    <TableCell
                      style={{
                        borderRadius: "10px 0px 0px",
                        background: "#dbdfec",
                      }}
                    >
                      Student name
                    </TableCell>
                    <TableCell style={{ background: "#dbdfec" }}>
                      Roll Number
                    </TableCell>
                    <TableCell style={{ background: "#dbdfec" }}>
                      College Name
                    </TableCell>
                    <TableCell style={{ background: "#dbdfec" }}>
                      Degree
                    </TableCell>
                    <TableCell style={{ background: "#dbdfec" }}>
                      Department
                    </TableCell>
                    <TableCell
                      style={{
                        borderRadius: "0px 10px 0px 0px",
                        background: "#dbdfec",
                      }}
                    >
                      View details
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className={classes.tbody}>
                  {StudentDetails?.map((ele, index) => {
                    return (
                      <TableRow style={{ fontSize: "14px" }}>
                        <TableCell>{ele?.studentName}</TableCell>
                        <TableCell>{ele?.rollno}</TableCell>
                        <TableCell>{ele?.college}</TableCell>
                        <TableCell>{ele?.degree}</TableCell>
                        <TableCell>{ele?.department}</TableCell>
                        <TableCell className={classes.profilelink}>
                          {ele?.link}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </>
  );
}

export default FirstTab;
