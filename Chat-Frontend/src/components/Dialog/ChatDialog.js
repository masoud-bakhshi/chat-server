import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
  Avatar,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Paper,
  InputLabel,
  InputAdornment,
  FormControl,
  IconButton,
  Input,
  Box,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import SendIcon from "@material-ui/icons/Send";
import { Link } from "react-router-dom";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },

  dialogPaper: {
    overflowX: "hidden",
    minWidth: 600,
    minHeight: 700,
    [theme.breakpoints.down("sm")]: {
      minWidth: 0,
      minHeight: 0,
    },
  },
  margin: {
    margin: theme.spacing(1),
  },

  textField: {
    // width: "25ch",
  },
  main: {
    background: "#112233",
    elevation: "20",
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
  },
  font3: {
    color: "#ffff",
  },
  title: {
    padding: theme.spacing(0),
  },
  content: {
    overflowX: "hidden",
    padding: theme.spacing(0),
  },
  firstpaper: {
    float: "right",
    width: "70%",
    background: "#ffff",
    marginRight: theme.spacing(1),
    //marginLeft: theme.spacing(8),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
  },
  secondpaper: {
    float: "left",
    width: "70%",
    background: "#112233",
    // marginRight: theme.spacing(8),
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    color: "#ffff",
  },
  reff: {
    float: "left",
  },
  title1: {
    marginTop: theme.spacing(4),
    width: theme.spacing(20),
    height: theme.spacing(5),
    margin: "auto",
  },
}));

const ENDPOINT = "http://" + "localhost" + ":" + "5000" + "/";
let socket;

var numberMessage = 20;
function DialogChat({ open, setOpen, name, secondUser, room }) {
  const classes = useStyles();
  const theme = useTheme();
  const imgLink = "/assets/img/av2.jpg";
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [payload, setPayload] = useState([]);
  const [pay, setPay] = useState([]);
  const [sendText, setSendText] = useState("");
  const [check, setCheck] = useState(false);
  const messagesEndRef = useRef(null);
  const [check2, setCheck2] = useState(false);
  const [conn, setConn] = useState(false);
  const [more, setMore] = useState("Show more ...");

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleClose = () => {
    setOpen(false);
  };

  //************************************************************************************************************************************** */
  const getChats = async (room, numberMessage, setPay, setCheck) => {
    try {
      Axios.defaults.withCredentials = true;

      Axios.get(
        "http://" +
          "localhost" +
          ":" +
          "3001" +
          "/getchat?id=" +
          room +
          "---" +
          numberMessage
      )
        .then((response) => {
          if (response.data) {
            setPay(response.data.data);
            setCheck(true);
          }
        })
        .catch((error) => {});
    } catch (error) {}
  };
  //************************************************************************************************************************************** */
  const getChat = () => {
    try {
      getChats(room, numberMessage, setPay, setCheck);
    } catch (error) {}
  };
  //********************************************************************************************************** */
  useEffect(() => {
    socket = io(ENDPOINT, {
      reconnection: false,

      transports: ["websocket"],
    });

    if (name) {
      const loc = "?name=" + name + "&room=Masoud-Bakhshi";
      socket.emit("join", { name, room }, (error) => {
        if (error) {
          alert(error);
        }
      });
      numberMessage = 20;
      getChat();
    }

    const tryReconnect = () => {
      setTimeout(() => {
        //********************************************************* */

        if (socket.connected === false) {
          setConn((conn) => !conn);
          tryReconnect();
        }
      }, 2000);
    };

    socket.io.on("close", tryReconnect);

    return () => {
      // console.log("disconnected");
      socket.emit("disconnect", (error) => {
        if (error) {
          alert(error);
        }
      });
      //socket.off();
      socket.disconnect();
    };
  }, [conn]);
  //********************************************************************************************************** */
  //********************************************************************************************************** */

  useEffect(() => {
    if (name && check === true) {
      scrollToBottom();
      socket.on("message", (message) => {
        setMessages((messages) => [...messages, message]);

        if (message.user !== name) {
          var myJson = {
            _id: "Math.floor(Math.random() * 100000000000)",
            user: secondUser,
            text: message.text,
            room: room,
            updatedAt: "",
            createdAt: "",
            __v: 0,
          };

          setPay((pay) => [...pay, myJson]);
          setCheck(false);
          //  console.log(pay);
          scrollToBottom();
        }
      });

      socket.on("roomData", ({ users }) => {
        setUsers(users);
      });
      setCheck2(true);
    }
    return () => {
      // console.log("websocket unmounting!!!!!");
      //   socket.off();
      // socket.disconnect();
    };
  }, [name, check]);
  //********************************************************************************************************** */
  //************************************************************************************************************************************** */
  const IncludeChats = async (payload) => {
    try {
      Axios.defaults.withCredentials = true;

      await Axios.post(
        "http://" + "localhost" + ":" + "3001" + "/insertchat",
        payload
      )
        .then((response) => {})
        .catch((error) => {});
    } catch (error) {}
  };
  //************************************************************************************************************************************** */
  //********************************************************************************** */
  const handleIncludeChat = async (payload) => {
    try {
      IncludeChats(payload);
    } catch (error) {}
  };

  useEffect(() => {
    if (pay.length > 0) {
      scrollToBottom();
    }
  }, [pay]);

  const handleSend = (e) => {
    //alert(socket.connected);
    e.preventDefault();
    if (sendText !== "") {
      setPayload({ user: name, text: sendText });
      var myJson = {
        _id: "Math.floor(Math.random() * 100000000000)",
        user: name,
        text: sendText,
        room: room,
        updatedAt: "",
        createdAt: "",
        __v: 0,
      };
      setPay([...pay, myJson]);

      handleIncludeChat({ user: name, text: sendText, room: room });
      if (sendText && name) {
        socket.emit("sendMessage", sendText, () => setMessage(""));
      }
      setSendText("");
    }
    ///scrollToBottom();
  };
  const ShowMore = () => {
    numberMessage = numberMessage + 10;
    // console.log("numberMessage" + numberMessage);
    getChat();
  };
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        // className={classes.dial}
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogTitle id="responsive-dialog-title" className={classes.title}>
          <Box className={classes.main} boxShadow={10}>
            <List className={classes.main}>
              <ListItem button key={"firstUser"}>
                <ListItemText
                  primary={""}
                  className={classes.font3}
                ></ListItemText>
              </ListItem>

              <ListItem button key={"firstUser"}>
                <ListItemIcon>
                  <Avatar alt={"firstUser"} src="/assets/img/av2.jpg" />
                </ListItemIcon>
                <ListItemText
                  primary={secondUser.split("@", 1)}
                  className={classes.font3}
                  secondary={<Button onClick={handleClose}>Close</Button>}
                ></ListItemText>
              </ListItem>
            </List>
          </Box>
        </DialogTitle>

        <DialogContent className={classes.content}>
          <div>
            <Typography variant="h7" gutterBottom className={classes.title1}>
              <Link href="#" to="#" onClick={ShowMore}>
                {more}
              </Link>
            </Typography>
          </div>

          {pay
            ? pay.map((data, index) => {
                {
                  return data.user === name ? (
                    <Paper className={classes.firstpaper} elevation={3}>
                      {data.text}
                    </Paper>
                  ) : (
                    <Paper className={classes.secondpaper} elevation={3}>
                      {data.text}
                    </Paper>
                  );
                }
              })
            : null}
          <div className={classes.reff} ref={messagesEndRef} />
        </DialogContent>
        <DialogActions>
          <form onSubmit={handleSend} style={{ width: "100%" }}>
            <FormControl
              fullWidth
              className={clsx(classes.margin, classes.textField)}
            >
              <InputLabel htmlFor="standard-adornment-password">
                Type a message
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={"text"}
                autoComplete="off"
                value={sendText}
                onChange={(e) => {
                  setSendText(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      type="submit"
                    >
                      <SendIcon></SendIcon>
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </form>
        </DialogActions>
        <DialogActions style={{ justifyContent: "left" }}>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
          {/* <Button onClick={handleClose} color="primary">
            (this is a demo chat)
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogChat;
