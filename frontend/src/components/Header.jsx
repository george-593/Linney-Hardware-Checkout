/* eslint-disable react/prop-types */
const Header = ({ user, setScreen }) => {
	const handleLogout = () => {
		document.cookie =
			"connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		window.location.reload(false);
	};
	return (
		<>
			<div className="w-3/4 flex justify-between mx-auto mt-6 items-center">
				<div>
					<h1 className="font-poppins text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-primary to-accent">
						Hardware Checkout
					</h1>
				</div>
				<div className="flex">
					{user && (
						<>
							<button
								onClick={() => setScreen("dashboard")}
								className="hover:underline text-lg mr-4"
							>
								Dashboard
							</button>
							<button
								onClick={() => setScreen("inventory")}
								className="hover:underline text-lg mr-4"
							>
								Inventory
							</button>
						</>
					)}

					{user?.isadmin && (
						<>
							<button
								onClick={() => setScreen("manage-inv")}
								className="hover:underline text-lg mr-4"
							>
								Manage Inventory
							</button>
							<button
								onClick={() => setScreen("users")}
								className="hover:underline text-lg mr-4"
							>
								Users
							</button>
							<button
								onClick={() => setScreen("requests")}
								className="hover:underline text-lg mr-4"
							>
								Requests
							</button>
						</>
					)}
				</div>
				{(user && (
					<div className="flex">
						<p className="mr-4 text-lg">
							Welcome,{" "}
							<span className="text-accent">{user.username}</span>
						</p>
						<a
							onClick={() => handleLogout()}
							className="hover:cursor-pointer text-lg hover:underline"
						>
							Logout
						</a>
					</div>
				)) || (
					<div className="text-lg flex">
						<a
							onClick={() => setScreen("login")}
							className="hover:cursor-pointer hover:underline"
						>
							Login
						</a>
						<p className="mx-2">or</p>
						<a
							onClick={() => setScreen("register")}
							className="hover:cursor-pointer hover:underline"
						>
							Register
						</a>
					</div>
				)}
			</div>
			<hr className="my-4 h-0.5 border-t-0 bg-gradient-to-r from-transparent to-transparent via-primary opacity-60" />
		</>
	);
};

export default Header;
