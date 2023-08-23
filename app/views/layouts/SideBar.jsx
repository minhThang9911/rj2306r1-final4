import { Link } from "@remix-run/react";
import sitebarMenuList from "~/config/sitebarMenuList";
function Sidebar() {
	return (
		<aside className="side-bar shrink-0 shadow-lg overflow-y-auto w-[290px]">
			<ul>
				{sitebarMenuList.map((item, index) => {
					let Icon = item.icon;
					return (
						<li
							key={index}
							className="shadow-sm hover:shadow-inner hover:bg-teal-100 hover:font-bold cursor-pointer">
							<Link to={item.link} className="block p-3">
								<Icon /> {item.title}
							</Link>
						</li>
					);
				})}
			</ul>
		</aside>
	);
}

export default Sidebar;
