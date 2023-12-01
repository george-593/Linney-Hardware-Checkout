import { useState, useEffect } from "react";

export function useFetchProfile() {
	const [data, setData] = useState(null);

	useEffect(() => {
		// Detect if cookie is set or if it is expired so a useless api call is not made
		/*
		const cookies = document.cookie.split("; ");
		const session = cookies.forEach((cookie) => {
			const [key, value] = cookie.split("=");
			if (key === "session") {
				return value;
			}
		});
		if (!session) {
			setData(false);
			return;
		}
		console.log("Session:", session);
		*/

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
