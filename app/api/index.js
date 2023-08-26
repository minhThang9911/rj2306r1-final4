import axios from "axios";
import { api } from "~/config";

export const fetcherClient = axios.create({
	baseURL: api.baseUrl,
	timeout: 3000,
});
