import { useLoaderData } from "@remix-run/react";
import { api, fetcherServer, getApiLink } from "~/server/api.server";
import { json } from "@remix-run/node";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FileBase64 from "react-file-base64";
import {
    Button,
    Fade,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
} from "@mui/material";
import { fetcherClient } from "~/api";
import { v4 } from "uuid";

export const loader = async () => {
    const productList = (
        await fetcherServer.get(getApiLink.base(api.type.products))
    ).data;
    const vendorList = (
        await fetcherServer.get(getApiLink.base(api.type.suppliers))
    ).data;
    return json({ productList, vendorList });
};

function ProductListPage() {
    const { productList, vendorList } = useLoaderData();
    const [rows, setRows] = useState(productList);
    const [openModal, setOpenModal] = useState(false);
    const [seletedProduct, setSelectProduct] = useState();
    const [isNew, setIsNew] = useState(false);
    const deleteProduct = useCallback(
        (id) => () => {
            setTimeout(() => {
                setRows((pre) => pre.filter((row) => row.id !== id));
            });
        },
        []
    );
    const editProduct = useCallback(
        (product) => () => {
            setSelectProduct(product);
            setOpenModal(true);
        },
        []
    );

    const handleSelectProduct = (e) => {
        setSelectProduct({
            ...seletedProduct,
            [e.target.name]: e.target.value,
        });
    };

    const handleSaveProduct = async () => {
        const tmp = [...rows];
        if (isNew) {
            await fetcherClient.post(api.link.products, seletedProduct);
            tmp.push(seletedProduct);
        } else {
            await fetcherClient.put(
                `${api.link.products}/${seletedProduct.id}`,
                seletedProduct
            );
            const index = rows.findIndex(
                (item) => item.id === seletedProduct.id
            );
            tmp[index] = seletedProduct;
        }
        setRows(tmp);
        setIsNew(false);
        setOpenModal(false);
    };

    const handleNew = () => {
        setIsNew(true);
        setSelectProduct({
            id: v4(),
            title: "",
            description: "",
            price: 0,
            discountPercentage: 0,
            rating: 0,
            stock: 0,
            brand: "",
            category: "",
            thumbnail: "",
            images: [],
            vendorId: "",
            userId: "",
        });
        setOpenModal(true);
    };

    const columns = useMemo(
        () => [
            {
                field: "img",
                headerName: "",
                flex: 1,
                renderCell: (param) => {
                    return (
                        <img
                            src={param.row.thumbnail}
                            alt={param.row.title}
                        />
                    );
                },
            },
            { field: "title", headerName: "Tên hàng hóa", flex: 3 },
            {
                field: "price",
                headerName: "Giá nhập ($)",
                type: "number",
                flex: 2,
            },
            {
                field: "discountPercentage",
                headerName: "Khuyến mãi (%)",
                type: "number",
                flex: 2,
            },
            { field: "category", headerName: "Loại hàng", flex: 2 },
            { field: "stock", headerName: "Tồn kho", type: "number", flex: 2 },
            {
                field: "actions",
                type: "actions",
                flex: 2,
                getActions: (params) => [
                    <GridActionsCellItem
                        key={"b"}
                        icon={<EditIcon />}
                        label="Sửa"
                        onClick={editProduct(params.row)}
                    />,
                    <GridActionsCellItem
                        key={"a"}
                        icon={<DeleteIcon />}
                        label="Xóa"
                        onClick={deleteProduct(params.row.id)}
                    />,
                ],
            },
        ],
        [deleteProduct, editProduct]
    );

    return (
        <div className="h-full flex flex-col justify-start">
            <div className="mb-2 flex justify-between">
                <div></div>
                <Button
                    sx={{
                        marginRight: "1em",
                    }}
                    onClick={handleNew}
                    variant="contained"
                    color="info">
                    Thêm mới
                </Button>
            </div>
            <DataGrid
                rows={rows}
                columns={columns}
                autoPageSize
            />
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                closeAfterTransition>
                <Fade in={openModal}>
                    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-10/12 h-5/6 rounded-xl p-3">
                        <div className="flex justify-between h-full">
                            {/* <div className="w-6/12 flex flex-col h-full p-5">
								<div className="flex-grow relative">
									{Array.isArray(seletedProduct.images) &&
										seletedProduct.images.length > 0 &&
										seletedProduct.images.map(
											(item, index) => {
												return (
													<img
														key={index}
														className="block rounded-3xl"
														src={item}
														alt={
															seletedProduct?.name
														}
													/>
												);
											}
										)}
								</div>
								<div className="flex-shrink-0 text-center">
									<Button
										component="label"
										role={undefined}
										tabIndex={-1}
										variant="outlined"
										color="info">
										Đổi Avartar
										<FileBase64
											type="file"
											multiple={false}
											onDone={({ base64 }) => {
												setSelectProduct((pre) => ({
													...pre,
													avatar: base64,
												}));
											}}
											onChange={(e) => e.target.files[0]}
										/>
									</Button>
								</div>
							</div>
							<div className="w-6/12 flex flex-col h-full p-5">
								<div className="flex-grow">
									<TextField
										sx={{
											marginBottom: "2em",
										}}
										fullWidth
										variant="standard"
										label="Tên người dùng"
										value={seletedProduct?.name}
										name="name"
										onChange={handleSelectProduct}
									/>
									<TextField
										sx={{
											marginBottom: "2em",
										}}
										fullWidth
										variant="standard"
										label="Email"
										value={seletedProduct?.email}
										name="email"
										onChange={handleSelectProduct}
									/>
									<FormControl fullWidth>
										<InputLabel id="product-role-select-label">
											Vai trò
										</InputLabel>
										<Select
											labelId="product-role-select-label"
											id="demo-simple-select"
											value={seletedProduct?.role}
											label="Vai trò"
											name="role"
											onChange={handleSelectProduct}>
											<MenuItem value={"admin"}>
												Admin
											</MenuItem>
											<MenuItem value={"subAdmin"}>
												Sub Admin
											</MenuItem>
											<MenuItem value={"manager"}>
												Manager
											</MenuItem>
											<MenuItem value={"seller"}>
												Seller
											</MenuItem>
										</Select>
									</FormControl>
								</div>
								<div className="flex-shrink-0 text-center">
									<Button
										variant="contained"
										color="success"
										onClick={handleSaveProduct}>
										Lưu thay đổi
									</Button>
								</div>
							</div> */}
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default ProductListPage;
