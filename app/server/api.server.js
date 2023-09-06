import axios from "axios";
import { api, getApiLink } from "~/config/api";

export const fetcherServer = axios.create({
	baseURL: api.baseUrl,
	timeout: 3000,
});

export const getList = async (type) => {
	const res = await fetcherServer.get(getApiLink.base(type));
	if (res?.data) {
		return res.data;
	} else {
		return { error: "No data" };
	}
};

export const getListWithExpand = async (type, type2) => {
	const res = await fetcherServer.get(getApiLink.expand(type, type2));
	if (res?.data) {
		return res.data;
	} else {
		return { error: "No data" };
	}
};
