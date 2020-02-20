import React, { useState, useEffect } from "react"
import axios from "axios"
import _ from "lodash"
import Card from "../components/Card"
import Header from "../components/Header"
import Option from "../components/Option"

const Home = () => {
	const [options, setOptions] = useState([{ label: "All", value: "" }])
	const Options = () => {
		return options.map((option, i) => {
			return <Option key={i} value={option.value} label={option.label} />
		})
	}
	useEffect(() => {
		axios.get("https://pokeapi.co/api/v2/type").then(res => {
			let newOptions = res.data.results.map(val => {
				return { value: val.name, label: _.startCase(val.name) }
			})
			setOptions(o => [...o, ...newOptions])
		})
	}, [])
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
							<Options />
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
