import logo from "./logo.svg";
import chatIcon from "./chatIcon.svg";
import bellIcon from "./bellIcon.svg";
function Header() {
	return (
		<div className="2xl:container 2xl:mx-auto h-[10%]">
			<div className="bg-white rounded shadow-lg py-5 px-7">
				<nav className="flex justify-between">
					<div className="flex items-center space-x-3 lg:pr-16 pr-6">
						<img src={logo} alt="Logo" />
						<h2 className="font-normal text-2xl leading-6 text-gray-800">
							MT Inventory
						</h2>
					</div>

					<div className=" flex space-x-5 justify-center items-center pl-2">
						<div className="relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 ">
							<img src={chatIcon} alt="Chat" />
							<div className="animate-ping w-1.5 h-1.5 bg-indigo-700 rounded-full absolute -top-1 -right-1 m-auto duration-200"></div>
							<div className=" w-1.5 h-1.5 bg-indigo-700 rounded-full absolute -top-1 -right-1 m-auto shadow-lg"></div>
						</div>

						<img src={bellIcon} alt="Notification" />
					</div>
				</nav>
			</div>
		</div>
	);
}

export default Header;
