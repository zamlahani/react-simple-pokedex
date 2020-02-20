import React from "react"
import Card from "../components/Card"
import Header from "../components/Header"
import Option from "../components/Option"

const Home = () => {
	return (
		<div className="homePage">
			<Header />
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

export default Home
