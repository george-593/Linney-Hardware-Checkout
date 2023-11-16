/* eslint-disable react/prop-types */
const Header = ({ user, setScreen }) => {
	const handleLogout = () => {
		document.cookie =
			"connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		window.location.reload(false);
	};
	return (
		<div className="w-full flex justify-between">
			<div>
				<button onClick={() => setScreen("dashboard")}>
					Dashboard
				</button>
				<button onClick={() => setScreen("inventory")}>
					Inventory
				</button>

				{user?.isadmin && (
					<>
						<button onClick={() => setScreen("all-inventory")}>
							All Inventory
						</button>
						<button onClick={() => setScreen("users")}>
							Users
						</button>
						<button onClick={() => setScreen("requests")}>
							Requests
						</button>
					</>
				)}
			</div>
			{(user && (
				<div>
					<p>Welcome, {user.username}</p>
					<a onClick={() => handleLogout()}>Logout</a>
				</div>
			)) || (
				<div>
					<a onClick={() => setScreen("login")}>Login</a>
					<p>or</p>
					<a onClick={() => setScreen("register")}>Register</a>
				</div>
			)}
		</div>
	);
};

export default Header;
