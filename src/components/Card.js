import React from "react"
import { Link } from "react-router-dom"
import logo from "../logo.svg"

function Card() {
	return (
		<div className="card">
			<img src={logo} alt="" />
			<div className="card-body">
				<h5 className="card-title">
					Card title that wraps to a new line
				</h5>
				<p className="card-text">
					This is a longer card with supporting text below as a
					natural lead-in to additional content. This content is a
					little bit longer.
				</p>
				<Link className="btn btn-primary" to="/detail/">
					Detail
				</Link>
			</div>
		</div>
	)
}

export default Card
