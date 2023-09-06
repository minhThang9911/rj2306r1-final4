import { useLoaderData, useSubmit } from "@remix-run/react";
import { fetcherServer } from "~/server/api.server";
import { json } from "@remix-run/node";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useCallback, useContext, useMemo, useState } from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
	Button,
	Fade,
	FormControl,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { v4 } from "uuid";
import { uploadImg } from "~/server/upload.server";
import { GlobalContext } from "~/root";
import { api, getApiLink } from "~/config/api";
import Img from "~/components/Img";
import { defaultImgSrc } from "~/config";

export const loader = async () => {
	const products = await fetcherServer.get(
		getApiLink.base(api.type.products)
	);
	const categories = await fetcherServer.get(
		getApiLink.base(api.type.categories)
	);
	return json({
		products: products.data,
		categories: categories.data,
	});
};

export const action = async ({ request }) => {
	const { _action, ...data } = await request.json();
	switch (_action) {
		case "delete": {
			await fetcherServer.delete(`${api.link.products}/${data.id}`);
			return data;
		}
		case "update": {
			const uploaded = [];
			for (let i = 0; i < 4; i++) {
				if (data.images[i] === defaultImgSrc) {
					continue;
				}
				const url = await uploadImg(data.images[i]);
				if (url !== "error") {
					uploaded.push(url);
				} else {
					uploaded.push(data.images[i]);
				}
			}

			await fetcherServer.put(
				getApiLink.withId(api.type.products, data.id),
				{
					...data,
					images: uploaded,
				}
			);
			return data;
		}
		case "add": {
			const uploaded = [];
			data.images.forEach((item) => {
				(async () => {
					const url = await uploadImg(item);
					if (url !== "error") {
						uploaded.push(url);
					} else {
						uploaded.push(item);
					}
				})();
			});
			const { id, ...tmp } = data;
			tmp.images = uploaded;
			await fetcherServer.post(getApiLink.base(api.type.products), tmp);
			return data;
		}
		default: {
			return data;
		}
	}
};

export default function ProductListPage() {
	const submit = useSubmit();
	const { products, categories } = useLoaderData();
	const categoriesList = useMemo(() => {
		return categories;
	}, [categories]);
	const [images, setImages] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [seletedProduct, setSelectProduct] = useState();
	const [seletedProductBackup, setSelectProductBackup] = useState();
	const [isNew, setIsNew] = useState(false);
	const { settings } = useContext(GlobalContext);
	const editProduct = useCallback(
		(product) => () => {
			const tmp = [...product.images];
			while (tmp.length < 4) {
				tmp[tmp.length] = defaultImgSrc;
			}
			setImages(tmp);
			setSelectProduct(product);
			setSelectProductBackup(product);
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
		if (
			JSON.stringify(seletedProduct) !==
				JSON.stringify(seletedProductBackup) ||
			JSON.stringify(images) !== JSON.stringify(seletedProduct.images)
		) {
			submit(
				{
					...seletedProduct,
					_action: isNew ? "add" : "update",
					images,
				},
				{
					method: "POST",
					encType: "application/json",
				}
			);
		} else {
			console.log("no change");
		}
		setIsNew(false);
		setOpenModal(false);
	};

	const handleNew = () => {
		setIsNew(true);
		setImages(["/img/placeholder-image.jpg"]);
		setSelectProduct({
			id: v4(),
			name: "Oculus VR",
			description: "Long contest",
			price: 1000,
			categoriesId: 1,
			images: [
				"/img/placeholder-image.jpg",
				"/img/placeholder-image.jpg",
				"/img/placeholder-image.jpg",
				"/img/placeholder-image.jpg",
			],
			rate: 5,
			createAt: new Date().toISOString(),
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
						<img src={param.row.images[0]} alt={param.row.name} />
					);
				},
			},
			{ field: "name", headerName: "Tên sản phẩm", flex: 3 },
			{
				field: "categories",
				headerName: "Loại hàng",
				flex: 2,
				valueGetter: (params) => {
					return categoriesList.find(
						(item) => item.id === params.row.categoriesId
					).title;
				},
			},
			{ field: "price", headerName: "Giá", flex: 3 },
			{ field: "rate", headerName: "Đánh giá", flex: 3 },

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
						onClick={() =>
							submit(
								{
									_action: "delete",
									...params.row,
								},
								{
									method: "POST",
									encType: "application/json",
								}
							)
						}
					/>,
				],
			},
		],
		[editProduct, submit, categoriesList]
	);

	return (
		<div className="h-full flex flex-col justify-start">
			<div className="mb-2 flex justify-between">
				<div>
					<Typography variant="h4" component="h1"></Typography>
				</div>
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
			<DataGrid rows={products} columns={columns} autoPageSize />
			<Modal
				open={openModal}
				onClose={() => setOpenModal(false)}
				closeAfterTransition>
				<Fade in={openModal}>
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-10/12 h-5/6 rounded-xl p-3">
						<div className="flex justify-between h-full">
							<div className="w-6/12 flex flex-col h-full p-5">
								<div className="flex-grow relative">
									<div className="flex flex-wrap absolute top-1/2 -translate-y-1/2">
										{images.map((item, index) => {
											return (
												<Img
													className="w-full md:w-1/2"
													key={index}
													index={index}
													images={images}
													src={item}
													setImages={setImages}
													alt={seletedProduct.name}
												/>
											);
										})}
									</div>
								</div>
							</div>
							<div className="w-6/12 flex flex-col h-full p-5">
								<div className="flex-grow overflow-y-auto">
									<TextField
										sx={{
											marginBottom: "2em",
										}}
										fullWidth
										variant="standard"
										label="Tên sản phẩm"
										value={seletedProduct?.name}
										name="name"
										onChange={handleSelectProduct}
									/>

									<FormControl fullWidth>
										<InputLabel id="product-categories-select-label">
											Danh mục
										</InputLabel>
										<Select
											labelId="product-categories-select-label"
											value={seletedProduct?.categoriesId}
											label="Danh mục"
											name="categoriesId"
											onChange={handleSelectProduct}>
											{categoriesList.map((item) => {
												return (
													<MenuItem
														value={item.id}
														key={item.id}>
														{item.title}
													</MenuItem>
												);
											})}
										</Select>
									</FormControl>

									<TextField
										sx={{
											marginBottom: "2em",
										}}
										fullWidth
										variant="standard"
										label="Giắ"
										value={seletedProduct?.price}
										name="price"
										onChange={handleSelectProduct}
									/>
									<TextareaAutosize
										className="w-full text-sm font-normal font-sans leading-5 p-3 rounded-xl rounded-br-none shadow-md shadow-slate-100 focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 focus:border-purple-500 bg-white text-slate-900 focus-visible:outline-0"
										aria-label="Giới thiệu"
										placeholder="Giới thiệu"
										name="description"
										onChange={handleSelectProduct}
									/>
								</div>
								<div className="flex-shrink-0 flex justify-around">
									<Button
										variant="contained"
										color="success"
										onClick={handleSaveProduct}>
										Lưu thay đổi
									</Button>
									<Button
										variant="contained"
										color="warning"
										onClick={() => setOpenModal(false)}>
										Bỏ qua
									</Button>
								</div>
							</div>
						</div>
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
