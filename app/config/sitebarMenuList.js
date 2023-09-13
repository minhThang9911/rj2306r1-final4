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
import ListAltIcon from "@mui/icons-material/ListAlt";
import EngineeringIcon from "@mui/icons-material/Engineering";

export const sidebarMainMenus = [
	{
		title: "Bảng thông tin",
		icon: DashboardIcon,
		link: "/home/dashboard",
		permision: 999,
	},
	{
		title: "Nhập hàng",
		icon: AddShoppingCartIcon,
		link: "/home/buy",
		permision: 1,
	},
	{
		title: "Xuất hàng",
		icon: DeliveryDiningIcon,
		link: "/home/sell",
		permision: 2,
	},
	{
		title: "Lịch sử giao dịch",
		icon: ImportExportIcon,
		link: "/home/history",
		permision: 3,
	},
	{
		title: "Hàng hóa",
		icon: StoreIcon,
		link: "/home/products",
		permision: 4,
	},
	{
		title: "Nhà cung ứng",
		icon: SupervisorAccountIcon,
		link: "/home/suppliers",
		permision: 5,
	},
	{
		title: "Khách hàng",
		icon: AssignmentIndIcon,
		link: "/home/customers",
		permision: 6,
	},
];
export const sidebarSettingMenus = [
	{
		title: "Danh sách khác",
		icon: ListAltIcon,
		link: "/home/otherlist",
		permision: 0,
	},
	{
		title: "Phân quyền",
		icon: EngineeringIcon,
		link: "/home/manager",
		permision: 0,
	},
	{
		title: "Nhân sự",
		icon: ManageAccountsIcon,
		link: "/home/users",
		permision: 0,
	},
	{
		title: "Cài đặt",
		icon: SettingsIcon,
		link: "/home/settings",
		permision: 0,
	},
	{
		title: "Thoát",
		icon: ExitToAppIcon,
		link: "/logout",
		permision: 999,
	},
];
