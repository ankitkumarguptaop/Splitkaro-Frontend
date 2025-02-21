import { createSlice } from "@reduxjs/toolkit";
import { listNotification, readNotification } from "./notification.action";

const initialState = {
  notifications: [],
  unReadedNotifcationLength: 0,
  isLoading: false,
  error: null,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setLiveNotification: (state, action) => {
      // state.notifications = [action.payload, ...state.notifications];
      state.unReadedNotifcationLength = state.unReadedNotifcationLength + 1;
      state.error = null;
    },
    clearNotification: (state, action) => {
      state.unReadedNotifcationLength = [];
      state.error = null;
    },
    decreaseNotificationCount: (state, action) => {
      if (state.unReadedNotifcationLength > 0) {
        state.unReadedNotifcationLength = state.unReadedNotifcationLength - 1;
      }
    },
    increaseNotificationCount: (state, action) => {
      state.unReadedNotifcationLength = state.unReadedNotifcationLength + 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listNotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listNotification.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.unReadedNotifcationLength = 0;
        action.payload.forEach((notification) => {
          if (!notification.is_readed) {
            state.unReadedNotifcationLength += 1;
          }
        });
      })
      .addCase(listNotification.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(readNotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(readNotification.fulfilled, (state, action) => {
        // state.notifications = action.payload;
      })
      .addCase(readNotification.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export const {
  setLiveNotification,
  clearNotification,
  decreaseNotificationCount,
  increaseNotificationCount,
} = notificationSlice.actions;

export default notificationSlice.reducer;
