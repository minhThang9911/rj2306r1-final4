import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const createWrapper = (wrapperId) => {
	const wrapper = document.createElement("div");
	wrapper.setAttribute("id", wrapperId);
	document.appendChild(wrapper);
	return wrapper;
};

function Portal({ children, wrapperId }) {
	const [wrapper, setWrapper] = useState();
	useEffect(() => {
		let element = document.getElementById(wrapperId);
		let created = false;
		if (!element) {
			created = true;
			element = createWrapper(wrapperId);
		}
		setWrapper(element);
		return () => {
			if (created && element?.parentNode) {
				element.parentNode.removeChild(element);
			}
		};
	}, [wrapperId]);
	if (wrapper === null) return null;
	return createPortal(children, wrapper);
}

export default Portal;
