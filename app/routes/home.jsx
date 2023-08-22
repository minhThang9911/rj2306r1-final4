import { Link, Outlet } from "@remix-run/react";
import sitebarMenuList from "../config/sitebarMenuList";
function HomePage() {
	return (
		<div className="h-screen w-full">
			<div className="header h-[10%]">Header</div>
			<div className="main flex justify-between py-5 h-[80%]">
				<aside className="side-bar shrink-0 shadow-lg overflow-y-auto w-[290px]">
					<ul>
						{sitebarMenuList.map((item, index) => (
							<li
								key={index}
								className="shadow-sm hover:shadow-inner hover:bg-teal-100 hover:font-bold cursor-pointer">
								<Link to={item.link} className="block p-3">
									{item.icon} {item.title}
								</Link>
							</li>
						))}
					</ul>
				</aside>
				<div className="w-auto grow overflow-y-auto px-4">
					<Outlet />
				</div>
			</div>
			<div className="footer h-[10%]">footer</div>
		</div>
	);
}

export default HomePage;
