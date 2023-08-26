import { DataGrid } from "@mui/x-data-grid";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Button from "~/components/Buton";
import { api } from "~/config";
import { fetcher } from "~/server/api.server";

export const loader = async () => {
	const res = await fetcher.get(api.link.clients);
	return json(res.data);
};

const columns = [
	{ field: "name", headerName: "Tên khách hàng", width: 250 },
	{ field: "country", headerName: "Quốc Gia", width: 130 },
	{ field: "address", headerName: "Địa chỉ", width: 130 },
];

function ClientListPage() {
	const clientList = useLoaderData();
	return (
		<div className="h-full flex flex-col justify-start">
			<div className="flex justify-end mb-3">
				<Button variant={["edit"]}>Sửa</Button>
				<Button variant={["delete"]}>Xóa</Button>
			</div>
			<DataGrid rows={clientList} columns={columns} autoPageSize />
		</div>
	);
}

export default ClientListPage;
