import {
	Button,
	Card,
	CardContent,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import { useSubmit } from "@remix-run/react";
import { useMemo, useState, useCallback } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function RoleCodeFormCard({
	items,
	columns,
	apiType,
	settingTitle = "",
}) {
	const submit = useSubmit();
	const initialObj = useMemo(() => {
		const res = columns.reduce((obj, current) => {
			obj[current.field] = "";
			return obj;
		}, {});
		return res;
	}, [columns]);
	const [setting, setSetting] = useState(initialObj);
	const handleChange = useCallback((e) => {
		setSetting((pre) => ({
			...pre,
			[e.target.name]: e.target.value,
		}));
	}, []);
	const handleSave = () => {
		submit(
			{
				_action: "add",
				_apiType: apiType,
				...setting,
			},
			{
				method: "POST",
				encType: "application/json",
			}
		);
		setSetting(initialObj);
	};
	const handleDelete = (item) => {
		submit(
			{
				_action: "delete",
				_apiType: apiType,
				...item,
			},
			{
				method: "POST",
				encType: "application/json",
			}
		);
	};
	return (
		<Card sx={{ padding: "1em" }}>
			<CardContent>
				<Typography variant="h5">Tạo mã đăng ký</Typography>
				<FormControl fullWidth>
					<InputLabel id="role-select-label">Vai trò</InputLabel>
					<Select
						labelId="role-select-label"
						id="role-select"
						value={seletedSupplier?.roleId}
						label="Vai trò"
						name="role"
						onChange={handleSelectSupplier}>
						{categoriesList.map((item) => {
							return (
								<MenuItem value={item.id} key={item.id}>
									{item.title}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
				<Button
					onClick={handleSave}
					variant="contained"
					color="success"
					type="submit"
					sx={{
						height: "100%",
					}}>
					Thêm
				</Button>
			</CardContent>
		</Card>
	);
}
