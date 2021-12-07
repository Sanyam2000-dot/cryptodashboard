import "./App.css";
import DashBoard from "./DashBoard";
import History from "./History";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/history">
            <History />
          </Route>
        </Switch>
        <Switch>
          <Route path="/dash">
            <DashBoard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
