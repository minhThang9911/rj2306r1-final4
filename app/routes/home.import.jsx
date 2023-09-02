import { Autocomplete, Card } from "@mui/material";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { api, getApiLink } from "~/config/api";
import { fetcherServer } from "~/server/api.server";

export const loader = async () => {
	const products = await fetcherServer.get(getApiLink.base(api.products));
	return json({
		products: products.data,
	});
};

function ImportProductPage() {
	const { products } = useLoaderData();
	const [addProduct, setAddProduct] = useState();
	return (
		<div className="w-full flex justify-between h-full">
			<div className="w-8/12 p-3 flex flex-col h-full">
				<Card className="h-full p-3">
					<Autocomplete
						value={addProduct}
						onChange={(e, newValue) => {
							if (typeof newValue === "string") {
								setAddProduct({
									name: newValue,
								});
							} else if (newValue && newValue.inputValue) {
								setAddProduct({
									name: newValue.inputValue,
								});
							} else {
								setAddProduct(newValue);
							}
						}}
					/>
				</Card>
			</div>
			<div className="w-4/12 p-3 flex flex-col h-full">
				<Card className="h-full p-3">sub</Card>
			</div>
		</div>
	);
}

export default ImportProductPage;
