import MTable from "~/components/MTable";

function StoragePage() {
	const tbdata = {
		thead: ["Product name", "Color", "Category", "Price", "Action"],
		trow: [
			[
				'Apple MacBook Pro 17"',
				"Silver",
				"Laptop",
				"2999",
				{
					text: "edit",
					link: "/auth",
				},
			],
			[
				"Microsoft Surface Pro",
				"White",
				"Laptop PC",
				"$1999",
				{
					text: "edit",
					link: "/auth",
				},
			],
			[
				'Apple MacBook Pro 17"',
				"Silver",
				"Laptop",
				"2999",
				{
					text: "edit",
					link: "/auth",
				},
			],
		],
	};
	return <MTable tbdata={tbdata} />;
}

export default StoragePage;
