import {
	Box,
	Button,
	Card,
	CardContent,
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

function SettingFormCard({ items, columns, apiType, settingTitle = "" }) {
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
				<Typography variant="h5">{settingTitle}</Typography>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								{columns.map((col) => (
									<TableCell
										key={col.field}
										sx={{
											fontWeight: "bold",
										}}>
										{col.title}
									</TableCell>
								))}
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{items.map((item, index) => (
								<TableRow key={index}>
									{columns.map((col) => (
										<TableCell key={col.field}>
											{item[col.field]}
										</TableCell>
									))}
									<TableCell key="action">
										<Button
											color="error"
											fullWidth
											onClick={() => handleDelete(item)}>
											<DeleteIcon />
										</Button>
									</TableCell>
								</TableRow>
							))}
							<TableRow>
								{columns.map((col, index) => (
									<TableCell key={index}>
										<TextField
											required
											id="outlined-required"
											label={col.title}
											name={col.field}
											key={index}
											value={setting[col.field] || ""}
											onChange={handleChange}
											fullWidth
										/>
									</TableCell>
								))}
								<TableCell key="add">
									<Button
										onClick={handleSave}
										variant="contained"
										color="success"
										type="submit"
										fullWidth
										sx={{
											display: "block",
											height: "4em",
										}}>
										Thêm
									</Button>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</CardContent>
		</Card>
	);
}

export default SettingFormCard;
