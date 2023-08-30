import { cssBundleHref } from "@remix-run/css-bundle";

import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import tailwind from "./styles/app.css";
import { createContext, useState } from "react";
export const links = () => [
    { rel: "stylesheet", href: cssBundleHref },
    { rel: "stylesheet", href: tailwind },
];

export const GlobalContext = createContext({});
const GlobalProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        theme: "light",
        currentPageTitle: "",
    });
    const changeSettings = {
        toggleTheme: () => {
            setSettings({
                ...setSettings,
                theme: "light" ? "dark" : "light",
            });
        },
        changePageTitle: (title) => {
            setSettings({
                ...setSettings,
                currentPageTitle: title,
            });
        },
    };

    return (
        <GlobalContext.Provider value={{ settings, changeSettings }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default function App() {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body>
                <GlobalProvider>
                    <Outlet />
                </GlobalProvider>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
