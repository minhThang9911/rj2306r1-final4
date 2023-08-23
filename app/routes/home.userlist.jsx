import { Link } from "@remix-run/react";
import userList from "../_fake/userList";
function UserListPage() {
	return (
		<table className="w-full">
			<thead>
				<th></th>
				<th>Tên</th>
				<th>Vai trò</th>
				<th>Email</th>
				<th>Thao tác</th>
			</thead>
			<tbody>
				{userList.map((item, index) => (
					<tr key={index} className="shadow-md leading-10">
						<td className="ps-3">
							<img
								className="w-[100px]"
								src={item.avatar}
								alt={item.name}
							/>
						</td>
						<td>{item.name}</td>
						<td className="text-center">{item.role}</td>
						<td>{item.email}</td>
						<td className="text-center">
							<Link
								to={`/home/useredit/${item.id}`}
								className="rounded-md bg-yellow-100 px-3 my-1 me-1 hover:bg-yellow-300 inline-block">
								Chỉnh sửa
							</Link>
							<Link
								to={`/home/userdelete/${item.id}`}
								className="rounded-md bg-red-100 px-3 my-1 ms-1 hover:bg-red-300 inline-block">
								Xóa
							</Link>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default UserListPage;
