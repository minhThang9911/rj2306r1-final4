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
			<button
				onClick={() => {
					const data =
						"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgF";
					console.log(data.replace("data:image/jpeg;base64,", ""));
				}}>
				Test
			</button>
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
