import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Search from "./components/search/index";
import Saved from "./components/saved/index";
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h2 className="d-flex flew-row p-3">Google Books Search</h2>
        <nav className="nav justify-content-left p-2">
          <h4><a className="nav-link" href="/">Book Search</a></h4>
          <h4><a className="nav-link" href="/saved">Saved Books</a></h4>
        </nav>
        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/saved" component={Saved} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
