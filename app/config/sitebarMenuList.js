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
        pemision: "any",
    },
    {
        title: "Nhập hàng",
        icon: AddShoppingCartIcon,
        link: "/home/importproduct",
        pemision: "any",
    },
    {
        title: "Xuất hàng",
        icon: DeliveryDiningIcon,
        link: "/home/exportproduct",
        pemision: "any",
    },
    {
        title: "Lịch sử giao dịch",
        icon: ImportExportIcon,
        link: "/home/storage",
        pemision: "any",
    },
    {
        title: "Hàng hóa",
        icon: StoreIcon,
        link: "/home/productlist",
        pemision: "any",
    },
    {
        title: "Nhà cung ứng",
        icon: SupervisorAccountIcon,
        link: "/home/vendorlist",
        pemision: "any",
    },
    {
        title: "Khách hàng",
        icon: AssignmentIndIcon,
        link: "/home/clientlist",
        pemision: "any",
    },
    {
        title: "Nhân sự",
        icon: ManageAccountsIcon,
        link: "/home/userlist",
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
export default sitebarMenuList;
