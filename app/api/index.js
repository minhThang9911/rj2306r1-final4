import axios from "axios";
import { api } from "~/server/api.server";

export const fetcherClient = axios.create({
    baseURL: api.baseUrl,
    timeout: 3000,
});
