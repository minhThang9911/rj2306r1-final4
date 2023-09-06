import axios from "axios";
import { api, getApiLink } from "~/config/api";

export const fetcherServer = axios.create({
	baseURL: api.baseUrl,
	timeout: 3000,
});

export const getListWithExpand = async (type, type2) => {
	const res = await fetcherServer.get(getApiLink.expand(type, type2));
	if (res?.data) {
		return res.data;
	} else {
		return { error: "No data" };
	}
};

export const getList = async (type) => {
	const res = await fetcherServer.get(getApiLink.base(type));
	if (res?.data) {
		return res.data;
	} else {
		return { error: "No data" };
	}
};

export const postData = async (type, data) => {
	const res = await fetcherServer.post(getApiLink.base(type), data);
	if (res?.data) {
		return res.data;
	} else {
		return { error: "Post error" };
	}
};

export const editData = async (type, data) => {
	const res = await fetcherServer.put(getApiLink.withId(type, data.id), data);
	if (res?.data) {
		return res.data;
	} else {
		return { error: "Edit error" };
	}
};
export const deleteData = async (type, id) => {
	const res = await fetcherServer.delete(getApiLink.withId(type, id));
	if (res?.data) {
		return res.data;
	} else {
		return { error: "Delete error" };
	}
};
