import { Card } from "@mui/material";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import SettingFormCard from "~/components/SettingFormCard";
import { api, fetcherServer, getApiLink } from "~/server/api.server";

export async function loader({ request }) {
    const roles = await fetcherServer.get(getApiLink.base(api.type.roles));
    return json({
        roles: roles.data,
    });
}

const columnRoles = [
    {
        field: "title",
        title: "Vai trò",
    },
    {
        field: "right",
        title: "Phân quyền",
    },
];

function SettingPage() {
    const { roles } = useLoaderData();
    return (
        <div className="flex justify-between flex-wrap items-center">
            <div className="w-6/12 p-2">
                <SettingFormCard
                    columns={columnRoles}
                    items={roles}
                />
            </div>
            <div className="w-6/12 p-2">
                <Card sx={{ padding: "1em" }}>Setting 1</Card>
            </div>
        </div>
    );
}

export default SettingPage;
