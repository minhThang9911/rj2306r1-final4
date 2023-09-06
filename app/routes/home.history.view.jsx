import {
	Autocomplete,
	Button,
	Card,
	Divider,
	TextField,
	Typography,
	Modal,
	Fade,
	createFilterOptions,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { json } from "@remix-run/node";
import { useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import { v4 } from "uuid";
import { api, getApiLink } from "~/config/api";
import { fetcherServer } from "~/server/api.server";
import DeleteIcon from "@mui/icons-material/Delete";
import { sumWithMultiplyFields } from "~/utils/calc";
import { useSnackbar } from "notistack";

export const loader = async ({ request, params }) => {
	console.log("VIEW", params);

	return null;
};

export default function HistoryViewPage() {
	return (
		<Modal
			className="w-full h-full flex justify-center items-center "
			open={true}>
			<Fade in={true}>
				<div className="w-11/12 p-3 flex flex-col h-5/6 bg-white border-none rounded-md outline-none">
					test
				</div>
			</Fade>
		</Modal>
	);
}
