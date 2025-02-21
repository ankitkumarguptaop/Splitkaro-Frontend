import { createSlice } from "@reduxjs/toolkit";
import { listNotification } from "./notification.action";

const initialState = {
  notifications: [],
  liveNotifications: [],
  isLoading: false,
  error: null,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setLiveNotification: (state, action) => {
        state.liveNotifications = [action.payload, ...state.liveNotifications];
      state.error = null;
    },
    clearNotification: (state, action) => {
        state.liveNotifications = [];
      state.error = null;
    },
  },
 extraReducers: (builder) => {
     builder
       .addCase(listNotification.pending, (state) => {
         state.isLoading = true;
       })
       .addCase(listNotification.fulfilled, (state, action) => {
        state.notifications =  action.payload ;
       })
       .addCase(listNotification.rejected, (state, action) => {
         state.isLoading = false;
         state.error = action.error.message;
       });
   },

});
export const {
    setLiveNotification,
    clearNotification
} = notificationSlice.actions;


export default notificationSlice.reducer;
