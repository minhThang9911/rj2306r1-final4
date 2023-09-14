const baseUrl = "https://api.minhthang.site/";
export const api = {
	baseUrl,
	type: {
		settings: "settings",
		roles: "roles",
		payments: "payments",
		categories: "categories",
		users: "users",
		suppliers: "suppliers",
		customers: "customers",
		products: "products",
		orders: "orders",
		stocks: "stocks",
		appinfo: "appinfo",
		buys: "buys",
		sells: "sells",
		regcode: "regcode",
	},
};

export const getApiLink = {
	base: (type) => type,
	withId: (type, id) => `${type}/${id}`,
	withParams: (type, param) => `${type}?${param}`,
	expand: (type, type2) => `${type}?_expand=${type2}`,
	filter: (type, field, keyword) => `${type}?${field}=${keyword}`,
};
