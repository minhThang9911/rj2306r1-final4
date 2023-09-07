import { useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import { deleteData, editData, getData, postData } from "~/server/api.server";
import { json } from "@remix-run/node";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useCallback, useContext, useMemo, useState } from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Fade, Modal, TextField, Typography } from "@mui/material";
import { v4 } from "uuid";
import { uploadImg } from "~/server/upload.server";
import { GlobalContext } from "~/root";
import { api, getApiLink } from "~/config/api";
import Img from "~/components/Img";

export const loader = async () => {
	const customers = await getData(getApiLink.base(api.type.customers));
	return json(customers);
};

export const action = async ({ request }) => {
	const { _action, ...data } = await request.json();
	switch (_action) {
		case "delete": {
			return await deleteData(
				getApiLink.withId(api.type.customers, data.id)
			);
		}
		case "update": {
			const imgUrl = await uploadImg(data.avatar[0]);
			if (imgUrl !== "error") {
				data.avatar[0] = imgUrl;
			}
			return await editData(
				getApiLink.withId(api.type.customers, data.id),
				data
			);
		}
		case "add": {
			const imgUrl = await uploadImg(data.avatar[0]);
			if (imgUrl !== "error") {
				data.avatar[0] = imgUrl;
			}
			const { id, ...tmp } = data;
			return await postData(getApiLink.base(api.type.customers), tmp);
		}
		default: {
			return data;
		}
	}
};

function CustomerListPage() {
	const submit = useSubmit();
	const customers = useLoaderData();
	const [avatar, setAvatar] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [seletedCustomer, setSelectCustomer] = useState();
	const [seletedCustomerBackup, setSelectCustomerBackup] = useState();
	const [isNew, setIsNew] = useState(false);
	const aaa = useActionData();
	console.log("post data", aaa);
	const { settings } = useContext(GlobalContext);
	const editCustomer = useCallback(
		(customer) => () => {
			setAvatar(customer.avatar);
			setSelectCustomer(customer);
			setSelectCustomerBackup(customer);
			setOpenModal(true);
		},
		[]
	);
	const handleSelectCustomer = (e) => {
		setSelectCustomer({
			...seletedCustomer,
			[e.target.name]: e.target.value,
		});
	};
	const handleSaveCustomer = async () => {
		if (
			JSON.stringify(seletedCustomer) !==
				JSON.stringify(seletedCustomerBackup) ||
			avatar !== seletedCustomer.avatar
		) {
			submit(
				{
					...seletedCustomer,
					_action: isNew ? "add" : "update",
					avatar,
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
		setAvatar(["/img/placeholder-image.jpg"]);
		setSelectCustomer({
			id: v4(),
			name: "",
			email: "",
			country: "",
			avatar: "",
			info: "",
			phone: "",
			birthday: "",
			address: "",
			regDate: new Date().toISOString(),
		});
		setOpenModal(true);
	};

	const columns = useMemo(
		() => [
			{
				field: "img",
				headerName: "",
				flex: 1,
				renderCell: (param) => {
					return (
						<img src={param.row.avatar} alt={param.row.fullName} />
					);
				},
			},
			{ field: "name", headerName: "Tên khách hàng", flex: 3 },
			{ field: "email", headerName: "Email", flex: 3 },
			{ field: "phone", headerName: "Điện thoại", flex: 3 },
			{ field: "country", headerName: "Quốc gia", flex: 3 },

			{
				field: "actions",
				type: "actions",
				flex: 2,
				getActions: (params) => [
					<GridActionsCellItem
						key={"b"}
						icon={<EditIcon />}
						label="Sửa"
						onClick={editCustomer(params.row)}
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
		[editCustomer, submit]
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
			<DataGrid rows={customers} columns={columns} autoPageSize />
			<Modal
				open={openModal}
				onClose={() => setOpenModal(false)}
				closeAfterTransition>
				<Fade in={openModal}>
					<div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-10/12 h-5/6 rounded-xl p-3">
						<div className="flex justify-between h-full">
							<div className="w-6/12 flex flex-col h-full p-5 justify-center">
								<Img
									images={avatar}
									index={0}
									src={avatar[0]}
									setImages={setAvatar}
									alt={seletedCustomer?.name}
								/>
							</div>

							<div className="w-6/12 flex flex-col h-full p-5">
								<div className="flex-grow overflow-y-auto">
									<TextField
										sx={{
											marginBottom: "2em",
										}}
										fullWidth
										variant="standard"
										label="Tên khách hàng"
										value={seletedCustomer?.name}
										name="name"
										onChange={handleSelectCustomer}
									/>
									<TextField
										sx={{
											marginBottom: "2em",
										}}
										fullWidth
										variant="standard"
										label="Email"
										value={seletedCustomer?.email}
										name="email"
										onChange={handleSelectCustomer}
									/>
									<TextField
										sx={{
											marginBottom: "2em",
										}}
										fullWidth
										variant="standard"
										label="Quốc gia"
										value={seletedCustomer?.fullName}
										name="country"
										onChange={handleSelectCustomer}
									/>
									<TextField
										sx={{
											marginBottom: "2em",
										}}
										fullWidth
										variant="standard"
										label="Số điện thoại"
										value={seletedCustomer?.phone}
										name="phone"
										onChange={handleSelectCustomer}
									/>
									<TextField
										sx={{
											marginBottom: "2em",
										}}
										fullWidth
										variant="standard"
										label="Ngày sinh"
										value={seletedCustomer?.birthday}
										name="birthday"
										onChange={handleSelectCustomer}
									/>
									<TextField
										sx={{
											marginBottom: "2em",
										}}
										fullWidth
										variant="standard"
										label="Địa chỉ"
										value={seletedCustomer?.address}
										name="address"
										onChange={handleSelectCustomer}
									/>

									<TextareaAutosize
										className="w-full text-sm font-normal font-sans leading-5 p-3 rounded-xl rounded-br-none shadow-md shadow-slate-100 focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 focus:border-purple-500 bg-white text-slate-900 focus-visible:outline-0"
										aria-label="Giới thiệu"
										placeholder="Giới thiệu"
										name="info"
										onChange={handleSelectCustomer}
									/>
								</div>
								<div className="flex-shrink-0 flex justify-around">
									<Button
										variant="contained"
										color="success"
										onClick={handleSaveCustomer}>
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
					</div>
				</Fade>
			</Modal>
		</div>
	);
}

export default CustomerListPage;
