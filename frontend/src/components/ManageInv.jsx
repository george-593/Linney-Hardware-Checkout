import { useState, useEffect } from "react";

const ManageInv = () => {
	const [inventory, setInventory] = useState([]);

	useEffect(() => {
		fetch("http://localhost:5000/api/v1/inventory/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.error) {
					console.error("Error:", data.error);
					return;
				}
				setInventory(data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}, []);

	const handleDelete = (id) => {
		let con = confirm("Are you sure you want to delete this item?");
		if (!con) return;

		fetch(`http://localhost:5000/api/v1/inventory/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.error) {
					console.error("Error:", data.error);
					return;
				}
				setInventory(inventory.filter((item) => item.id !== id));
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	return (
		<div className="w-[70%] mx-auto bg-secondary rounded-xl p-6">
			<div>
				<h1 className="text-3xl font-bold text-center mb-6">
					All Inventory
				</h1>
				<table className="w-full border-2 border-solid rounded-lg border-primary shadow-black shadow-sm border-collapse">
					<thead className="">
						<tr>
							<th className="py-4 px-3">Item</th>
							<th className="py-4 px-3">Description</th>
							<th className="py-4 px-3">Quantity</th>
						</tr>
					</thead>
					<tbody className="text-center">
						{inventory.map((item) => {
							return (
								<tr
									key={item.id}
									className="group odd:bg-black active:bg-primary transition-all duration-200 ease-in-out cursor-pointer hover:bg-primary hover:text-black"
								>
									<td className="py-4 px-3">{item.name}</td>
									<td className="py-4 px-3">
										{item.description}
									</td>
									<td className="py-4 px-3">
										{item.quantity}
									</td>
									<td>
										<button className="py-2 px-3 bg-primary text-black rounded-lg mr-4 group-hover:bg-accent transition-colors duration-200 hover:shadow-xl">
											Edit
										</button>
										<button
											className="py-2 px-3 bg-primary text-black rounded-lg group-hover:bg-accent transition-colors duration-200 hover:shadow-xl"
											onClick={() =>
												handleDelete(item.id)
											}
										>
											Delete
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ManageInv;
