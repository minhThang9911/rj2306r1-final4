import axios from "axios";
import { api, getApiLink } from "~/config/api";
import { calcStock } from "~/utils/calc";

export const fetcherServer = axios.create({
	baseURL: api.baseUrl,
	timeout: 3000,
});

const fetchData =
	(kind) =>
	async (...params) => {
		const res = await fetcherServer[kind](...params);
		if (res?.data) {
			return res.data;
		} else {
			return { error: `Error ${kind}` };
		}
	};

export const getData = fetchData("get");
export const postData = fetchData("post");
export const editData = fetchData("put");
export const deleteData = fetchData("delete");

export const getProductWithStock = async () => {
	const listProducts = await getData(getApiLink.base(api.type.products));
	const listSells = await getData(getApiLink.base(api.type.sells));
	const listBuys = await getData(getApiLink.base(api.type.buys));
	return calcStock(listBuys, listSells, listProducts);
};
