function THead({ thead }) {
	return (
		<thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
			<tr>
				{Array.isArray(thead) &&
					thead.map((item, index) => {
						return (
							<th scope="col" className="px-6 py-3" key={index}>
								{item}
							</th>
						);
					})}
			</tr>
		</thead>
	);
}

export default THead;
