import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import About from "./routes/About";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import Navigation from "./component/Navigation";
import "./App.css";
import Write from "./component/Write";
import Detail_Review from "./component/Detail_Review";

function App() {
  return (
    <HashRouter>
      <Navigation />
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/about" component={About} />
        <Route path="/movie/:id" component={Detail} />
        <Route path="/write_review/:id" component={Write} />
        <Route path="/detail_review/:title" component={Detail_Review} />
      </Switch>
    </HashRouter>
  );
}

export default App;
