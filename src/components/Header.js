import React from "react"
import { Link } from "react-router-dom"

const Header = () => {
	return (
		<header>
			<nav className="navbar navbar-expand-sm navbar-dark bg-dark">
				<div className="container">
					<Link className="navbar-brand" to="">
						React Pokedex
					</Link>
				</div>
			</nav>
		</header>
	)
}

export default Header
