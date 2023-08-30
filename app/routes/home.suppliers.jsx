import { useLoaderData } from "@remix-run/react";
import { api, fetcherServer, getApiLink } from "~/server/api.server";
import { json } from "@remix-run/node";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Fade, Modal, TextField } from "@mui/material";
import { fetcherClient } from "~/api";
import { v4 } from "uuid";

export const loader = async () => {
    const res = await fetcherServer.get(getApiLink.base(api.type.suppliers));
    return json(res.data);
};

function VendorListPage() {
    const [rows, setRows] = useState(useLoaderData());
    const [openModal, setOpenModal] = useState(false);
    const [seletedVendor, setSelectVendor] = useState();
    const [isNew, setIsNew] = useState(false);
    const deleteVendor = useCallback(
        (id) => () => {
            setTimeout(() => {
                setRows((pre) => pre.filter((row) => row.id !== id));
            });
        },
        []
    );
    const editVendor = useCallback(
        (vendor) => () => {
            setSelectVendor(vendor);
            setOpenModal(true);
        },
        []
    );

    const handleSelectVendor = (e) => {
        setSelectVendor({
            ...seletedVendor,
            [e.target.name]: e.target.value,
        });
    };

    const handleSaveVendor = async () => {
        const tmp = [...rows];
        if (isNew) {
            await fetcherClient.post(api.link.vendors, seletedVendor);
            tmp.push(seletedVendor);
        } else {
            await fetcherClient.put(
                `${api.link.vendors}/${seletedVendor.id}`,
                seletedVendor
            );
            const index = rows.findIndex(
                (item) => item.id === seletedVendor.id
            );
            tmp[index] = seletedVendor;
        }
        setRows(tmp);
        setIsNew(false);
        setOpenModal(false);
    };

    const handleNew = () => {
        setIsNew(true);
        setSelectVendor({
            id: v4(),
            name: "",
            country: "",
            address: "",
        });
        setOpenModal(true);
    };

    const columns = useMemo(
        () => [
            { field: "name", headerName: "Tên nhà cung cấp", width: 250 },
            { field: "country", headerName: "Quốc Gia", width: 130 },
            { field: "address", headerName: "Địa chỉ", width: 130 },
            {
                field: "actions",
                type: "actions",
                flex: 2,
                getActions: (params) => [
                    <GridActionsCellItem
                        key={"b"}
                        icon={<EditIcon />}
                        label="Sửa"
                        onClick={editVendor(params.row)}
                    />,
                    <GridActionsCellItem
                        key={"a"}
                        icon={<DeleteIcon />}
                        label="Xóa"
                        onClick={deleteVendor(params.row.id)}
                    />,
                ],
            },
        ],
        [editVendor, deleteVendor]
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
                            <div className="w-6/12 flex flex-col h-full p-5">
                                <div className="flex-grow">
                                    <TextField
                                        sx={{
                                            marginBottom: "2em",
                                        }}
                                        fullWidth
                                        variant="standard"
                                        label="Tên người dùng"
                                        value={seletedVendor?.name}
                                        name="name"
                                        onChange={handleSelectVendor}
                                    />
                                    <TextField
                                        sx={{
                                            marginBottom: "2em",
                                        }}
                                        fullWidth
                                        variant="standard"
                                        label="country"
                                        value={seletedVendor?.country}
                                        name="country"
                                        onChange={handleSelectVendor}
                                    />
                                    <TextField
                                        sx={{
                                            marginBottom: "2em",
                                        }}
                                        fullWidth
                                        variant="standard"
                                        label="address"
                                        value={seletedVendor?.address}
                                        name="address"
                                        onChange={handleSelectVendor}
                                    />
                                </div>
                                <div className="flex-shrink-0 text-center">
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={handleSaveVendor}>
                                        Lưu thay đổi
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

export default VendorListPage;
