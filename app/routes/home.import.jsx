import {
	Autocomplete,
	Button,
	Card,
	Divider,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
	createFilterOptions,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useMemo, useState } from "react";
import { v4 } from "uuid";
import { api, getApiLink } from "~/config/api";
import { fetcherServer } from "~/server/api.server";
import DeleteIcon from "@mui/icons-material/Delete";
import { sumWithMultiplyFields } from "~/utils/calc";

export const loader = async () => {
	const products = await fetcherServer.get(
		getApiLink.expand(api.type.products, api.type.categories)
	);
	const productsData = products.data.map((item) => ({
		id: item.id,
		name: item.name,
		category: item.categories.title,
	}));
	const suppliers = await fetcherServer.get(
		getApiLink.expand(api.type.suppliers, api.type.categories)
	);
	const suppliersData = suppliers.data.map((item) => ({
		id: item.id,
		name: item.name,
		category: item.categories.title,
	}));
	return json({
		products: productsData,
		suppliers: suppliersData,
	});
};

const filter = createFilterOptions();
const inputProductInit = {
	id: 1,
	name: "",
	quantity: 0,
	price: 0,
};

function ImportProductPage() {
	const { products, suppliers } = useLoaderData();
	const [inputProduct, setInputProduct] = useState(inputProductInit);
	const [autoSuppliers, setAutoSuppliers] = useState({
		id: 1,
		name: "",
		category: "",
	});
	const [importList, setimportList] = useState([]);
	const [productList, setProductList] = useState(products);
	const [supplierList, setSupplierList] = useState(suppliers);
	const [category, setCategory] = useState("");
	const categoriesList = useMemo(() => {
		const tmp = suppliers.map((item) => item.category);
		return [...new Set(tmp)];
	}, [suppliers]);
	const columns = useMemo(() => {
		return [
			{
				field: "id",
				headerName: "Mã",
				flex: 1,
			},
			{ field: "name", headerName: "Tên Hàng hóa", flex: 5 },
			{ field: "quantity", headerName: "Số lượng", flex: 3 },
			{ field: "price", headerName: "Đơn giá", flex: 3 },
			{
				field: "sum",
				headerName: "Tổng tiền",
				flex: 3,
				valueGetter: (params) => {
					return (
						parseFloat(params.row.quantity) *
						parseFloat(params.row.price)
					);
				},
				valueFormatter: (params) => {
					if (params.value == null) {
						return "";
					}
					return `$${params.value.toLocaleString()}`;
				},
			},
			{
				field: "actions",
				type: "actions",
				flex: 2,
				getActions: (params) => [
					<GridActionsCellItem
						key={"a"}
						icon={<DeleteIcon />}
						label="Xóa"
						onClick={() =>
							setimportList((pre) =>
								pre.filter((item) => item.id !== params.row.id)
							)
						}
					/>,
				],
			},
		];
	}, []);

	const handleAddProductChange = (e) => {
		setInputProduct((pre) => ({ ...pre, [e.target.name]: e.target.value }));
	};
	const handleAddProduct = () => {
		setimportList((pre) => [...pre, inputProduct]);
		setInputProduct(inputProductInit);
	};
	const handleSelectCategory = (category) => {
		let tmp = suppliers.filter((item) => item.category === category);
		setSupplierList(tmp);
		tmp = products.filter((item) => item.category === category);
		setProductList(tmp);
	};
	return (
		<div className="w-full flex justify-between h-full">
			<div className="w-8/12 p-3 flex flex-col h-full">
				<Card className="h-full p-3">
					<div className="flex justify-between pb-2">
						<div className="w-6/12">
							<Autocomplete
								value={inputProduct}
								onChange={(e, newValue) => {
									if (newValue) {
										setInputProduct({
											...inputProduct,
											id: newValue.id,
											name: newValue.name,
										});
									}
								}}
								filterOptions={(options, params) => {
									const filtered = filter(options, params);
									const { inputValue } = params;
									const isExitsting = options.some(
										(option) => inputValue === option.name
									);
									if (inputValue !== "" && !isExitsting) {
										filtered.push({
											inputValue,
											name: `Thêm "${inputValue}`,
										});
									}
									return filtered;
								}}
								selectOnFocus
								clearOnBlur
								handleHomeEndKeys
								options={productList}
								isOptionEqualToValue={(option, value) => {
									if (value && value !== "") {
										return option.id === value.id;
									} else return false;
								}}
								getOptionLabel={(option) => {
									if (typeof option === "string") {
										return option;
									}
									if (option.inputValue) {
										return option.inputValue;
									}
									return option.name;
								}}
								renderOption={(props, option) => (
									<li {...props}>{option.name}</li>
								)}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Chọn sản phẩm"
									/>
								)}
							/>
						</div>
						<div className="w-2/12">
							<TextField
								name="quantity"
								label="Số lượng"
								fullWidth
								value={inputProduct?.quantity}
								onChange={handleAddProductChange}
								onFocus={(e) => e.target.select()}
							/>
						</div>
						<div className="w-2/12">
							<TextField
								label="Đơn giá"
								name="price"
								fullWidth
								value={inputProduct?.price}
								onChange={handleAddProductChange}
								onFocus={(e) => e.target.select()}
							/>
						</div>
						<div className="w-2/12 ps-3">
							<Button
								onClick={handleAddProduct}
								fullWidth
								variant="contained"
								color="info"
								sx={{ height: "100%" }}>
								Thêm
							</Button>
						</div>
					</div>
					<Divider />
					<div className="h-full">
						<DataGrid
							rows={importList}
							columns={columns}
							autoPageSize
							getRowId={() => v4()}
						/>
					</div>
				</Card>
			</div>

			<div className="w-4/12 p-3 flex flex-col h-full">
				<Card className="h-full p-3">
					<div className="flex flex-col justify-between h-full">
						<div className="flex-grow">
							<TextField
								label="Số hóa đơn"
								name="invoiceNum"
								fullWidth
								onFocus={(e) => e.target.select()}
							/>

							<InputLabel id="categories-helper-label">
								Loại hàng
							</InputLabel>
							<Select
								labelId="categories-helper-label"
								label="Loại hàng"
								value={category}
								fullWidth
								onChange={(e) => {
									setCategory(e.target.value);
									handleSelectCategory(e.target.value);
								}}>
								<MenuItem value=""></MenuItem>
								{categoriesList.map((item) => (
									<MenuItem value={item} key={item}>
										{item}
									</MenuItem>
								))}
							</Select>

							<Autocomplete
								value={autoSuppliers}
								onChange={(e, newValue) => {
									if (newValue) {
										setAutoSuppliers(newValue);
									}
								}}
								filterOptions={(options, params) => {
									const filtered = filter(options, params);
									const { inputValue } = params;
									const isExitsting = options.some(
										(option) => inputValue === option.name
									);
									if (inputValue !== "" && !isExitsting) {
										filtered.push({
											inputValue,
											name: `Thêm "${inputValue}`,
										});
									}
									return filtered;
								}}
								selectOnFocus
								clearOnBlur
								handleHomeEndKeys
								options={supplierList}
								isOptionEqualToValue={(option, value) => {
									if (value && value !== "") {
										return option.id === value.id;
									} else return false;
								}}
								getOptionLabel={(option) => {
									if (typeof option === "string") {
										return option;
									}
									if (option.inputValue) {
										return option.inputValue;
									}
									return option.name;
								}}
								renderOption={(props, option) => (
									<li {...props}>{option.name}</li>
								)}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Chọn nhà cung cấp"
									/>
								)}
							/>

							<Divider sx={{ margin: "1em 0" }} />
							<Typography>Tiền hàng</Typography>
							<Typography>
								Tổng cộng: $
								{sumWithMultiplyFields(importList, [
									"quantity",
									"price",
								])}
							</Typography>
						</div>
						<div className="text-center">
							<Button
								variant="contained"
								color="success"
								fullWidth>
								Lưu
							</Button>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
}

export default ImportProductPage;
