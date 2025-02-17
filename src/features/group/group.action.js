import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteGroupService,
  updateGroupService,
  listGroupService,
  createGroupService,
  listGroupMemberService,
} from "../../services/group.service";
import {
  LIST_GROUP,
  UPDATE_GROUP,
  DELETE_GROUP,
  CREATE_GROUP,
  LIST_MEMBERS,
} from "./group.type";

export const listGroup = createAsyncThunk(LIST_GROUP, async (payload) => {
  const res = await listGroupService(payload);
  const data = res.data;
  console.log("res data", data);
  return data;
});

export const updatedGroup = createAsyncThunk(UPDATE_GROUP, async (payload) => {
  const res = await updateGroupService(payload);
  const data = res.data;
  console.log("res data", data);
  return res;
});

export const deleteGroup = createAsyncThunk(DELETE_GROUP, async (payload) => {
  const res = await deleteGroupService(payload);
  const data = res.data;
  console.log("res data", data);
  return data;
});

export const createGroup = createAsyncThunk(CREATE_GROUP, async (payload) => {
  const res = await createGroupService(payload);
  const data = res.data;
  console.log("res data", data);
  return data;
});

export const listGroupMember = createAsyncThunk(
  LIST_MEMBERS,
  async (payload) => {
    const res = await listGroupMemberService(payload);
    const data = res.data;
    console.log("res data", data);
    return data;
  }
);
