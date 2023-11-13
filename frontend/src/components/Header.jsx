const Header = () => {
	return (
		<div className="w-full flex justify-between">
			<div>
				<a href="">Dashboard</a>
				<a href="">Inventory</a>
				<a href="">Users</a>
				<a href="">All Inventory </a>
				<a href="">Requests</a>
				<a href="">Categories</a>
			</div>

			<div>
				<p>Welcome, name</p>
				<a href="">Logout</a>
			</div>
		</div>
	);
};

export default Header;
