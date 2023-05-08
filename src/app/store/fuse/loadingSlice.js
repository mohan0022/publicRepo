import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
	name: 'loading',
	initialState: {
		state: false,
		programProcessing: false,
		options: {
			children: 'Hi'
		}
	},
	reducers: {
		openLoader: (state, action) => {
			state.state = true;
			state.options = action.payload;
		},
		closeLoader: (state, action) => {
			state.state = false;
		},
		openProcessingLoader: (state, action) => {
			state.programProcessing = true;
			state.options = action.payload;
		},
		closeProcessingLoader: (state, action) => {
			state.programProcessing = false;
		}
	}
});

export const { openLoader, closeLoader, openProcessingLoader, closeProcessingLoader } = loadingSlice.actions;

export default loadingSlice.reducer;
