import { redirect } from "@remix-run/node";

export const meta = () => {
    return [
        { title: "New Remix App" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

export const loader = async ({ request }) => {
    return redirect("/home");
};
