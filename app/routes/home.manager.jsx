import {
	Card,
	CardContent,
	Checkbox,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { orange, pink, yellow } from "@mui/material/colors";
import { json } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import { produce } from "immer";
import { useState } from "react";
import RoleCode from "~/components/RoleCode";
import { api, getApiLink } from "~/config/api";
import { submitOption } from "~/config/constant";
import { editData, getData, postData } from "~/server/api.server";

const convertPermisionStringToCheckboxData = (str) => {
	const permisionCode = str.split("");
	const res = Array(str.length).fill(false);
	res.forEach((value, index) => {
		res[index] = Boolean(Number(permisionCode[index]));
	});
	return res;
};
const convertCheckboxDataToPermisionString = (checkboxData) =>
	checkboxData.reduce((pre, curr) => pre + Number(curr).toString(), "");

export const loader = async ({ request }) => {
	const roleList = await getData(getApiLink.base(api.type.roles));
	const regCodeList = await getData(getApiLink.base(api.type.regcode));
	const roles = [];
	const regCodes = [];
	roleList.forEach((item) => {
		const permis = convertPermisionStringToCheckboxData(item.permision);
		const data = {
			id: item.id,
			title: item.title,
			permis,
		};
		roles.push(data);
		regCodes.push({
			id: item.id,
			title: item.title,
			codes: [],
		});
	});
	regCodeList.forEach((item) => {
		const index = regCodes.findIndex((i) => i.id === item.rolesId);
		regCodes[index].codes.push(item.code);
	});
	return json({
		roles,
		regCodes,
	});
};

export const action = async ({ request }) => {
	const { _action, ...data } = await request.json();

	switch (_action) {
		case "regAdd": {
			return await postData(getApiLink.base(api.type.regcode), data);
		}
		case "permisionUpdate": {
			console.log(data);
			return await editData(
				getApiLink.withId(api.type.roles, data.id),
				data
			);
		}
		default:
			return data;
	}
};

export default function ManagerPage() {
	const submit = useSubmit();
	const { roles, regCodes } = useLoaderData();
	const [permision, setPermision] = useState(roles);

	const handleChange = (e, index, index2) => {
		setPermision(
			produce((draft) => {
				draft[index].permis[index2] = e.target.checked;
				submit(
					{
						_action: "permisionUpdate",
						id: draft[index].id,
						title: draft[index].title,
						permision: convertCheckboxDataToPermisionString(
							draft[index].permis
						),
					},
					submitOption
				);
			})
		);
	};

	return (
		<div className="flex justify-between flex-wrap">
			<div className="w-full p-3">
				<Card sx={{ padding: "1em" }}>
					<CardContent>
						<Typography variant="h5">Phân quyền</Typography>
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell rowSpan={2}>
											<Typography variant="h6">
												Vai trò
											</Typography>
										</TableCell>
										<TableCell colSpan={7} align="center">
											<Typography variant="h6">
												Quyền
											</Typography>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											<Typography variant="h6">
												Admin
											</Typography>
										</TableCell>
										<TableCell>
											<Typography variant="h6">
												Nhập hàng
											</Typography>
										</TableCell>
										<TableCell>
											<Typography variant="h6">
												Bán hàng
											</Typography>
										</TableCell>
										<TableCell>
											<Typography variant="h6">
												Lịch sử
											</Typography>
										</TableCell>
										<TableCell>
											<Typography variant="h6">
												Tồn kho
											</Typography>
										</TableCell>
										<TableCell>
											<Typography variant="h6">
												Khách Mua
											</Typography>
										</TableCell>
										<TableCell>
											<Typography variant="h6">
												Khách bán
											</Typography>
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{permision.length > 0 &&
										permision.map((item, index) => (
											<TableRow key={index}>
												<TableCell align="center">
													{item.title}
												</TableCell>
												<TableCell align="center">
													<Checkbox
														checked={item.permis[0]}
														onChange={(e) =>
															handleChange(
																e,
																index,
																0
															)
														}
													/>
												</TableCell>
												<TableCell align="center">
													<Checkbox
														color="secondary"
														checked={item.permis[1]}
														onChange={(e) =>
															handleChange(
																e,
																index,
																1
															)
														}
													/>
												</TableCell>
												<TableCell align="center">
													<Checkbox
														checked={item.permis[2]}
														color="success"
														onChange={(e) =>
															handleChange(
																e,
																index,
																2
															)
														}
													/>
												</TableCell>
												<TableCell align="center">
													<Checkbox
														checked={item.permis[3]}
														color="default"
														onChange={(e) =>
															handleChange(
																e,
																index,
																3
															)
														}
													/>
												</TableCell>
												<TableCell align="center">
													<Checkbox
														checked={item.permis[4]}
														onChange={(e) =>
															handleChange(
																e,
																index,
																4
															)
														}
														sx={{
															color: yellow[800],
															"&.Mui-checked": {
																color: yellow[600],
															},
														}}
													/>
												</TableCell>
												<TableCell align="center">
													<Checkbox
														onChange={(e) =>
															handleChange(
																e,
																index,
																5
															)
														}
														checked={item.permis[5]}
														sx={{
															color: orange[800],
															"&.Mui-checked": {
																color: orange[600],
															},
														}}
													/>
												</TableCell>
												<TableCell align="center">
													<Checkbox
														onChange={(e) =>
															handleChange(
																e,
																index,
																6
															)
														}
														checked={item.permis[6]}
														sx={{
															color: pink[800],
															"&.Mui-checked": {
																color: pink[600],
															},
														}}
													/>
												</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						</TableContainer>
					</CardContent>
				</Card>
			</div>
			<div className="w-full p-1">
				<RoleCode regCode={regCodes} />
			</div>
		</div>
	);
}
