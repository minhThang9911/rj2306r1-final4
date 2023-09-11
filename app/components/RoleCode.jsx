import {
	Button,
	Card,
	CardContent,
	FormControl,
	InputLabel,
	List,
	ListItem,
	MenuItem,
	Select,
	Typography,
} from "@mui/material";
import { useSubmit } from "@remix-run/react";
import randomstring from "randomstring";
import { useState } from "react";
import { submitOption } from "~/config/constant";

export const action = async ({ request }) => {
	const data = await request.json();
	console.log(data);
	return null;
};

export default function RoleCode({ regCode }) {
	const submit = useSubmit();
	const [regCodeRoleSelect, setRegCodeRoleSelect] = useState(regCode[0].id);
	const handleAddCode = () => {
		const randomCode = randomstring.generate(10);
		submit(
			{
				_action: "regAdd",
				rolesId: regCodeRoleSelect,
				code: randomCode,
			},
			submitOption
		);
	};
	return (
		<Card sx={{ padding: "0.5em" }}>
			<CardContent>
				<Typography variant="h5" sx={{ marginBottom: "0.5em" }}>
					Tạo mã đăng ký
				</Typography>
				<div className="flex justify-between">
					{regCode.map((item) => {
						return (
							<div className="w-2/12" key={item.id}>
								<Card sx={{ padding: "1em" }}>
									<Typography variant="h5">
										{item.title}
									</Typography>
									<List>
										{item.codes.length > 0 &&
											item.codes.map((item) => {
												return (
													<ListItem key={item}>
														{item}
													</ListItem>
												);
											})}
									</List>
								</Card>
							</div>
						);
					})}
					<div className="w-2/12">
						<Card sx={{ padding: "1em" }}>
							<Typography
								variant="h5"
								sx={{ marginBottom: "0.5em" }}>
								Tạo mã
							</Typography>
							<FormControl fullWidth>
								<InputLabel id="role-select-label">
									Vai trò
								</InputLabel>
								<Select
									labelId="role-select-label"
									id="role-select"
									label="Vai trò"
									name="role"
									value={regCodeRoleSelect}
									onChange={(e) =>
										setRegCodeRoleSelect(e.target.value)
									}>
									{regCode.map((item) => {
										return (
											<MenuItem
												value={item.id}
												key={item.title}>
												{item.title}
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
							<Button
								onClick={handleAddCode}
								fullWidth
								variant="contained"
								color="info"
								sx={{ marginTop: "1em" }}>
								Thêm mã
							</Button>
						</Card>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
