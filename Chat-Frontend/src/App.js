import "./styles.css";
import ThemeProvider from "./Material/PrimaryColor";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import FisrtChatPage from "./components";
export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={FisrtChatPage} exact />
      </Switch>
    </BrowserRouter>
  );
}
