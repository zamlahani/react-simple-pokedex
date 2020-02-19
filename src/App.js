import React from "react"
import logo from "./logo.svg"

function App() {
  return (
    <div className="App">
      <header>
        <nav className="navbar navbar-light bg-light">
          <div className="container">
            <span className="navbar-brand mb-0 h1">React Pokedex</span>
          </div>
        </nav>
      </header>
      <main className="py-4">
        <div className="container">
          <form className="form-inline" action="">
            <label htmlFor="filter" className="mr-2">
              Type
            </label>
            <select className="form-control" id="filter">
              <Option value="All" />
              <Option value="1" />
              <Option value="2" />
            </select>
          </form>
          <div className="card-columns pt-3">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </main>
    </div>
  )
}

function Option(props) {
  return <option>{props.value}</option>
}

function Card() {
  return (
    <div className="card">
      <img src={logo} alt="" />
      <div className="card-body">
        <h5 className="card-title">Card title that wraps to a new line</h5>
        <p className="card-text">
          This is a longer card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer.
        </p>
      </div>
    </div>
  )
}
export default App
