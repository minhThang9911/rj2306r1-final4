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

export const sidebarMainMenus = [
	{
		title: "Bảng thông tin",
		icon: DashboardIcon,
		link: "/home/dashboard",
		pemision: "any",
	},
	{
		title: "Nhập hàng",
		icon: AddShoppingCartIcon,
		link: "/home/import",
		pemision: "any",
	},
	{
		title: "Xuất hàng",
		icon: DeliveryDiningIcon,
		link: "/home/export",
		pemision: "any",
	},
	{
		title: "Lịch sử giao dịch",
		icon: ImportExportIcon,
		link: "/home/orders",
		pemision: "any",
	},
	{
		title: "Hàng hóa",
		icon: StoreIcon,
		link: "/home/products",
		pemision: "any",
	},
	{
		title: "Nhà cung ứng",
		icon: SupervisorAccountIcon,
		link: "/home/suppliers",
		pemision: "any",
	},
	{
		title: "Khách hàng",
		icon: AssignmentIndIcon,
		link: "/home/customers",
		pemision: "any",
	},
];
export const sidebarSettingMenus = [
	{
		title: "Danh sách khác",
		icon: ListAltIcon,
		link: "/home/otherlist",
		pemision: "any",
	},

	{
		title: "Nhân sự",
		icon: ManageAccountsIcon,
		link: "/home/users",
		pemision: "any",
	},
	{
		title: "Cài đặt",
		icon: SettingsIcon,
		link: "/home/settings",
		pemision: "any",
	},
	{
		title: "Thoát",
		icon: ExitToAppIcon,
		link: "/home/exit",
		pemision: "any",
	},
];
