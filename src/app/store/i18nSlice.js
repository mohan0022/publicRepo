import { createSlice } from '@reduxjs/toolkit';
import i18n from 'i18n';

export const changeLanguage = languageId => (dispatch, getState) => {
	/*
    Change Language
     */
	return i18n.changeLanguage(languageId).then(() => {
		dispatch(i18nSlice.actions.languageChanged(languageId));
	});
};

const i18nSlice = createSlice({
	name: 'i18n',
	initialState: {
		language: i18n.language || window.localStorage.i18nextLng || 'en'
	},
	reducers: {
		languageChanged: (state, action) => {
			state.language = action.payload;
		}
	}
});
export const { languageChanged } = i18nSlice.actions;

export default i18nSlice.reducer;
