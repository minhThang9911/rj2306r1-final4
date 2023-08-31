import axios from "axios";
import { api } from "~/config/api";

export const fetcherServer = axios.create({
    baseURL: api.baseUrl,
    timeout: 3000,
});
