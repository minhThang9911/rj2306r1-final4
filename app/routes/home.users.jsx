import { useLoaderData, useSubmit } from "@remix-run/react";
import { deleteData, editData, getData, postData } from "~/server/api.server";
import { json } from "@remix-run/node";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useCallback, useContext, useMemo, useState } from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
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
import { uploadImg } from "~/server/upload.server";
import { GlobalContext } from "~/root";
import { api, getApiLink } from "~/config/api";
import Img from "~/components/Img";

export const loader = async () => {
	const users = await getData(getApiLink.base(api.type.users));
	const roles = await getData(getApiLink.base(api.type.roles));
	return json({
		users,
		roles,
	});
};

export const action = async ({ request }) => {
	const { _action, ...data } = await request.json();
	switch (_action) {
		case "delete": {
			return await deleteData(getApiLink.withId(api.type.users, data.id));
		}
		case "update": {
			const imgUrl = await uploadImg(data.avatar[0]);
			if (imgUrl !== "error") {
				data.avatar[0] = imgUrl;
			}
			return await editData(
				getApiLink.withId(api.type.users, data.id),
				data
			);
		}
		case "add": {
			const imgUrl = await uploadImg(data.avatar[0]);
			if (imgUrl !== "error") {
				data.avatar[0] = imgUrl;
			}
			const { id, ...tmp } = data;
			return await postData(getApiLink.base(api.type.users), tmp);
		}
		default: {
			return data;
		}
	}
};

function UserListPage() {
	const submit = useSubmit();
	const { users, roles } = useLoaderData();
	const userRoles = useMemo(() => {
		return roles;
	}, [roles]);
	const [avatar, setAvatar] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [seletedUser, setSelectUser] = useState();
	const [seletedUserBackup, setSelectUserBackup] = useState();
	const [isNew, setIsNew] = useState(false);
	const { settings } = useContext(GlobalContext);
	const editUser = useCallback(
		(user) => () => {
			setAvatar(user.avatar);
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
			avatar !== seletedUser.avatar
		) {
			submit(
				{
					...seletedUser,
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
			avatar: "",
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
						<img
							className="cursor-pointer"
							src={param.row.avatar[0]}
							alt={param.row.fullName}
							onClick={editUser(param.row)}
						/>
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
			<DataGrid rows={users} columns={columns} autoPageSize />
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
									alt={seletedUser?.name}
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
											name="roleId"
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
									<TextField
										sx={{
											marginBottom: "2em",
										}}
										fullWidth
										variant="standard"
										label="Giới thiệu"
										value={seletedUser?.info}
										name="info"
										onChange={handleSelectUser}
										multiline
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

export default UserListPage;
