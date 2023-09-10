import { redirect } from "@remix-run/node";
import { requireUserId } from "~/server/auth.server";

export const meta = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export const loader = async ({ request }) => {
	await requireUserId(request);
	return redirect("/home");
};
