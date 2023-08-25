function ClientListPage() {
    return (
        <table className="w-full">
            <thead>
                <th>Tên</th>
                <th>Quốc Gia</th>
                <th>Địa chỉ</th>
                <th>Thao tác</th>
            </thead>
            <tbody>
                {/* {clientList.map((item, index) => (
					<tr key={index} className="shadow-md leading-10">
						<td>{item.name}</td>
						<td className="text-center">{item.country}</td>
						<td>{item.address}</td>
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
				))} */}
            </tbody>
        </table>
    );
}

export default ClientListPage;
