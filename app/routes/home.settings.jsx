import { Button, TextField } from "@mui/material";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { api, getApiLink } from "~/config/api";
import { editData, getData } from "~/server/api.server";

export async function loader({ request }) {
	const appInfo = await getData(getApiLink.base(api.type.appinfo));

	return json(appInfo[0]);
}

export async function action({ request }) {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	return await editData(getApiLink.withId(api.type.appinfo, 1), data);
}

function SettingPage() {
	const [appInfo, setAppInfo] = useState(useLoaderData());
	const handleChange = (e) => {
		setAppInfo({
			...appInfo,
			[e.target.name]: e.target.value,
		});
	};
	return (
		<Form className="flex justify-center flex-col" method="POST">
			<input name="id" value={1} hidden />
			<TextField
				sx={{
					marginBottom: "2em",
				}}
				fullWidth
				variant="standard"
				label="Tên cửa hàng"
				value={appInfo?.name}
				name="name"
				onChange={handleChange}
			/>
			<TextField
				sx={{
					marginBottom: "2em",
				}}
				fullWidth
				variant="standard"
				label="Email"
				value={appInfo?.email}
				onChange={handleChange}
				name="email"
			/>
			<TextField
				sx={{
					marginBottom: "2em",
				}}
				fullWidth
				variant="standard"
				label="Địa chỉ"
				value={appInfo?.address}
				onChange={handleChange}
				name="address"
			/>
			<TextField
				sx={{
					marginBottom: "2em",
				}}
				fullWidth
				variant="standard"
				label="Số điện thoại"
				value={appInfo?.phone}
				onChange={handleChange}
				name="phone"
			/>
			<TextField
				sx={{
					marginBottom: "2em",
				}}
				fullWidth
				variant="standard"
				label="Mã số thuế"
				value={appInfo?.tax}
				onChange={handleChange}
				name="tax"
			/>
			<Button variant="contained" color="success" type="submit">
				Lưu thông tin
			</Button>
		</Form>
	);
}

export default SettingPage;
