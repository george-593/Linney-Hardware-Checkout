import { useState, useEffect } from "react";

export function useFetchProfile() {
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch("http://localhost:5000/api/v1/account/get/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		})
			.then((response) => response.json())
			.then((data) => {
				setData(data.exists);
			})
			.catch((error) => {
				console.error("Error:", error);
				setData(false);
			});
	}, []);

	return data;
}
