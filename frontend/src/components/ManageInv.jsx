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

	const handleDelete = (id) => {
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

	const handleEdit = (e, id) => {
		const name = e.target.name.value;
		const description = e.target.description.value;
		const quantity = e.target.quantity.value;

		fetch(`http://localhost:5000/api/v1/inventory/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				name,
				description,
				quantity,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.error) {
					console.error("Error:", data.error);
					return;
				}
				setInventory(
					inventory.map((item) => {
						if (item.id === id) {
							return {
								id,
								name,
								description,
								quantity,
							};
						}
						return item;
					})
				);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	const handleAddItem = (e) => {
		const name = e.target.name.value;
		const description = e.target.description.value;
		const quantity = e.target.quantity.value;

		fetch("http://localhost:5000/api/v1/inventory/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				name,
				description,
				quantity,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.error) {
					console.error("Error:", data.error);
					return;
				}
				console.log(inventory);
				setInventory([
					...inventory,
					{ id: data.id, name, description, quantity },
				]);
				console.log(inventory);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	return (
		<div className="w-[70%] mx-auto bg-secondary rounded-xl p-6">
			<div>
				<div className="flex justify-between items-start">
					<h1 className="text-3xl font-bold text-center mb-6">
						All Inventory
					</h1>
					<Popup
						trigger={
							<button className="py-2 px-3 bg-primary text-black rounded-lg hover:shadow-xl">
								Add new Item
							</button>
						}
						modal
						nested
						closeOnDocumentClick
					>
						{(close) => (
							<div className="w-[100%] bg-secondary rounded-lg p-6">
								<h1 className="text-2xl font-bold text-center mb-6">
									Add New Item
								</h1>
								<form
									onSubmit={(e) => {
										e.preventDefault();
										handleAddItem(e);
										close();
									}}
								>
									<div className="flex flex-col mb-4">
										<label
											htmlFor="name"
											className="text-lg"
										>
											Item Name
										</label>
										<input
											type="text"
											name="name"
											id="name"
											className="py-2 px-3 bg-white text-black rounded-lg"
											required
										/>
									</div>
									<div className="flex flex-col mb-4">
										<label
											htmlFor="description"
											className="text-lg"
										>
											Description
										</label>
										<textarea
											name="description"
											id="description"
											className="py-2 px-3 bg-white text-black rounded-lg"
											required
										></textarea>
									</div>
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
				</div>
				<table className="w-full border-2 border-solid rounded-lg border-primary shadow-black shadow-sm border-collapse">
					<thead className="">
						<tr>
							<th className="py-4 px-3">ID</th>
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
									className="group odd:bg-black active:bg-primary transition-all duration-200 ease-in-out hover:bg-primary hover:text-black"
								>
									<td className="py-4 px-3">{item.id}</td>
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
													Edit
												</button>
											}
											modal
											nested
											closeOnDocumentClick
										>
											{(close) => (
												<div className="w-[100%] bg-secondary rounded-lg p-6">
													<h1 className="text-2xl font-bold text-center mb-6">
														Edit Item
													</h1>
													<form
														onSubmit={(e) => {
															e.preventDefault();
															handleEdit(
																e,
																item.id
															);
															close();
														}}
													>
														<div className="flex flex-col mb-4">
															<label
																htmlFor="name"
																className="text-lg"
															>
																Item Name
															</label>
															<input
																type="text"
																name="name"
																id="name"
																className="py-2 px-3 bg-white text-black rounded-lg"
																required
																defaultValue={
																	item.name
																}
															/>
														</div>
														<div className="flex flex-col mb-4">
															<label
																htmlFor="description"
																className="text-lg"
															>
																Description
															</label>
															<textarea
																name="description"
																id="description"
																className="py-2 px-3 bg-white text-black rounded-lg"
																required
																defaultValue={
																	item.description
																}
															></textarea>
														</div>
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
																defaultValue={
																	item.quantity
																}
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
										<Popup
											trigger={
												<button className="py-2 px-3 bg-primary text-black rounded-lg group-hover:bg-accent transition-colors duration-200 hover:shadow-xl">
													Delete
												</button>
											}
											modal
											nested
											closeOnDocumentClick
										>
											{(close) => (
												<div className="w-[100%] bg-secondary rounded-lg p-6">
													<h1 className="text-2xl font-bold text-center mb-6">
														Are you sure you want to
														delete this item?
													</h1>
													<div className="flex justify-center">
														<button
															className="py-2 px-3 bg-primary text-black rounded-lg mr-4 hover:shadow-xl"
															onClick={() => {
																handleDelete(
																	item.id
																);
																close();
															}}
														>
															Yes
														</button>
														<button
															className="py-2 px-3 bg-primary text-black rounded-lg hover:shadow-xl"
															onClick={() => {
																close();
															}}
														>
															No
														</button>
													</div>
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
