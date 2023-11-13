import { useState } from "react";

const Login = () => {
	const [inputs, setInputs] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault();

		fetch("http://localhost:5000/api/v1/account/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(inputs),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Success:", data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setInputs((inputs) => ({ ...inputs, [name]: value }));
	};

	return (
		<div>
			<h1>Login</h1>

			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="username"
					value={inputs.username || ""}
					onChange={handleChange}
				/>
				<input
					type="password"
					name="password"
					value={inputs.password}
					onChange={handleChange}
				/>
				<input type="submit" value="Login" />
			</form>

			<h2>Auth Test</h2>
			<button
				onClick={() => {
					fetch("http://localhost:5000/api/v1/inventory", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
						credentials: "include",
					})
						.then((response) => response.json())
						.then((data) => {
							console.log("Success:", data);
						})
						.catch((error) => {
							console.error("Error:", error);
						});
				}}
			>
				Test
			</button>
		</div>
	);
};

export default Login;
