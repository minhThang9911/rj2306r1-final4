import {
	Autocomplete,
	Button,
	Card,
	Divider,
	TextField,
	Typography,
	createFilterOptions,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { json } from "@remix-run/node";
import { useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import { v4 } from "uuid";
import { api, getApiLink } from "~/config/api";
import { fetcherServer } from "~/server/api.server";
import DeleteIcon from "@mui/icons-material/Delete";
import { sumWithMultiplyFields } from "~/utils/calc";
import { useSnackbar } from "notistack";

export const loader = async () => {
	const products = await fetcherServer.get(
		getApiLink.expand(api.type.products, api.type.categories)
	);
	const productsData = products.data.map((item) => ({
		id: item.id,
		name: item.name,
		category: item.categories.title,
	}));
	const customers = await fetcherServer.get(
		getApiLink.base(api.type.customers)
	);
	const customersData = customers.data.map((item) => ({
		id: item.id,
		name: item.name,
	}));
	return json({
		productList: productsData,
		customerList: customersData,
	});
};

export const action = async ({ request }) => {
	try {
		const data = await request.json();
		const res = await fetcherServer.post(
			getApiLink.base(api.type.sells),
			data
		);
		return { data: res.data };
	} catch (e) {
		return { error: "Có lỗi xãy ra!!" };
	}
};

const filter = createFilterOptions();
const inputProductInit = {
	id: 1,
	name: "",
	quantity: 0,
	price: 0,
};

export default function SellProductPage() {
	const { productList, customerList } = useLoaderData();
	const [inputProduct, setInputProduct] = useState(inputProductInit);
	const actionData = useActionData();
	const { enqueueSnackbar } = useSnackbar();
	const [autocustomers, setAutocustomers] = useState(customerList[0]);
	const [exportList, setExportList] = useState([]);
	const submit = useSubmit();

	useEffect(() => {
		if (actionData?.data) {
			enqueueSnackbar("Thêm thành công", { variant: "success" });
			setExportList([]);
		}
		if (actionData?.error) {
			enqueueSnackbar(actionData.error, { variant: "error" });
		}
	}, [actionData, enqueueSnackbar]);

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
							setExportList((pre) =>
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
		setExportList((pre) => [...pre, inputProduct]);
		setInputProduct(inputProductInit);
	};
	const handSubmit = () => {
		const tmp = exportList.map((item) => ({
			productsId: item.id,
			quantity: Number(item.quantity),
			price: Number(item.price),
		}));
		const data = {
			customersId: autocustomers.id,
			products: tmp,
			createAt: new Date().toISOString(),
		};

		submit(data, {
			method: "POST",
			encType: "application/json",
		});
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
									<li {...props} key={option.id}>
										{option.name}
									</li>
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
							rows={exportList}
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
							<Autocomplete
								sx={{ marginBottom: "1em" }}
								value={autocustomers}
								onChange={(e, newValue) => {
									if (newValue) {
										setAutocustomers(newValue);
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
								options={customerList}
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
										label="Chọn Khách hàng"
									/>
								)}
							/>

							<Divider sx={{ margin: "1em 0" }} />
							<Typography>Tiền hàng</Typography>
							<Typography>
								Tổng cộng: $
								{sumWithMultiplyFields(exportList, [
									"quantity",
									"price",
								])}
							</Typography>
						</div>
						<div className="text-center">
							<Button
								onClick={handSubmit}
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
