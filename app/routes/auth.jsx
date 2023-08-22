import { Outlet } from "@remix-run/react";

function AuthPage() {
	return (
		<div>
			<h1>Trang đăng ký</h1>
			<Outlet />
		</div>
	);
}

export default AuthPage;
