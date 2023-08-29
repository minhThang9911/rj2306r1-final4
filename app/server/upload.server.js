export const uploadImg = async (imgString) => {
	console.log("Start upload");
	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
	myHeaders.append("Cookie", "PHPSESSID=hhjsqhe7vk978rs0m4t2tch0vo");

	const urlencoded = new URLSearchParams();
	urlencoded.append("action", "upload");
	urlencoded.append("source", imgString);

	const requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: urlencoded,
		redirect: "follow",
	};

	const res = await fetch(
		"https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5",
		requestOptions
	).then((response) => response.json());
	console.log("End upload");
	return res;
};
