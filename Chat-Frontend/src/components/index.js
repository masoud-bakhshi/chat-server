import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Grid,
  CssBaseline,
  Paper,
  Button,
  DialogActions,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Axios from "axios";
import ChatList from "./ChatList";
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "fixed",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    height: "100vh",
    marginTop: theme.spacing(5),
  },
  image: {
    backgroundImage: "url(/assets/img/url.svg)",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#fff",

    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  halfLeft: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#fafafa",
    padding: theme.spacing(2),
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  butt: {
    marginRight: "20px",
    marginLeft: "20px",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function FisrtChatPage() {
  const classes = useStyles();
  const [nextPage, setNextPage] = useState(false);
  const [payload, setPayload] = useState([]);

  const handleIncludeChat = () => {
    setNextPage(true);
  };

  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            // onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            Create Chat
          </Typography>
        </Toolbar>
      </AppBar>

      <Grid container component="main" className={classes.root}>
        <CssBaseline />

        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          className={classes.halfLeft}
        >
          {!nextPage ? (
            <div>
              <Typography variant="h4" className={classes.title}>
                DevelopercodeBase
              </Typography>
              <Typography
                variant="h6"
                className={classes.type}
                style={{ marginBottom: "40px", marginTop: "20px" }}
              >
                Just remeber your name and your friend's name exactly.
              </Typography>
              <ValidatorForm
                debounceTime={1500}
                className={classes.form}
                onSubmit={handleIncludeChat}
                style={{ direction: "ltr" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextValidator
                      autoComplete="firstUser"
                      name="firstUser"
                      variant="outlined"
                      fullWidth
                      id="firstUser"
                      label="My Name"
                      autoFocus
                      onChange={(e) => {
                        setPayload({
                          ...payload,
                          firstUser: e.target.value.toString(),
                        });
                      }}
                      value={payload["firstUser"]}
                      validators={["required", "minStringLength:3"]}
                      errorMessages={[
                        "this field is required",
                        "min letter is 3",
                      ]}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ direction: "ltr" }}>
                    <TextValidator
                      autoComplete="secondUser"
                      name="secondUser"
                      variant="outlined"
                      fullWidth
                      id="secondUser"
                      label="Your Friend's Name"
                      autoFocus
                      onChange={(e) => {
                        setPayload({
                          ...payload,
                          secondUser: e.target.value.toString(),
                        });
                      }}
                      value={payload["secondUser"]}
                      validators={["required", "minStringLength:3"]}
                      errorMessages={[
                        "this field is required",
                        "min letter is 3",
                      ]}
                    />
                  </Grid>
                </Grid>

                <DialogActions>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Create chat
                  </Button>
                </DialogActions>
              </ValidatorForm>
            </div>
          ) : (
            <div>
              <ChatList payload={payload}></ChatList>
            </div>
          )}
        </Grid>

        <Grid item xs={false} sm={4} md={7} className={classes.image} />
      </Grid>
    </div>
  );
}
