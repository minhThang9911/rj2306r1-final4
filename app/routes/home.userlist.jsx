import { useLoaderData } from "@remix-run/react";
import { fetcher } from "~/server/api.server";
import { api } from "~/config";
import { json } from "@remix-run/node";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";

export const loader = async () => {
	const res = await fetcher.get(api.link.users);
	return json(res.data);
};

function UserListPage() {
	const [rows, setRows] = useState(useLoaderData());
	const deleteUser = useCallback(
		(id) => () => {
			setTimeout(() => {
				setRows((pre) => pre.filter((row) => row.id !== id));
			});
		},
		[]
	);
	const duplicateUser = useCallback(
		(id) => () => {
			setRows((prevRows) => {
				const rowToDuplicate = prevRows.find((row) => row.id === id);
				return [...prevRows, { ...rowToDuplicate, id: Date.now() }];
			});
		},
		[]
	);

	const columns = useMemo(
		() => [
			{
				field: "img",
				headerName: "",
				renderCell: (param) => {
					return <img src={param.row.avatar} alt={param.row.name} />;
				},
			},
			{ field: "name", headerName: "Tên", width: 130 },
			{ field: "role", headerName: "Vai trò", width: 130 },
			{ field: "email", headerName: "Email", width: 130 },
			{
				field: "actions",
				type: "actions",
				width: 80,
				getActions: (params) => [
					<GridActionsCellItem
						key={"a"}
						icon={<DeleteIcon />}
						label="Xóa"
						onClick={deleteUser(params.row.id)}
					/>,
					<GridActionsCellItem
						key={"b"}
						icon={<FileCopyIcon />}
						label="Duplace"
						onClick={duplicateUser(params.row.id)}
					/>,
				],
			},
		],
		[duplicateUser, deleteUser]
	);

	return (
		<div className="h-full flex flex-col justify-start">
			<DataGrid rows={rows} columns={columns} autoPageSize />
		</div>
	);
}

export default UserListPage;
