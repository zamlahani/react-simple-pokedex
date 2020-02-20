import React, { useState, useEffect } from "react"
import axios from "axios"
import _ from "lodash"
import InfiniteScroll from "react-infinite-scroll-component"
import Columned from "react-columned"
import Card from "../components/Card"
import Header from "../components/Header"
import SmallSpinner from "../components/SmallSpinner"

const Home = () => {
	const [options, setOptions] = useState([{ label: "All", value: "" }])
	const [pokemons, setPokemons] = useState([])
	const [filteredPokemons, setFilteredPokemons] = useState([])
	const [nextUrl, setNextUrl] = useState("")
	const [type, setType] = useState("")
	const [isLoading, setLoading] = useState(true)
	const Options = () => {
		return options.map((option, i) => {
			return <Option key={i} value={option.value} label={option.label} />
		})
	}
	const fetchPokemon = () => {
		if (type === "") {
			axios.get(nextUrl).then(res => {
				let retreivedPokemons = res.data.results.map(result => {
					return { slug: result.name }
				})
				setPokemons(poks => [...poks, ...retreivedPokemons])
				setNextUrl(res.data.next)
			})
		} else {
			setPokemons(poks => filteredPokemons.slice(0, 20 + poks.length))
		}
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
				if (res.data.pokemon.length > 0) {
					let retreivedPokemons = res.data.pokemon.map(pokemon => {
						return { slug: pokemon.pokemon.name }
					})
					setFilteredPokemons([...retreivedPokemons])
					setPokemons(retreivedPokemons.slice(0, 20))
					setLoading(false)
				} else {
					setPokemons([])
					setLoading(false)
				}
			})
		} else {
			axios.get("https://pokeapi.co/api/v2/pokemon").then(res => {
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
					<div className="pt-3">
						{isLoading ? (
							<div>
								Loading...&nbsp;
								<SmallSpinner />
							</div>
						) : pokemons.length > 0 ? (
							<div className="mx-n2">
								<InfiniteScroll
									dataLength={pokemons.length}
									next={fetchPokemon}
									hasMore={
										type === ""
											? nextUrl
											: pokemons.length <
											  filteredPokemons.length
									}
									loader={<BottomText text="Loading..." />}
									endMessage={
										<BottomText text="Yay! You have seen it all" />
									}
								>
									<Columned>
										{pokemons.map((pokemon, i) => {
											return (
												<Card
													key={i}
													slug={pokemon.slug}
													name={_.startCase(
														pokemon.slug
													)}
												/>
											)
										})}
									</Columned>
								</InfiniteScroll>
							</div>
						) : (
							<div className="alert alert-danger" role="alert">
								Nothing found
							</div>
						)}
					</div>
				</div>
			</main>
		</div>
	)
}

function Option(props) {
	return <option value={props.value}>{props.label}</option>
}

function BottomText(props) {
	return (
		<p style={{ textAlign: "center" }}>
			<b>{props.text}</b>
		</p>
	)
}

export default Home
