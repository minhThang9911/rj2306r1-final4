import { createSlice } from "@reduxjs/toolkit";
import { fetcherClient } from "~/api";

export default class CRUDClass {
	constructor(name, apiPath) {
		this.name = name;
		this.apiPath = apiPath;
	}
	initialState = {
		list: [],
	};

	slice = createSlice({
		name: this.name || "default",
		initialState: this.initialState,
		reducers: {
			getListDone: (state, action) => {
				state.list = action.payload;
			},
			addDone: (state, action) => {
				state.list.push(action.payload);
			},
			deleteDone: (state, action) => {
				state.list = state.list.filter(
					(item) => item.id !== action.payload.id
				);
			},
			updateDone: (state, action) => {
				const index = state.list.findIndex(
					(item) => item.id === action.payload.id
				);
				state.list[index] = action.payload;
			},
		},
	});
	actions = this.slice.actions;
	getListAsync = () => async (dispatch) => {
		const res = await fetcherClient.get(this.apiPath);
		dispatch(this.slice.actions.getListDone(res.data));
	};
	addAsync = (item) => async (dispatch) => {
		await fetcherClient.post(this.apiPath);
		dispatch(this.slice.actions.addDoneDone(item));
	};
	deleteAsync = (item) => async (dispatch) => {
		await fetcherClient.delete(`${this.apiPath}/${item.id}`);
		dispatch(this.slice.actions.deleteDone(item));
	};
	updateAsync = (item) => async (dispatch) => {
		await fetcherClient.put(`${this.apiPath}/${item.id}`);
		dispatch(this.slice.actions.updateDone(item));
	};
	reducer = this.slice.reducer;
	select = (state) => state.list;
}
