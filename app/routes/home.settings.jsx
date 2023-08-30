import { Card } from "@mui/material";

function SettingPage() {
	return (
		<div className="flex justify-between flex-wrap items-center">
			<div className="w-6/12 p-2">
				<Card>Setting 1</Card>
			</div>
			<div className="w-6/12 p-2">
				<Card sx={{ padding: "1em" }}>Setting 1</Card>
			</div>
		</div>
	);
}

export default SettingPage;
