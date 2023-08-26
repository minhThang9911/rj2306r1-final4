import { useLoaderData } from "@remix-run/react";
import { fetcherServer, getUserList } from "~/server/api.server";
import { json } from "@remix-run/node";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";
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
	SvgIcon,
	TextField,
} from "@mui/material";
import { api } from "~/config";
import { fetcherClient } from "~/api";
import { v4 } from "uuid";

export const loader = async () => {
	const res = await fetcherServer.get(api.link.users);

	return json(res.data);
};

function UserListPage() {
	const [rows, setRows] = useState(useLoaderData());
	const [openModal, setOpenModal] = useState(false);
	const [seletedUser, setSelectUser] = useState();
	const [isNew, setIsNew] = useState(false);
	const deleteUser = useCallback(
		(id) => () => {
			setTimeout(() => {
				setRows((pre) => pre.filter((row) => row.id !== id));
			});
		},
		[]
	);
	const editUser = useCallback(
		(user) => () => {
			setSelectUser(user);
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
		const tmp = [...rows];
		if (isNew) {
			await fetcherClient.post(api.link.users, seletedUser);
			tmp.push(seletedUser);
		} else {
			await fetcherClient.put(
				`${api.link.users}/${seletedUser.id}`,
				seletedUser
			);
			const index = rows.findIndex((item) => item.id === seletedUser.id);
			tmp[index] = seletedUser;
		}
		setRows(tmp);
		setIsNew(false);
		setOpenModal(false);
	};

	const handleNew = () => {
		setIsNew(true);
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
						label="Duplace"
						onClick={editUser(params.row)}
					/>,
					<GridActionsCellItem
						key={"a"}
						icon={<DeleteIcon />}
						label="Xóa"
						onClick={deleteUser(params.row.id)}
					/>,
				],
			},
		],
		[deleteUser, editUser]
	);

	return (
		<div className="h-full flex flex-col justify-start">
			<div className="mb-2 flex justify-between">
				<div></div>
				<Button
					onClick={handleNew}
					className="block"
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
										src={seletedUser?.avatar}
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
										<input type="file" hidden />
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
								<div className="flex-shrink-0 text-center">
									<Button
										variant="contained"
										color="success"
										onClick={handleSaveUser}>
										Lưu thay đổi
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
