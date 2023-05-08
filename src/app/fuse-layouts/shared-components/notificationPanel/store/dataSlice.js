import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { setActiveTestDetails } from "app/main/auth/store/userSlice";
import axios from "../../../../axios/axiosInstanceStudent";

export const getNotifications = createAsyncThunk(
  "notificationPanel/data/getData",
  async (params, { getState, dispatch }) => {
    const response = await axios.get("/common/v1/notification");
    const data = await response.data;

    if (data?.status) {
      dispatch(setActiveTestDetails(data?.body?.activeTestDetails));

      return data?.body?.activeTestDetails;
    }
    return initialState;
  }
);

// const notificationsAdapter = createEntityAdapter({});

const initialState = {
  activeTestDetails: null,
};

// export const { selectAll: selectNotifications, selectById: selectNotificationsById } =
// 	notificationsAdapter.getSelectors(state => state.notificationPanel.data);

const dataSlice = createSlice({
  name: "notificationPanel/data",
  initialState,
  reducers: {
    // dismissItem: (state, action) => notificationsAdapter.removeOne(state, action.payload),
    // dismissAll: (state, action) => notificationsAdapter.removeAll(state),
    // addNotification: (state, action) => notificationsAdapter.addOne(state, action.payload)

    clearActiveTestDetails: (state, action) => ({
      ...state,
      activeTestDetails: null,
    }),
  },
  extraReducers: {
    [getNotifications.fulfilled]: (state, action) => ({
      ...state,
      activeTestDetails: action.payload,
    }),
    // [getNotifications.fulfilled]: (state, action) => notificationsAdapter.addMany(state, action.payload)
  },
});

export const { dismissItem, dismissAll, addNotification } = dataSlice.actions;

export default dataSlice.reducer;
