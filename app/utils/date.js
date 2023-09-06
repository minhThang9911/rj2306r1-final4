const dateOptions = {
	weekday: "long",
	year: "numeric",
	month: "long",
	day: "numeric",
};

export const toVietnameseDate = (date) =>
	date.toLocaleDateString("vi-VI", dateOptions);

export const toVietnameseDateTime = (date) =>
	date.toLocaleDateString("vi-VI", dateOptions) +
	" " +
	date.toLocaleTimeString("vi-VI");
