import { Outlet } from "@remix-run/react";

import Header from "../views/layouts/Header";
import Footer from "../views/layouts/Footer";
import Sidebar from "../views/layouts/SideBar";
function HomePage() {
	return (
		<div className="h-screen w-full">
			<Header />
			<div className="main flex justify-between py-5 h-[80%]">
				<Sidebar />
				<div className="w-auto grow overflow-y-auto px-4">
					<Outlet />
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default HomePage;
