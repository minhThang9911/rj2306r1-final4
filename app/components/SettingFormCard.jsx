import {
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
} from "@mui/material";
import { useFetcher } from "@remix-run/react";

function SettingFormCard({ items, columns }) {
    const fetcher = useFetcher();
    return (
        <Card sx={{ padding: "1em" }}>
            <CardContent>
                <Typography variant="h5">Vai trò</Typography>
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>
                            {columns.map((col) => `${item[col.field]} - `)}
                        </li>
                    ))}
                </ul>

                <div className="flex items-center justify-between">
                    {columns.map((col, index) => (
                        <TextField
                            required
                            id="outlined-required"
                            label={col.title}
                            defaultValue=""
                            name={col.field}
                            key={index}
                            sx={{
                                margin: "0.5em",
                            }}
                        />
                    ))}
                    <Button
                        variant="contained"
                        color="success"
                        type="submit"
                        sx={{
                            height: "100%",
                        }}>
                        Thêm
                    </Button>
                </div>
                <fetcher.Form replace></fetcher.Form>
            </CardContent>
        </Card>
    );
}

export default SettingFormCard;
