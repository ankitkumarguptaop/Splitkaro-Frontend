
import { createAsyncThunk } from "@reduxjs/toolkit";
import { listNotificationService } from "../../services/notification.service";
import{LIST_NOTIFICATION} from "./notification.type";


 export const listNotification = createAsyncThunk(LIST_NOTIFICATION, async (payload) => {
    const res = await listNotificationService(payload);
    const data = res.data;
    console.log("res data", data);
    return data;
  });
  