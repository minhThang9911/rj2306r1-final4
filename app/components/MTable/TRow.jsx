import { Link } from "@remix-run/react";

function TRow({ trow }) {
	return (
		<tr className="bg-white border-b   hover:bg-gray-50 ">
			{Array.isArray(trow) &&
				trow.map((item, index) => {
					if (index === 0) {
						return (
							<th
								key={index}
								scope="row"
								className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
								{item}
							</th>
						);
					}
					return (
						<td key={index} className="px-6 py-4 text-right">
							{/* {typeof item === "object" ? (
								<Link
									to={item.link}
									className="font-medium text-blue-600  hover:underline">
									{item.text}
								</Link>
							) : (
								item
							)} */}
							{JSON.stringify(item)}
						</td>
					);
				})}
		</tr>
	);
}

export default TRow;
