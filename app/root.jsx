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
import { Provider } from "react-redux";
import store from "./redux/store";
export const links = () => [
    { rel: "stylesheet", href: cssBundleHref },
    { rel: "stylesheet", href: tailwind },
];

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
                <Provider store={store}>
                    <Outlet />
                </Provider>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
