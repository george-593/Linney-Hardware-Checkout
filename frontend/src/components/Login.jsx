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
		<div className="w-[75%] mx-auto flex justify-center">
			<div className="bg-secondary flex flex-col items-center py-10 px-5 rounded-xl ">
				<h2 className="font-poppins text-3xl mb-10">Login</h2>

				<form onSubmit={handleSubmit} className="">
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
					<input type="submit" value="Login" />
				</form>
			</div>
		</div>
	);
};

export default Login;
