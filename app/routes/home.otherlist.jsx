import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import SettingFormCard from "~/components/SettingFormCard";
import { api, getApiLink } from "~/config/api";
import { fetcherServer } from "~/server/api.server";

export async function loader({ request }) {
	const roles = await fetcherServer.get(getApiLink.base(api.type.roles));
	const payments = await fetcherServer.get(
		getApiLink.base(api.type.payments)
	);
	const categories = await fetcherServer.get(
		getApiLink.base(api.type.categories)
	);
	return json({
		roles: roles.data,
		payments: payments.data,
		categories: categories.data,
	});
}

export async function action({ request }) {
	const { _action, _apiLink, id, ...data } = await request.json();
	switch (_action) {
		case "add": {
			await fetcherServer.post(_apiLink, data);
			return data;
		}
		default: {
			return data;
		}
	}
}

const columnRoles = [
	{
		field: "title",
		title: "Vai trò",
	},
	{
		field: "right",
		title: "Phân quyền",
	},
];

const columnPayments = [
	{
		field: "title",
		title: "Phương thức thanh toán",
	},
];
const columncategorie = [
	{
		field: "title",
		title: "Danh mục loại hàng",
	},
];

export default function OtherListPage() {
	const { roles, payments, categories } = useLoaderData();
	return (
		<div className="flex justify-between flex-wrap">
			<div className="w-4/12 p-2">
				<SettingFormCard
					columns={columnRoles}
					items={roles}
					apiLink={getApiLink.base(api.type.roles)}
					settingTitle="Vai Trò"
				/>
			</div>
			<div className="w-4/12 p-2">
				<SettingFormCard
					columns={columnPayments}
					items={payments}
					apiLink={getApiLink.base(api.type.payments)}
					settingTitle="Phương thức thanh toán"
				/>
			</div>
			<div className="w-4/12 p-2">
				<SettingFormCard
					columns={columncategorie}
					items={categories}
					apiLink={getApiLink.base(api.type.categories)}
					settingTitle="Danh mục hàng"
				/>
			</div>
		</div>
	);
}
