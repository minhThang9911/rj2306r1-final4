import logo from "./logo.svg";
import chatIcon from "./chatIcon.svg";
import bellIcon from "./bellIcon.svg";
function Header() {
	return (
		<div className="2xl:container 2xl:mx-auto h-full">
			<div className="bg-white rounded shadow-lg h-full">
				<nav className="flex justify-between h-full">
					<div className="flex items-center space-x-3 lg:pr-16 pr-6 ps-5">
						<img src={logo} alt="Logo" />
						<h2 className="font-normal text-2xl leading-6 text-gray-800">
							MT Inventory
						</h2>
					</div>

					<div className=" flex space-x-5 justify-center items-center pl-2 pe-5">
						<div className="relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 ">
							<img src={chatIcon} alt="Chat" />
							<div className="animate-ping w-1.5 h-1.5 bg-indigo-700 rounded-full absolute -top-1 -right-1 m-auto duration-200"></div>
							<div className=" w-1.5 h-1.5 bg-indigo-700 rounded-full absolute -top-1 -right-1 m-auto shadow-lg"></div>
						</div>
						<img
							className="cursor-pointer"
							src={bellIcon}
							alt="Notification"
						/>
					</div>
				</nav>
			</div>
		</div>
	);
}

export default Header;
