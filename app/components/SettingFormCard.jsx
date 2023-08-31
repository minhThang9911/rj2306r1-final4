import {
    Button,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import { useSubmit } from "@remix-run/react";
import { useMemo, useState, useCallback } from "react";

function SettingFormCard({ items, columns, apiLink, settingTitle = "" }) {
    const submit = useSubmit();
    const initialObj = useMemo(() => {
        const res = columns.reduce((obj, current) => {
            obj[current.field] = "";
            return obj;
        }, {});
        return res;
    }, [columns]);
    const [setting, setSetting] = useState(initialObj);
    const handleChange = useCallback((e) => {
        setSetting((pre) => ({
            ...pre,
            [e.target.name]: e.target.value,
        }));
    }, []);
    const handleSave = () => {
        submit(
            {
                _action: "add",
                _apiLink: apiLink,
                ...setting,
            },
            {
                method: "POST",
                encType: "application/json",
            }
        );
        setSetting(initialObj);
    };
    return (
        <Card sx={{ padding: "1em" }}>
            <CardContent>
                <Typography variant="h5">{settingTitle}</Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columns.map((col) => (
                                    <TableCell
                                        key={col.field}
                                        sx={{
                                            fontWeight: "bold",
                                        }}>
                                        {col.title}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item, index) => (
                                <TableRow key={index}>
                                    {columns.map((col) => (
                                        <TableCell key={col.field}>
                                            {item[col.field]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                            <TableRow>
                                {columns.map((col, index) => (
                                    <TableCell key={index}>
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label={col.title}
                                            name={col.field}
                                            key={index}
                                            value={setting[col.field] || ""}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="flex items-center justify-end pt-3">
                    <Button
                        onClick={handleSave}
                        variant="contained"
                        color="success"
                        type="submit"
                        sx={{
                            height: "100%",
                        }}>
                        Thêm
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default SettingFormCard;
