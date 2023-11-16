import { useState } from "react";

const Register = () => {
	const [inputs, setInputs] = useState({
		username: "",
		password: "",
		confirmPassword: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		if (inputs.password !== inputs.confirmPassword) {
			alert("Passwords do not match");
			return;
		}

		fetch("http://localhost:5000/api/v1/account/register", {
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
				window.location.reload(false);
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
			<h1>Register</h1>

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
					onChange={handleChange || ""}
				/>
				<input
					type="password"
					name="confirmPassword"
					value={inputs.confirmPassword}
					onChange={handleChange || ""}
				/>
				<input type="submit" value="Login" />
			</form>
		</div>
	);
};

export default Register;
