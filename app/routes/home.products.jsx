import { useLoaderData, useSubmit } from "@remix-run/react";
import { api, fetcherServer, getApiLink } from "~/server/api.server";
import { json } from "@remix-run/node";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useCallback, useContext, useMemo, useState } from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FileBase64 from "react-file-base64";
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
import { uploadImg } from "~/server/upload.server";
import { GlobalContext } from "~/root";

export const loader = async () => {
	const products = await fetcherServer.get(
		getApiLink.base(api.type.products)
	);
	const categories = await fetcherServer.get(
		getApiLink.base(api.type.categories)
	);
	return json({
		products: products.data,
		categories: categories.data,
	});
};

export const action = async ({ request }) => {
	const { _action, ...data } = await request.json();
	switch (_action) {
		case "delete": {
			await fetcherServer.delete(`${api.link.products}/${data.id}`);
			return data;
		}
		case "update": {
			const imgUrl = await uploadImg(data.images);
			if (imgUrl !== "error") {
				data.images = imgUrl;
			}
			await fetcherServer.put(
				getApiLink.withId(api.type.products, data.id),
				data
			);
			return data;
		}
		case "add": {
			console.log("adding");
			const imgUrl = await uploadImg(data.images);
			if (imgUrl !== "error") {
				data.images = imgUrl;
			}
			const { id, ...tmp } = data;
			await fetcherServer.post(getApiLink.base(api.type.products), tmp);
			return data;
		}
		default: {
			return data;
		}
	}
};

export default function UserListPage() {
	const submit = useSubmit();
	const { products, categories } = useLoaderData();
	const userRoles = useMemo(() => {
		return categories;
	}, [categories]);
	const [images, setAvatar] = useState("");
	const [openModal, setOpenModal] = useState(false);
	const [seletedUser, setSelectUser] = useState();
	const [seletedUserBackup, setSelectUserBackup] = useState();
	const [isNew, setIsNew] = useState(false);
	const { settings } = useContext(GlobalContext);
	const editUser = useCallback(
		(user) => () => {
			setAvatar(user.images);
			setSelectUser(user);
			setSelectUserBackup(user);
			setOpenModal(true);
		},
		[]
	);
	const handleSelectUser = (e) => {
		setSelectUser({
			...seletedUser,
			[e.target.name]: e.target.value,
		});
	};
	const handleSaveUser = async () => {
		if (
			JSON.stringify(seletedUser) !== JSON.stringify(seletedUserBackup) ||
			images !== seletedUser.images
		) {
			submit(
				{
					...seletedUser,
					_action: isNew ? "add" : "update",
					images,
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
		setAvatar("/img/placeholder-image.jpg");
		setSelectUser({
			id: v4(),
			settingId: 1,
			roleId: 1,
			username: "",
			email: "",
			password: "",
			fullName: "",
			regDate: new Date().toISOString(),
			country: "",
			images: "",
			info: "",
			phone: "",
			birthday: "",
			address: "",
			lastLogin: "",
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
						<img src={param.row.images} alt={param.row.fullName} />
					);
				},
			},
			{ field: "username", headerName: "Tên đăng nhập", flex: 3 },
			{ field: "fullName", headerName: "Tên", flex: 3 },
			{ field: "email", headerName: "Email", flex: 3 },
			{
				field: "role",
				headerName: "Vai trò",
				flex: 2,
				valueGetter: (params) => {
					return userRoles.find(
						(item) => item.id === params.row.roleId
					).title;
				},
			},

			{
				field: "actions",
				type: "actions",
				flex: 2,
				getActions: (params) => [
					<GridActionsCellItem
						key={"b"}
						icon={<EditIcon />}
						label="Sửa"
						onClick={editUser(params.row)}
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
		[editUser, submit, userRoles]
	);

	return (
		<div className="h-full flex flex-col justify-start">
			<div className="mb-2 flex justify-between">
				<div>
					<Typography variant="h4" component="h1">
						Nhân sự
					</Typography>
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
			<DataGrid rows={products} columns={columns} autoPageSize />
			<Modal
				open={openModal}
				onClose={() => setOpenModal(false)}
				closeAfterTransition>
				<Fade in={openModal}>
					<div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-10/12 h-5/6 rounded-xl p-3">
						<div className="flex justify-between h-full">
							<div className="w-6/12 flex flex-col h-full p-5">
								<div className="flex-grow relative">
									<img
										className="block w-full rounded-3xl absolute top-[50%] translate-y-[-50%]"
										src={images}
										alt={seletedUser?.name}
									/>
								</div>
								<div className="flex-shrink-0 text-center">
									<Button
										component="label"
										role={undefined}
										tabIndex={-1}
										variant="outlined"
										color="info">
										Đổi Avartar
										<FileBase64
											multiple={false}
											onDone={({ base64 }) => {
												setAvatar(base64);
											}}
											onChange={(e) => e.target.files[0]}
										/>
									</Button>
								</div>
							</div>
							<div className="w-6/12 flex flex-col h-full p-5">
								<div className="flex-grow overflow-y-auto">
									<TextField
										sx={{
											marginBottom: "2em",
										}}
										fullWidth
										variant="standard"
										label="Tên đăng nhập"
										value={seletedUser?.username}
										name="username"
										onChange={handleSelectUser}
									/>
									<TextField
										sx={{
											marginBottom: "2em",
										}}
										fullWidth
										variant="standard"
										label="Mật khẩu"
										value={seletedUser?.password}
										name="password"
										onChange={handleSelectUser}
									/>
									<TextField
										sx={{
											marginBottom: "2em",
										}}
										fullWidth
										variant="standard"
										label="Tên người dùng"
										value={seletedUser?.fullName}
										name="fullName"
										onChange={handleSelectUser}
									/>
									<TextField
										sx={{
											marginBottom: "2em",
										}}
										fullWidth
										variant="standard"
										label="Email"
										value={seletedUser?.email}
										name="email"
										onChange={handleSelectUser}
									/>
									<FormControl fullWidth>
										<InputLabel id="user-role-select-label">
											Vai trò
										</InputLabel>
										<Select
											labelId="user-role-select-label"
											id="demo-simple-select"
											value={seletedUser?.roleId}
											label="Vai trò"
											name="role"
											onChange={handleSelectUser}>
											{userRoles.map((item) => {
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
										label="Nước"
										value={seletedUser?.country}
										name="country"
										onChange={handleSelectUser}
									/>
									<TextField
										sx={{
											marginBottom: "2em",
										}}
										fullWidth
										variant="standard"
										label="Số điện thoại"
										value={seletedUser?.phone}
										name="phone"
										onChange={handleSelectUser}
									/>
									<TextField
										sx={{
											marginBottom: "2em",
										}}
										fullWidth
										variant="standard"
										label="Sinh nhật"
										value={seletedUser?.birthday}
										name="birthday"
										onChange={handleSelectUser}
									/>
									<TextField
										sx={{
											marginBottom: "2em",
										}}
										fullWidth
										variant="standard"
										label="Địa chỉ"
										value={seletedUser?.address}
										name="address"
										onChange={handleSelectUser}
									/>
									<TextareaAutosize
										className="w-full text-sm font-normal font-sans leading-5 p-3 rounded-xl rounded-br-none shadow-md shadow-slate-100 focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 focus:border-purple-500 bg-white text-slate-900 focus-visible:outline-0"
										aria-label="Giới thiệu"
										placeholder="Giới thiệu"
										name="info"
										onChange={handleSelectUser}
									/>
								</div>
								<div className="flex-shrink-0 flex justify-around">
									<Button
										variant="contained"
										color="success"
										onClick={handleSaveUser}>
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
