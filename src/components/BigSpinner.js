import React from "react"

const BigSpinner = () => {
	return (
		<div className="d-flex justify-content-center p-4">
			<div
				className="spinner-grow text-primary"
				style={{ width: "3rem", height: "3rem" }}
				role="status"
			>
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	)
}

export default BigSpinner
