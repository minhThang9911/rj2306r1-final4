import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
	sidebarMainMenus,
	sidebarSettingMenus,
} from "~/config/sitebarMenuList";
import { Link } from "@remix-run/react";

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

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />

			<Drawer variant="permanent" open={open}>
				<List>
					<ListItem
						key="menu"
						disablePadding
						sx={{ display: "block" }}>
						<ListItemButton
							onClick={() => setOpen(!open)}
							sx={{
								minHeight: 48,
								justifyContent: open ? "initial" : "center",
								px: 2.5,
							}}>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : "auto",
									justifyContent: "center",
								}}>
								<MenuIcon sx={{ opacity: open ? 0 : 1 }} />
							</ListItemIcon>
							<ListItemText
								sx={{
									opacity: open ? 1 : 0,
									textAlign: "right",
								}}>
								<ChevronLeftIcon />
							</ListItemText>
						</ListItemButton>
					</ListItem>
					<Divider />
					{sidebarMainMenus.map((item) => {
						const Icon = item.icon;
						return (
							<ListItem
								key={item.title}
								disablePadding
								sx={{ display: "block" }}>
								<ListItemButton
									component={Link}
									to={item.link}
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
									component={Link}
									to={item.link}
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
			<Box className="flex flex-col h-screen w-full justify-between">
				{children}
			</Box>
		</Box>
	);
}
