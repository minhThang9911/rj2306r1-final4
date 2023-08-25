import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "~/config";
import { userSlice } from "~/redux/CRUDSlices";
import { fetcher } from "~/utils/api";

export const meta = () => {
    return [
        { title: "New Remix App" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

export const loader = async ({ request }) => {
    const res = await fetcher.get(api.link.users);
    return json(res.data);
    // return redirect("/home");
};

export default function IndexPage() {
    const data = useLoaderData();
    return <div>{JSON.stringify(data)}</div>;
}
