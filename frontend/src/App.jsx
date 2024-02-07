import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import ManageInv from "./components/ManageInv";
import Inventory from "./components/Inventory";

import { useFetchProfile } from "./hooks/useFetchProfile";

import { useEffect, useState } from "react";

function App() {
	const user = useFetchProfile();
	const [screen, setScreen] = useState("dashboard");

	// If the user isnt logged in, show the login screen
	useEffect(() => {
		if (user) {
			setScreen("dashboard");
		} else {
			setScreen("login");
		}
	}, [user]);

	return (
		<>
			<Header user={user} setScreen={(screen) => setScreen(screen)} />
			{screen === "dashboard" && <p>Dashboard screen</p>}
			{screen === "inventory" && <Inventory />}
			{screen === "manage-inv" && <ManageInv />}
			{screen === "users" && <p>Users screen</p>}
			{screen === "requests" && <p>Requests screen</p>}
			{screen === "login" && <Login />}
			{screen === "register" && <Register />}
		</>
	);
}

export default App;
