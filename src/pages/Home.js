import React, { useState, useEffect } from "react"
import axios from "axios"
import _ from "lodash"
import Card from "../components/Card"
import Header from "../components/Header"
import Option from "../components/Option"

const Home = () => {
	const [options, setOptions] = useState([{ label: "All", value: "" }])
	const [pokemons, setPokemons] = useState([])
	const [type, setType] = useState("")
	const [loading, setLoading] = useState(true)
	const Options = () => {
		return options.map((option, i) => {
			return <Option key={i} value={option.value} label={option.label} />
		})
	}
	const Cards = () => {
		return pokemons.map((pokemon, i) => {
			return (
				<Card
					key={i}
					slug={pokemon.slug}
					name={_.startCase(pokemon.slug)}
				/>
			)
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
	useEffect(() => {
		setLoading(true)
		if (type !== "") {
			axios.get(`https://pokeapi.co/api/v2/type/${type}`).then(res => {
				console.log("1st then")
				let retreivedPokemons = res.data.pokemon.map(pokemon => {
					return { slug: pokemon.pokemon.name }
				})
				setPokemons([...retreivedPokemons])
				setLoading(false)
			})
		} else {
			axios.get("https://pokeapi.co/api/v2/pokemon").then(res => {
				let retreivedPokemons = res.data.results.map(result => {
					return { slug: result.name }
				})
				setPokemons([...retreivedPokemons])
				setLoading(false)
			})
		}
	}, [type])
	const handleSelect = e => {
		setType(e.target.value)
	}
	return (
		<div className="homePage">
			<Header />
			<main className="py-4">
				<div className="container">
					<form className="form-inline" action="">
						<label htmlFor="filter" className="mr-2">
							Type
						</label>
						<select
							value={type}
							className="form-control"
							id="filter"
							onChange={handleSelect}
						>
							<Options />
						</select>
					</form>
					<div className="card-columns pt-3">
						{loading ? "Loading..." : <Cards />}
					</div>
				</div>
			</main>
		</div>
	)
}

export default Home
