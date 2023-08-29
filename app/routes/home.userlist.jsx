import { useLoaderData, useSubmit } from "@remix-run/react";
import { fetcherServer } from "~/server/api.server";
import { json } from "@remix-run/node";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";
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
} from "@mui/material";
import { api } from "~/config";
import { v4 } from "uuid";
import { uploadImg } from "~/server/upload.server";

export const loader = async () => {
	const res = await fetcherServer.get(api.link.users);
	return json(res.data);
};

export const action = async ({ request }) => {
	const { _action, ...data } = await request.json();
	switch (_action) {
		case "delete": {
			const res = await fetcherServer.delete(
				`${api.link.users}/${data.id}`
			);
			console.log(res);
			return data;
		}
		case "update": {
			const imgUrl = await uploadImg(
				data.avatar.replace("data:image/jpeg;base64,", "")
			);
			if (imgUrl !== "error") {
				data.avatar = imgUrl;
			}
			await fetcherServer.put(`${api.link.users}/${data.id}`, data);

			return data;
		}
		default: {
			return data;
		}
	}
};

function UserListPage() {
	const submit = useSubmit();
	const rows = useLoaderData();
	const [avatar, setAvatar] = useState("");
	const [openModal, setOpenModal] = useState(false);
	const [seletedUser, setSelectUser] = useState();
	const [seletedUserBackup, setSelectUserBackup] = useState();

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
					_action: "update",
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
		setOpenModal(false);
	};

	const handleNew = () => {
		setAvatar("/img/placeholder-image.jpg");
		setSelectUser({
			id: v4(),
			avatar: "",
			name: "",
			role: "",
			email: "",
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
					return <img src={param.row.avatar} alt={param.row.name} />;
				},
			},
			{ field: "name", headerName: "Tên", flex: 3 },
			{ field: "role", headerName: "Vai trò", flex: 2 },
			{ field: "email", headerName: "Email", flex: 3 },
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
		[editUser, submit]
	);

	return (
		<div className="h-full flex flex-col justify-start">
			<div className="mb-2 flex justify-between">
				<div></div>
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
			<DataGrid rows={rows} columns={columns} autoPageSize />
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
										src={avatar}
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
								<div className="flex-grow">
									<TextField
										sx={{
											marginBottom: "2em",
										}}
										fullWidth
										variant="standard"
										label="Tên người dùng"
										value={seletedUser?.name}
										name="name"
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
											value={seletedUser?.role}
											label="Vai trò"
											name="role"
											onChange={handleSelectUser}>
											<MenuItem value={"admin"}>
												Admin
											</MenuItem>
											<MenuItem value={"subAdmin"}>
												Sub Admin
											</MenuItem>
											<MenuItem value={"manager"}>
												Manager
											</MenuItem>
											<MenuItem value={"seller"}>
												Seller
											</MenuItem>
										</Select>
									</FormControl>
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
