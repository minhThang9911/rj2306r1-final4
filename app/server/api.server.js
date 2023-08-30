import axios from "axios";

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
    },
};

export const getApiLink = {
    base: (type) => type,
    withId: (type, id) => `${type}/${id}`,
};

export const fetcherServer = axios.create({
    baseURL: baseUrl,
    timeout: 3000,
});
