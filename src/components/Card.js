import React, { useState, useEffect } from "react"
import axios from "axios"
import _ from "lodash"
import { Link } from "react-router-dom"
import BigSpinner from "../components/BigSpinner"

function Card(props) {
	const [image, setImage] = useState("")
	useEffect(() => {
		const source = axios.CancelToken.source()
		axios
			.get(`https://pokeapi.co/api/v2/pokemon/${props.slug}`, {
				cancelToken: source.token,
			})
			.then(res => {
				setImage(res.data.sprites.front_default)
			})
			.catch(function(error) {})
		return () => {
			source.cancel(`Component ${props.slug} unmounted`)
		}
	}, [])
	return (
		<div className="m-2">
			<div className="card" style={props.style}>
				{image.length > 0 ? (
					<img src={image} className="mx-auto d-block" alt="" />
				) : (
					<BigSpinner />
				)}
				<div className="card-body">
					<h2 className="card-title h5 text-center">
						{_.startCase(props.slug)}
					</h2>
					<Link
						className="btn btn-info btn-block"
						to={`/${props.slug}/`}
					>
						Detail
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Card
