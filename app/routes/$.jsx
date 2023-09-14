import { Typography } from "@mui/material";
import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";

function PageNotFount() {
	const navigate = useNavigate();
	const [count, setCount] = useState(5);
	useEffect(() => {
		const id = setTimeout(() => {
			setCount((pre) => --pre);
		}, 1000);
		if (count === 0) {
			navigate("home/dashboard");
		}
		return () => clearTimeout(id);
	}, [count, navigate]);
	return (
		<div className="flex justify-center items-center w-screen h-screen text-center">
			<div>
				<Typography variant="h1" color="gray" fontSize="17em">
					404
				</Typography>
				<Typography variant="h4" color="gray" marginBottom="1em">
					Trang không tồn tại, quay lại trang chủ trong
				</Typography>
				<Typography
					variant="h4"
					color="red"
					fontSize="5em"
					fontWeight="bold">
					{count}
				</Typography>
			</div>
		</div>
	);
}

export default PageNotFount;
