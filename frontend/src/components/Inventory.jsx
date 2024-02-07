import { useState, useEffect } from "react";
import Popup from "reactjs-popup";

import "../css/popup.css";

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

	const handleRequest = (e, item) => {
		const quantity = e.target.quantity.value;
		console.log(quantity);

		if (quantity < 1) {
			alert("Quantity must be greater than 0");
			return;
		} else if (quantity > item.quantity) {
			alert("Quantity requested is greater than available quantity");
			return;
		}

		fetch("http://localhost:5000/api/v1/requests/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				item_id: item.id,
				quantity: quantity,
			}),
			credentials: "include",
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.error) {
					console.error("Error:", data.error);
					return;
				}
				alert("Request submitted successfully");
				console.log(data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	return (
		<div className="w-[70%] mx-auto bg-secondary rounded-xl p-6">
			<div>
				<h1 className="text-3xl font-bold text-center mb-6">
					Available Inventory
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
									className=" odd:bg-black active:bg-primary transition-all duration-200 ease-in-out hover:bg-primary hover:text-black"
								>
									<td className="py-4 px-3">{item.name}</td>
									<td className="py-4 px-3">
										{item.description}
									</td>
									<td className="py-4 px-3">
										{item.quantity}
									</td>
									<td>
										<Popup
											trigger={
												<button className="py-2 px-3 bg-primary text-black rounded-lg group-hover:bg-accent transition-colors duration-200 hover:shadow-xl mr-3">
													Request
												</button>
											}
											modal
											nested
											closeOnDocumentClick
										>
											{(close) => (
												<div className="w-[100%] bg-secondary rounded-lg p-6">
													<h1 className="text-2xl font-bold text-center mb-6">
														Request Item
													</h1>
													<form
														onSubmit={(e) => {
															e.preventDefault();
															handleRequest(
																e,
																item
															);
															close();
														}}
													>
														<div className="flex flex-col mb-4">
															<label
																htmlFor="quantity"
																className="text-lg"
															>
																Quantity
															</label>
															<input
																type="number"
																name="quantity"
																id="quantity"
																className="py-2 px-3 bg-white text-black rounded-lg"
																required
																defaultValue={1}
															/>
														</div>

														<div className="flex justify-center">
															<button
																type="submit"
																className="py-2 px-3 bg-primary text-black rounded-lg hover:shadow-xl"
															>
																Submit
															</button>
														</div>
													</form>
												</div>
											)}
										</Popup>
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
