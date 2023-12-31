import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import SettingFormCard from "~/components/SettingFormCard";
import { api, getApiLink } from "~/config/api";
import { deleteData, getData, postData } from "~/server/api.server";

export async function loader({ request }) {
	const roles = await getData(getApiLink.base(api.type.roles));
	const payments = await getData(getApiLink.base(api.type.payments));
	const categories = await getData(getApiLink.base(api.type.categories));
	return json({
		roles,
		payments,
		categories,
	});
}

export async function action({ request }) {
	const { _action, _apiType, id, ...data } = await request.json();
	switch (_action) {
		case "add": {
			return await postData(getApiLink.base(_apiType), data);
		}
		case "delete": {
			return await deleteData(getApiLink.withId(_apiType, id));
		}
		default: {
			return data;
		}
	}
}

// const columnPayments = [
// 	{
// 		field: "title",
// 		title: "Phương thức thanh toán",
// 	},
// ];
const columncategorie = [
	{
		field: "title",
		title: "Danh mục loại hàng",
	},
];

export default function OtherListPage() {
	const { categories } = useLoaderData();
	return (
		<div className="flex justify-between flex-wrap">
			{/* <div className="w-6/12 p-2">
				<SettingFormCard
					columns={columnPayments}
					items={payments}
					apiType={api.type.payments}
					settingTitle="Phương thức thanh toán"
				/>
			</div> */}
			<div className="w-6/12 p-2">
				<SettingFormCard
					columns={columncategorie}
					items={categories}
					apiType={api.type.categories}
					settingTitle="Danh mục hàng"
				/>
			</div>
		</div>
	);
}
