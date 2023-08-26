export const uploadImgFromFile = async (imgFile) => {
	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
	myHeaders.append("Cookie", "PHPSESSID=hhjsqhe7vk978rs0m4t2tch0vo");

	const urlencoded = new URLSearchParams();
	urlencoded.append("action", "upload");
	urlencoded.append(
		"source",
		"https://marketplace.canva.com/EAFQ4n79Fss/1/0/1600w/canva-m%C3%A0u-h%E1%BB%93ng-h%C3%ACnh-v%E1%BA%BD-c%C3%B4-g%C3%A1i-v%C3%A0-c%C3%A2u-n%C3%B3i-%C4%91%C3%A1ng-y%C3%AAu-h%C3%ACnh-n%E1%BB%81n-m%C3%A1y-t%C3%ADnh-jDWrpkilb-0.jpg"
	);

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
	return res;
};

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
myHeaders.append("Cookie", "PHPSESSID=hhjsqhe7vk978rs0m4t2tch0vo");

var urlencoded = new URLSearchParams();
urlencoded.append("action", "upload");
urlencoded.append(
	"source",
	"https://images.fpt.shop/unsafe/filters:quality(5)/fptshop.com.vn/uploads/images/tin-tuc/157755/Originals/hinh-nen-mau-hong%20(4).jpg"
);

var requestOptions = {
	method: "POST",
	headers: myHeaders,
	body: urlencoded,
	redirect: "follow",
};

fetch(
	"https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5",
	requestOptions
)
	.then((response) => response.text())
	.then((result) => console.log(result))
	.catch((error) => console.log("error", error));
