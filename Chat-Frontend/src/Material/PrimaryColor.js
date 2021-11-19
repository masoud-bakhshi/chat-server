import React from "react";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Vazir",
  },

  palette: {
    primary: {
      light: "#757ce8",
      main: "#112233",
      dark: "#002884",
      contrastText: "#fff",
    },

    secondary: {
      light: "#e0e0e0",
      main: "#9e9e9e",
      dark: "#424242",
      contrastText: "#000",
    },
  },
});

export default function ThemeProvider(props) {
  const { children } = props;
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
