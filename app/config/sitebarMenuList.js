import DashboardIcon from "@mui/icons-material/Dashboard";
import StoreIcon from "@mui/icons-material/Store";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";

const sitebarMenuList = [
	{
		title: "Bảng thông tin",
		icon: DashboardIcon,
		link: "/home/dashboard",
		role: "view_dashboard",
	},
	{
		title: "Nhập hàng",
		icon: AddShoppingCartIcon,
		link: "/home/importproduct",
		role: "view_store",
	},
	{
		title: "Xuất hàng",
		icon: DeliveryDiningIcon,
		link: "/home/exportproduct",
		role: "view_store",
	},
	{
		title: "Lịch sử giao dịch",
		icon: ImportExportIcon,
		link: "/home/history",
		role: "view_store",
	},
	{
		title: "Hàng hóa",
		icon: StoreIcon,
		link: "/home/productlist",
		role: "view_stock",
	},
	{
		title: "Nhà cung ứng",
		icon: SupervisorAccountIcon,
		link: "/home/vendorlist",
		role: "view_product",
	},
	{
		title: "Khách hàng",
		icon: AssignmentIndIcon,
		link: "/home/clientlist",
		role: "view_client",
	},
	{
		title: "Nhân sự",
		icon: ManageAccountsIcon,
		link: "/home/userlist",
		role: "view_carrier",
	},
	{
		title: "Cài đặt",
		icon: SettingsIcon,
		link: "/home/settings",
		role: "view_provider",
	},
	{
		title: "Thoát",
		icon: ExitToAppIcon,
		link: "/home/exit",
		role: "view_provider",
	},
];
export default sitebarMenuList;
