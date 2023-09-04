const baseUrl = "http://localhost:3004/";
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
	},
};

export const getApiLink = {
	base: (type) => type,
	withId: (type, id) => `${type}/${id}`,
	withParams: (type, param) => `${type}?${param}`,
	expand: (type, type2) => `${type}?_expand=${type2}`,
};
