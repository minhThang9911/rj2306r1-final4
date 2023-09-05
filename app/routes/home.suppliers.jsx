import { useLoaderData, useSubmit } from "@remix-run/react";
import { fetcherServer } from "~/server/api.server";
import { json } from "@remix-run/node";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useCallback, useContext, useMemo, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
	Button,
	Fade,
	FormControl,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { v4 } from "uuid";
import { GlobalContext } from "~/root";
import { api, getApiLink } from "~/config/api";

export const loader = async () => {
	const suppliers = await fetcherServer.get(
		getApiLink.base(api.type.suppliers)
	);
	const categories = await fetcherServer.get(
		getApiLink.base(api.type.categories)
	);
	return json({
		suppliers: suppliers.data,
		categories: categories.data,
	});
};

export const action = async ({ request }) => {
	const { _action, ...data } = await request.json();
	switch (_action) {
		case "delete": {
			await fetcherServer.delete(
				getApiLink.withId(api.type.suppliers, data.id)
			);
			return data;
		}
		case "update": {
			await fetcherServer.put(
				getApiLink.withId(api.type.suppliers, data.id),
				data
			);
			return data;
		}
		case "add": {
			console.log("adding");
			const { id, ...tmp } = data;
			await fetcherServer.post(getApiLink.base(api.type.suppliers), tmp);
			return data;
		}
		default: {
			return data;
		}
	}
};

function SupplierPage() {
	const submit = useSubmit();
	const { suppliers, categories } = useLoaderData();
	const categoriesList = useMemo(() => {
		return categories;
	}, [categories]);

	const [openModal, setOpenModal] = useState(false);
	const [seletedSupplier, setSelectSupplier] = useState();
	const [seletedSupplierBackup, setSelectSupplierBackup] = useState();
	const [isNew, setIsNew] = useState(false);
	const { settings } = useContext(GlobalContext);
	const editSupplier = useCallback(
		(supplier) => () => {
			setSelectSupplier(supplier);
			setSelectSupplierBackup(supplier);
			setOpenModal(true);
		},
		[]
	);
	const handleSelectSupplier = (e) => {
		setSelectSupplier({
			...seletedSupplier,
			[e.target.name]: e.target.value,
		});
	};
	const handleSaveSupplier = async () => {
		if (
			JSON.stringify(seletedSupplier) !==
			JSON.stringify(seletedSupplierBackup)
		) {
			submit(
				{
					...seletedSupplier,
					_action: isNew ? "add" : "update",
				},
				{
					method: "POST",
					encType: "application/json",
				}
			);
		} else {
			console.log("no change");
		}
		setIsNew(false);
		setOpenModal(false);
	};

	const handleNew = () => {
		setIsNew(true);
		setSelectSupplier({
			id: v4(),
			categoriesId: 1,
			name: "",
			email: "",
			phone: "",
			address: "",
			regDate: new Date().toISOString(),
		});
		setOpenModal(true);
	};

	const columns = useMemo(
		() => [
			{ field: "name", headerName: "Tên", flex: 3 },
			{
				field: "categories",
				headerName: "Hàng cung cấp",
				flex: 2,
				valueGetter: (params) => {
					return categoriesList.find(
						(item) => item.id === params.row.categoriesId
					).title;
				},
			},
			{ field: "email", headerName: "Email", flex: 3 },
			{ field: "phone", headerName: "Điện thoại", flex: 3 },
			{ field: "address", headerName: "Địa chỉ", flex: 3 },
			{
				field: "actions",
				type: "actions",
				flex: 2,
				getActions: (params) => [
					<GridActionsCellItem
						key={"b"}
						icon={<EditIcon />}
						label="Sửa"
						onClick={editSupplier(params.row)}
					/>,
					<GridActionsCellItem
						key={"a"}
						icon={<DeleteIcon />}
						label="Xóa"
						onClick={() =>
							submit(
								{
									_action: "delete",
									...params.row,
								},
								{
									method: "POST",
									encType: "application/json",
								}
							)
						}
					/>,
				],
			},
		],
		[editSupplier, submit, categoriesList]
	);

	return (
		<div className="h-full flex flex-col justify-start">
			<div className="mb-2 flex justify-between">
				<div>
					<Typography variant="h4" component="h1"></Typography>
				</div>
				<Button
					sx={{
						marginRight: "1em",
					}}
					onClick={handleNew}
					variant="contained"
					color="info">
					Thêm mới
				</Button>
			</div>
			<DataGrid rows={suppliers} columns={columns} autoPageSize />
			<Modal
				open={openModal}
				onClose={() => setOpenModal(false)}
				closeAfterTransition>
				<Fade in={openModal}>
					<div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-10/12 h-5/6 rounded-xl p-3">
						<div className="flex flex-col justify-between h-full">
							<div className="flex-grow overflow-y-auto">
								<TextField
									sx={{
										marginBottom: "2em",
									}}
									fullWidth
									variant="standard"
									label="Tên nhà cung cấp"
									value={seletedSupplier?.name}
									name="name"
									onChange={handleSelectSupplier}
								/>
								<FormControl fullWidth>
									<InputLabel id="categories-select-label">
										Hàng hóa cung cấp
									</InputLabel>
									<Select
										labelId="categories-select-label"
										id="demo-simple-select"
										value={seletedSupplier?.roleId}
										label="Hàng hóa cung cấp"
										name="categoriesId"
										onChange={handleSelectSupplier}>
										{categoriesList.map((item) => {
											return (
												<MenuItem
													value={item.id}
													key={item.id}>
													{item.title}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>

								<TextField
									sx={{
										marginBottom: "2em",
									}}
									fullWidth
									variant="standard"
									label="Email"
									value={seletedSupplier?.email}
									name="email"
									onChange={handleSelectSupplier}
								/>
								<TextField
									sx={{
										marginBottom: "2em",
									}}
									fullWidth
									variant="standard"
									label="Số điện thoại"
									value={seletedSupplier?.phone}
									name="phone"
									onChange={handleSelectSupplier}
								/>
								<TextField
									sx={{
										marginBottom: "2em",
									}}
									fullWidth
									variant="standard"
									label="Địa chỉ"
									value={seletedSupplier?.address}
									name="address"
									onChange={handleSelectSupplier}
								/>
							</div>
							<div className="flex-shrink-0 flex justify-around">
								<Button
									variant="contained"
									color="success"
									onClick={handleSaveSupplier}>
									Lưu thay đổi
								</Button>
								<Button
									variant="contained"
									color="warning"
									onClick={() => setOpenModal(false)}>
									Bỏ qua
								</Button>
							</div>
						</div>
					</div>
				</Fade>
			</Modal>
		</div>
	);
}

export default SupplierPage;
