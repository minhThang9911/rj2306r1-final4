import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
    sidebarMainMenus,
    sidebarSettingMenus,
} from "~/config/sitebarMenuList";
import { useNavigate } from "@remix-run/react";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

export default function Sidebar({ children }) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            <Drawer
                variant="permanent"
                open={open}>
                <DrawerHeader>
                    <IconButton
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={() => {
                            setOpen(!open);
                        }}>
                        {open ? <ChevronLeftIcon /> : <MenuIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {sidebarMainMenus.map((item) => {
                        const Icon = item.icon;
                        return (
                            <ListItem
                                key={item.title}
                                disablePadding
                                sx={{ display: "block" }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open
                                            ? "initial"
                                            : "center",
                                        px: 2.5,
                                    }}>
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : "auto",
                                            justifyContent: "center",
                                        }}>
                                        <Icon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.title}
                                        sx={{ opacity: open ? 1 : 0 }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
                <Divider />
                <List>
                    {sidebarSettingMenus.map((item) => {
                        const Icon = item.icon;
                        return (
                            <ListItem
                                key={item.title}
                                disablePadding
                                sx={{ display: "block" }}>
                                <ListItemButton
                                    onClick={navigate(item.link)}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open
                                            ? "initial"
                                            : "center",
                                        px: 2.5,
                                    }}>
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : "auto",
                                            justifyContent: "center",
                                        }}>
                                        <Icon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.title}
                                        sx={{ opacity: open ? 1 : 0 }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3 }}>
                {children}
            </Box>
        </Box>
    );
}

// import { Link } from "@remix-run/react";
// import sitebarMenuList from "~/config/sitebarMenuList";
// function Sidebar() {
// 	return (

// 		<aside className="side-bar shrink-0 shadow-lg overflow-y-auto w-[290px]">
// 			<ul>
// 				{sitebarMenuList.map((item, index) => {
// 					let Icon = item.icon;
// 					return (
// 						<li
// 							key={index}
// 							className="shadow-sm hover:shadow-inner hover:bg-teal-100 hover:font-bold cursor-pointer">
// 							<Link to={item.link} className="block p-3">
// 								<Icon /> {item.title}
// 							</Link>
// 						</li>
// 					);
// 				})}
// 			</ul>
// 		</aside>
// 	);
// }

// export default Sidebar;
