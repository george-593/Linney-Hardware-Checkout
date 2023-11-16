/* eslint-disable react/prop-types */
const Header = ({ user, setScreen }) => {
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
						<a href="">All Inventory</a>
						<a href="">Users</a>
						<a href="">Requests</a>
					</>
				)}
			</div>
			{(user && (
				<div>
					<p>Welcome, {user.username}</p>
					<a href="">Logout</a>
				</div>
			)) || (
				<div>
					<a onClick={() => setScreen("login")}>Login</a>
					<a href="">Register</a>
				</div>
			)}
		</div>
	);
};

export default Header;
