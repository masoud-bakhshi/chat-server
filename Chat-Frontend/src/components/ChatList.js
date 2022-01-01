import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import {
  Paper,
  withStyles,
  makeStyles,
  Grid,
  Divider,
  TextField,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  List,
  Badge,
  Typography,
} from "@material-ui/core";
import Fade from "react-reveal/Fade";
// import { multiStepContext } from "../projectcard/AddProject/StepContext";
import ChatDialog from "./Dialog/ChatDialog";
import LinearProgress from "@material-ui/core/LinearProgress";
import Axios from "axios";
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  rootp: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
      // paddingRight: theme.spacing(2),
    },
  },
  font3: {
    color: "#ffff",
  },
  font4: {
    color: "#112233",
  },
  font1: {
    borderColor: "rgb(17, 236, 229)",
    color: "rgb(17, 236, 229)",
  },
  font2: {
    color: "#c6d3e7",
  },
  chatSection: {
    backgroundColor: "#f5f5f5",
    width: "70%",
    height: "80vh",
    // borderRadius: 10,
    margin: 0,
    [theme.breakpoints.down("650")]: {
      marginLeft: "5px",
      marginRight: "5px",
      width: "98%",
    },
  },
  typeSection: {
    backgroundColor: "#f5f5f5",
    width: "70%",

    // borderRadius: 10,
    margin: 0,
    [theme.breakpoints.down("650")]: {
      marginLeft: "5px",
      marginRight: "5px",
      width: "98%",
    },
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    backgroundColor: "#ededed",
    height: "70vh",
    overflowY: "auto",
    // borderRadius: 10,
  },
  main: {
    background: "#112233",
  },
}));
const ValidationTextField = withStyles({
  root: {
    "& input:valid + fieldset": {
      borderColor: "rgb(17, 236, 229)",
      Color: "rgb(17, 236, 229)",
      borderWidth: 2,
    },
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 2,
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 4,
      padding: "4px !important", /// override inline-style
    },
  },
})(TextField);

export default function ChatList({ payload }) {
  const [progress, setProgress] = useState(true);
  const [firstUser] = useState(payload["firstUser"]);
  const [secondUser] = useState(payload["secondUser"]);

  const classes = useStyles();
  const [pay, setPay] = useState([]);
  const [checkI, setCheckI] = useState(true);
  const [checkB, setCheckB] = useState(false);

  const [room] = useState(
    firstUser < secondUser ? firstUser + secondUser : secondUser + firstUser
  );

  const [dataR, setDataR] = useState({
    name: firstUser,
    secondUser: secondUser,
    room: room,
  });

  const getChatRoomPage = (
    room,
    firstUser,
    secondUser,
    setPay,
    setProgress
  ) => {
    try {
      Axios.defaults.withCredentials = true;

      Axios.post("http://" + "localhost" + ":" + "3001" + "/chatroom", {
        room: room,
        firstuser: firstUser,
        seconduser: secondUser,
      })
        .then((response) => {
          setPay(response.data.result);
          setProgress(false);
        })
        .catch((error) => {});
    } catch (error) {}
  };

  //************************************************************************************************************************************** */
  function getChatRoom() {
    try {
      getChatRoomPage(room, firstUser, secondUser, setPay, setProgress);
    } catch (error) {}
  }

  useEffect(() => {
    getChatRoom();
  }, []);
  useEffect(() => {
    if (checkB) {
      setCheckI(true);
      setCheckB(false);
    }
  }, [dataR]);
  const chatListButt = (roomClick) => () => {
    setCheckB(true);
    setCheckI(false);
    setDataR({
      name: firstUser,
      secondUser: roomClick.replace(firstUser, ""),
      room: roomClick,
    });
  };

  return (
    <div>
      {progress ? (
        <div className={classes.rootp} align="center">
          <Typography variant="h6" gutterBottom>
            Please wait ...
          </Typography>
          <LinearProgress />
          <Typography variant="h6" gutterBottom>
            List of Chat is loading
          </Typography>
        </div>
      ) : null}
      {!progress && (
        <div>
          <div>
            <div style={{ direction: "ltr" }} className={classes.typeSection}>
              <Typography variant="overline" display="block" gutterBottom>
                *. For startting chat with someone, you need to click on avatar.
              </Typography>
            </div>
            <Grid container component={Paper} className={classes.chatSection}>
              <Grid item xs={12} className={classes.borderRight500}>
                <List className={classes.main}>
                  <ListItem button key={firstUser}>
                    <ListItemIcon>
                      <Avatar alt={firstUser} src="/assets/img/av2.jpg" />
                    </ListItemIcon>
                    <ListItemText
                      primary={firstUser.split("@", 1)}
                      className={classes.font3}
                    ></ListItemText>
                  </ListItem>
                </List>
                <Divider />

                <Divider />
                <List>
                  {pay !== "no result"
                    ? pay.map((data) => (
                        <Fade>
                          <ListItem
                            button
                            key={data.id}
                            onClick={chatListButt(data.room)}
                          >
                            <ListItemIcon>
                              <Avatar
                                alt={firstUser}
                                src="/assets/img/av2.jpg"
                              />
                            </ListItemIcon>

                            <ListItemText
                              primary={data.room
                                .replace(firstUser, "")
                                .split("@", 1)}
                              className={classes.font4}
                            >
                              {data.room.replace(secondUser, "").split("@", 1)}
                            </ListItemText>

                            <Badge badgeContent={1} color="secondary">
                              <ListItemText
                                secondary=" "
                                align="right"
                                classes={{ secondary: classes.font2 }}
                              ></ListItemText>
                            </Badge>
                          </ListItem>
                          <Divider />
                        </Fade>
                      ))
                    : null}
                </List>
              </Grid>
            </Grid>
          </div>

          {checkI ? (
            <ChatDialog {...dataR} open={checkI} setOpen={setCheckI} />
          ) : null}
        </div>
      )}
    </div>
  );
}
