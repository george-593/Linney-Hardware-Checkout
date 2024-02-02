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

		if (!inputs.username || !inputs.password || !inputs.confirmPassword) {
			return;
		}

		const body = JSON.stringify({
			username: inputs.username,
			password: inputs.password,
		});

		// Register the user
		fetch("http://localhost:5000/api/v1/account/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: body,
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Registration Success:", data);
				// Login the user after registration
				fetch("http://localhost:5000/api/v1/account/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
					body: body,
				})
					.then((response) => response.json())
					.then((data) => {
						console.log("Login Success:", data);
						// Reload the page to update the user state
						window.location.reload(false);
					})
					.catch((error) => {
						console.error("Login Error:", error);
					});
			})
			.catch((error) => {
				console.error("Registration Error:", error);
			});
	};

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setInputs((inputs) => ({ ...inputs, [name]: value }));
	};

	return (
		<div className="w-[75%] mx-auto flex justify-center">
			<div className="bg-secondary flex flex-col items-center py-10 px-5 rounded-xl w-1/2">
				<h2 className="font-poppins text-4xl mb-10">Register</h2>

				<form
					onSubmit={handleSubmit}
					className="flex flex-col w-[60%] items-center"
				>
					<input
						type="text"
						name="username"
						value={inputs.username || ""}
						onChange={handleChange}
						placeholder="Username"
						className="mb-5 text-black p-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary w-[85%]"
					/>
					<input
						type="password"
						name="password"
						value={inputs.password || ""}
						onChange={handleChange}
						placeholder="Password"
						className="mb-5 text-black p-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary w-[85%]"
					/>

					<input
						type="password"
						name="confirmPassword"
						value={inputs.confirmPassword || ""}
						onChange={handleChange}
						placeholder="Confirm Password"
						className="mb-5 text-black p-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary w-[85%]"
					/>
					<input
						type="submit"
						value="Submit"
						className="bg-primary text-white p-2 rounded-lg cursor-pointer hover:bg-accent transition duration-200 ease-in-out w-full"
					/>
				</form>
			</div>
		</div>
	);
};

export default Register;
