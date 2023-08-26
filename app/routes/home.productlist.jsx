import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { api } from "~/config";
import { fetcher } from "~/server/api.server";

export const loader = async () => {
	const res = await fetcher.get(api.link.products);
	return json(res.data);
};

function ProductListPage() {
	const productListTable = useLoaderData();
	return (
		<table className="w-full">
			<thead>
				<th>Tên hàng hóa</th>
				<th>Giá nhập</th>
				<th>Giá bán</th>
				<th>Khuyến mãi</th>
				<th>Loại hàng</th>
				<th>Tồn kho</th>
				<th>Thao tác</th>
			</thead>
			<tbody>
				{productListTable.map((item, index) => (
					<tr key={index} className="shadow-md leading-10">
						<td className="ps-3">{item.title}</td>
						<td className="text-center">${item.price}</td>
						<td className="text-center">
							${(item.price * 1.1).toFixed(0)}
						</td>
						<td className="text-center">
							{item.discountPercentage}%
						</td>
						<td className="text-center">{item.category}</td>
						<td className="text-center">{item.stock}</td>
						<td className="text-center">
							<Link
								to={`/home/producthistory/${item.id}`}
								className="rounded-md bg-yellow-100 px-3 my-1 me-1 hover:bg-yellow-300 inline-block">
								Lịch sử
							</Link>
							<Link
								to={`/home/productdetail/${item.id}`}
								className="rounded-md bg-blue-100 px-3 my-1 ms-1 hover:bg-blue-300 inline-block">
								Chi tiết
							</Link>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default ProductListPage;
