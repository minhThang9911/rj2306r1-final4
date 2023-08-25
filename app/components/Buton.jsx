import { Link } from "@remix-run/react";

export default function Button({ children, onClick, to, variant }) {
	let Component = "button";
	let click = onClick;
	let base = "font-bold py-2 px-4 rounded ms-2";
	if (variant.includes("delete")) {
		base += " bg-red-500 hover:bg-red-700 text-white";
	}
	if (variant.includes("edit")) {
		base += " bg-blue-500 hover:bg-blue-700 text-white";
	}
	if (typeof onClick === "function" && typeof to === "string") {
		click = (e) => {
			onClick(e);
			window.location.href = window.location.origin + to;
		};
	} else {
		Component = Link;
	}

	return (
		<Component onClick={click} className={base}>
			{children}
		</Component>
	);
}
