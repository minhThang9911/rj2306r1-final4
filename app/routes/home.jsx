import { Outlet } from "@remix-run/react";

import Header from "../views/layouts/Header";
import Footer from "../views/layouts/Footer";
import Sidebar from "../views/layouts/SideBar";
function HomePage() {
	return (
		<div className="h-screen w-full">
			<Sidebar>
				<header className="h-[57px]">
					<Header />
				</header>
				<main className="flex-grow pt-2">
					<Outlet />
				</main>
				<footer className="">
					<Footer />
				</footer>
			</Sidebar>
		</div>
	);
}

export default HomePage;
