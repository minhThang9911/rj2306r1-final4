import THead from "./THead";
import TRow from "./TRow";

function MTable({ tbdata }) {
	return (
		<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
			<table className="w-full text-sm text-left text-gray-500 ">
				<THead thead={tbdata.thead} />
				<tbody>
					<TRow trow={tbdata.trow} />
				</tbody>
			</table>
		</div>
	);
}

export default MTable;
