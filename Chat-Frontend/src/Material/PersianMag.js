import React from "react";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider as MuiThemeProvider1 } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Encode Sans Expanded', Iranian Sans"].join(","),
    fontfamily: "Samim",
  },

  palette: {
    primary: {
      light: "#757ce8",
      main: "#112233",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

export default function ThemeProvider(props) {
  const { children } = props;
  return <MuiThemeProvider1 theme={theme}>{children}</MuiThemeProvider1>;
}
