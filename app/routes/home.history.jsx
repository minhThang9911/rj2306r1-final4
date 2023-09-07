import { DataGrid } from "@mui/x-data-grid";
import { Outlet, useLoaderData } from "@remix-run/react";
import { useMemo } from "react";
import { api, getApiLink } from "~/config/api";
import { getData } from "~/server/api.server";
import { toVietnameseDateTime } from "~/utils/date";

export const loader = async ({ request }) => {
	const buys = await getData(
		getApiLink.expand(api.type.buys, api.type.suppliers)
	);
	const sells = await getData(
		getApiLink.expand(api.type.sells, api.type.customers)
	);
	return {
		buyList: buys,
		sellList: sells,
	};
};

export default function HistoryPage() {
	const { buyList, sellList } = useLoaderData();
	const historyList = useMemo(() => {
		const b = [...buyList];
		b.forEach((item) => {
			if (!item.id.toString().includes("b")) {
				item.id = item.id + "b";
			}
		});
		const s = [...sellList];
		s.forEach((item) => {
			if (!item.id.toString().includes("s")) {
				item.id = item.id + "s";
			}
		});
		const r = [...b, ...s];
		r.sort((x, y) =>
			x.createAt < y.createAt ? -1 : x.createAt > y.createAt ? 1 : 0
		);

		return r;
	}, [buyList, sellList]);
	const columns = useMemo(() => {
		return [
			{ field: "id", headerName: "ID", flex: 1 },
			{
				field: "partner",
				headerName: "Đối tác",
				flex: 2,
				valueGetter: (params) => {
					if (params.row?.customers) {
						return params.row?.customers.name;
					}
					if (params.row?.suppliers) {
						return params.row.suppliers.name;
					}
					return "";
				},
			},
			{
				field: "itemCount",
				headerName: "Số lượng hàng",
				flex: 2,
				type: "number",
				valueGetter: (params) => {
					if (params.row?.products) {
						return params.row.products.length;
					}
					return "";
				},
			},

			{
				field: "time",
				headerName: "Thời gian",
				flex: 2,
				valueGetter: (params) => {
					const d = new Date(params.row.createAt);
					return toVietnameseDateTime(d);
				},
			},

			{
				field: "type",
				headerName: "Giao dịch",
				flex: 2,
				valueGetter: (params) => {
					return params.row.id.includes("b") ? "Mua" : "Bán";
				},
			},
		];
	}, []);
	return (
		<div style={{ height: "100%", width: "100%" }}>
			<DataGrid rows={historyList} columns={columns} autoPageSize />
			<Outlet />
		</div>
	);
}
