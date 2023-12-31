export const uploadImg = async (imgString) => {
	if (imgString.startsWith("data:image/jpeg;base64,")) {
		console.log("Start upload");
		const base64String = imgString.replace("data:image/jpeg;base64,", "");
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
		const urlencoded = new URLSearchParams();
		urlencoded.append("action", "upload");
		urlencoded.append("source", base64String);

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: urlencoded,
			redirect: "follow",
		};
		try {
			const res = await fetch(
				"https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5",
				requestOptions
			).then((response) => response.json());
			console.log("End upload");
			return res.image.url;
		} catch (e) {
			return "error";
		}
	}
	console.log("No need upload....");
	return imgString;
};
