import { useActionData } from "@remix-run/react";
import { uploadImg } from "~/server/upload.server";

function DashboardPage() {
	const res = useActionData();
	console.log(res);
	return (
		<div>
			<form method="post">
				<button type="submit">Test Upload</button>
			</form>
			<input
				type="file"
				value="upload"
				onChange={(e) => {
					console.log(e.target);
				}}
			/>
		</div>
	);
}

export const action = async ({ request, params }) => {
	const res = await uploadImg(
		"https://fonesmart.com.vn/upload_images/images/2023/03/11/hinh-nen-phi-hanh-gia-01.jpg"
	);
	return { res };
};
export default DashboardPage;
