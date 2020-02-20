import React, { useState, useEffect } from "react"
import axios from "axios"
import _ from "lodash"
import InfiniteScroll from "react-infinite-scroll-component"
import Columned from "react-columned"
import Card from "../components/Card"
import Header from "../components/Header"
import loading from "../loading-image.svg"

const Home = () => {
	const [options, setOptions] = useState([{ label: "All", value: "" }])
	const [pokemons, setPokemons] = useState([])
	const [nextUrl, setNextUrl] = useState("")
	const [type, setType] = useState("")
	const [isLoading, setLoading] = useState(true)
	const Options = () => {
		return options.map((option, i) => {
			return <Option key={i} value={option.value} label={option.label} />
		})
	}
	const fetchPokemon = () => {
		axios.get(nextUrl).then(res => {
			let retreivedPokemons = res.data.results.map(result => {
				return { slug: result.name }
			})
			setPokemons(poks => [...poks, ...retreivedPokemons])
			setNextUrl(res.data.next)
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
				let retreivedPokemons = res.data.pokemon.map(pokemon => {
					return { slug: pokemon.pokemon.name }
				})
				setPokemons([...retreivedPokemons])
				setLoading(false)
			})
		} else {
			axios.get("https://pokeapi.co/api/v2/pokemon?limit=9").then(res => {
				let retreivedPokemons = res.data.results.map(result => {
					return { slug: result.name }
				})
				setPokemons([...retreivedPokemons])
				setLoading(false)
				setNextUrl(res.data.next)
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
					{isLoading ? (
						<div className="pt-3">
							Loading...
							<img
								src={loading}
								width="25"
								height="25"
								alt="Loading placeholder"
							/>
						</div>
					) : (
						<div className="pt-3 mx-n2">
							<InfiniteScroll
								dataLength={pokemons.length}
								next={fetchPokemon}
								hasMore={true}
							>
								<Columned>
									{pokemons.map((pokemon, i) => {
										return (
											<Card
												key={i}
												slug={pokemon.slug}
												name={_.startCase(pokemon.slug)}
											/>
										)
									})}
								</Columned>
							</InfiniteScroll>
						</div>
					)}
				</div>
			</main>
		</div>
	)
}

function Option(props) {
	return <option value={props.value}>{props.label}</option>
}

export default Home
