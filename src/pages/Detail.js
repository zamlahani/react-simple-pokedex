import React from "react"
import { useParams } from "react-router-dom"
import Header from "../components/Header"

const Detail = () => {
	let { pokemonSlug } = useParams()
	return (
		<div>
			<Header />
			Detail of {pokemonSlug}
		</div>
	)
}

export default Detail
