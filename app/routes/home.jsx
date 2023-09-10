import { Outlet } from "@remix-run/react";

import Header from "../views/layouts/Header";
import Footer from "../views/layouts/Footer";
import Sidebar from "../views/layouts/SideBar";
import { Paper } from "@mui/material";
import { requireUserId } from "~/server/auth.server";
export const loader = async ({ request }) => {
	await requireUserId(request);
	return null;
};
function HomePage() {
	return (
		<div className="h-screen w-full">
			<Sidebar>
				<header className="h-[57px] flex-none">
					<Header />
				</header>
				<main className="flex-grow p-2 overflow-auto">
					<Paper elevation={6} className="h-full">
						<div className="p-2 h-full overflow-auto">
							<Outlet />
						</div>
					</Paper>
				</main>
				<footer className="flex-none">
					<Footer />
				</footer>
			</Sidebar>
		</div>
	);
}

export default HomePage;
