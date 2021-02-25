import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Door from "./screens/door";
import Authorized from "./screens/authorized";
import Rejected from "./screens/rejected";
import PageNotFound from "./screens/page-not-found";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

function App() {
  return (
    <Router>
      <div className="App">
        <header></header>
        <main className="is-flex is-justify-content-center is-flex-direction-column">
          <Switch>
            <Route exact path="/">
              <Door />
            </Route>
            <Route path="/come-in">
              <Authorized />
            </Route>
            <Route path="/rejected">
              <Rejected />
            </Route>
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
        </main>

        <footer className="footer">
          <div className="content has-text-centered has-text-white">
            <p>Wanna get in?</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
