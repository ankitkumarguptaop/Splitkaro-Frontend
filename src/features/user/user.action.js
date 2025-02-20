import { LIST_USER } from "./user.type";

import { listUserService } from "../../services/user.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const listUser = createAsyncThunk(LIST_USER, async (payload) => {
  const res = await listUserService(payload);
  const data = res.data;
  console.log("res data", data);
  return data;
});
