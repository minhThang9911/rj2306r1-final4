import { Outlet } from "@remix-run/react";

import Header from "../views/layouts/Header";
import Footer from "../views/layouts/Footer";
import Sidebar from "../views/layouts/SideBar";
function HomePage() {
    return (
        <div className="h-screen w-full">
            <Sidebar>
                <Header />
                <Outlet />
                <Footer />
            </Sidebar>
        </div>
    );
}

export default HomePage;
