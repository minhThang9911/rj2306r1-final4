import { useSubmit } from "@remix-run/react";
import { useEffect } from "react";
import { logout } from "~/server/auth.server";

export const action = async ({ request }) => logout(request);

export default function Logout() {
	const submit = useSubmit();
	useEffect(() => {
		submit(null, {
			method: "POST",
			action: "/logout",
		});
	}, [submit]);
	return <p>Loging out...</p>;
}
