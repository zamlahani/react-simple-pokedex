import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import Home from "./pages/Home"
import Detail from "./pages/Detail"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:pokemonSlug/">
          <Detail />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
