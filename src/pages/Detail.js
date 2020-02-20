import React, { useEffect, useState } from "react"
import axios from "axios"
import _ from "lodash"
import { useParams } from "react-router-dom"
import Header from "../components/Header"
import SmallSpinner from "../components/SmallSpinner"
import BigSpinner from "../components/BigSpinner"

const Detail = () => {
	let { pokemonSlug } = useParams()
	const [image, setImage] = useState("")
	const [pokemon, setPokemon] = useState({})
	const [abilitiesString, setAbilities] = useState("")
	const [typesString, setTypesString] = useState("")

	const Stats = () => {
		return pokemon.stats.map((val, i) => {
			return <Stat key={i} name={val.stat.name} stat={val.base_stat} />
		})
	}

	useEffect(() => {
		const source = axios.CancelToken.source()
		axios
			.get(`https://pokeapi.co/api/v2/pokemon/${pokemonSlug}`, {
				cancelToken: source.token,
			})
			.then(res => {
				setImage(res.data.sprites.front_default)
				setPokemon({ ...res.data })
				res.data.abilities.forEach((val, i) => {
					if (i > 0) {
						setAbilities(abies => abies + ", ")
					}
					setAbilities(abies => abies + _.startCase(val.ability.name))
				})
				res.data.types.forEach((val, i) => {
					if (i > 0) {
						setTypesString(typs => typs + ", ")
					}
					setTypesString(typs => typs + _.startCase(val.type.name))
				})
			})
			.catch(function(error) {})
		return () => {
			source.cancel(`Exit from the ${pokemonSlug} page`)
		}
	}, [])
	return (
		<div>
			<Header />
			<main className="container">
				{image.length > 0 ? (
					<img src={image} alt="" className="d-block mx-auto" />
				) : (
					<BigSpinner />
				)}
				{_.isEmpty(pokemon) ? (
					<div className="pt-3">
						Loading...&nbsp;
						<SmallSpinner />
					</div>
				) : (
					<div>
						<h1>{_.startCase(pokemon.name)}</h1>
						<div className="row">
							<div className="col-sm pt-3">
								<h2 className="h5">General Information</h2>
								<div>
									Species: {_.startCase(pokemon.species.name)}
								</div>
								<div>Height: {pokemon.height}</div>
								<div>Weight: {pokemon.weight}</div>
								<div>
									Base experience: {pokemon.base_experience}
								</div>
								<div>Abilities: {abilitiesString}</div>
								<div>Types: {typesString}</div>
							</div>
							<div className="col-sm pt-3">
								<h2 className="h5">Stats</h2>
								<Stats />
							</div>
						</div>
					</div>
				)}
			</main>
		</div>
	)
}

const Stat = props => {
	return (
		<div>
			{_.startCase(props.name)}: {props.stat}
		</div>
	)
}

export default Detail
