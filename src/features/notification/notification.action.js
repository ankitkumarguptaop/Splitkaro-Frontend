
import { createAsyncThunk } from "@reduxjs/toolkit";
import { listNotificationService  ,readNotificationService} from "../../services/notification.service";
import{LIST_NOTIFICATION ,READ_NOTIFICATION} from "./notification.type";


export const listNotification = createAsyncThunk(LIST_NOTIFICATION, async () => {
  const res = await listNotificationService();
  const data = res.data;
  console.log("res data", data);
  return data;
});
export const readNotification = createAsyncThunk(READ_NOTIFICATION, async (payload) => {
  console.log("hgduyfguyhg")
  const res = await readNotificationService(payload);
  const data = res.data;
  console.log("res data", data);
  return data;
});
