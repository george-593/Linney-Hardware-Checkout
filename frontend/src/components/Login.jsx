import { useState } from "react";

const Login = () => {
	const [inputs, setInputs] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!inputs.username || !inputs.password) {
			return;
		}

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
			<div className="bg-secondary flex flex-col items-center py-10 px-5 rounded-xl w-1/2">
				<h2 className="font-poppins text-4xl mb-10">Login</h2>

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
						type="submit"
						value="Submit"
						className="bg-primary text-white p-2 rounded-lg cursor-pointer hover:bg-accent transition duration-200 ease-in-out w-full"
					/>
				</form>
			</div>
		</div>
	);
};

export default Login;
