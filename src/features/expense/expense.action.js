import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteExpenseService,
  updateExpenseService,
  listExpenseMemberService,
  listExpenseService,
  createExpenseService,
  addParticipantService,
  removeParticipantService,
  updateSettlementService
} from "../../services/expense.service";
import {
  LIST_EXPENSE,
  UPDATE_EXPENSE,
  DELETE_EXPENSE,
  CREATE_EXPENSE,
  ADD_PARTICIPANT,
  REMOVE_PARTICIPANT,
  LIST_EXPENSE_PARTICIPANT
} from "./expense.type";

export const listExpense = createAsyncThunk(LIST_EXPENSE, async (payload) => {
  const res = await listExpenseService(payload);
  const data = res.data;
  console.log("res data", data);
  return data;
});

export const listExpenseParticipants = createAsyncThunk(LIST_EXPENSE_PARTICIPANT, async (payload) => {
    const res = await listExpenseMemberService(payload);
    const data = res.data;
    console.log("res data", data);
    return data;
  });
  
export const updatedExpense = createAsyncThunk(
  UPDATE_EXPENSE,
  async (payload) => {
    const res = await updateExpenseService(payload);
    const data = res.data;
    console.log("res data", data);
    return res;
  }
);

export const deleteExpense = createAsyncThunk(
  DELETE_EXPENSE,
  async (payload) => {
    const res = await deleteExpenseService(payload);
    const data = res.data;
    console.log("res data", data);
    return data;
  }
);

export const createExpense = createAsyncThunk(
  CREATE_EXPENSE,
  async (payload) => {
    const res = await createExpenseService(payload);
    const data = res.data;
    console.log("res data", data);
    return data;
  }
);

export const listExpenseMember = createAsyncThunk(
    LIST_EXPENSE_PARTICIPANT,
  async (payload) => {
    const res = await listExpenseService(payload);
    const data = res.data;
    console.log("res data", data);
    return data;
  }
);

export const addParticipant = createAsyncThunk(
  ADD_PARTICIPANT,
  async (payload) => {
    const res = await addParticipantService(payload);
    const data = res.data;
    console.log("res data", data);
    return data;
  }
);

export const removeParticipant = createAsyncThunk(
  REMOVE_PARTICIPANT,
  async (payload) => {
    const res = await removeParticipantService(payload);
    const data = res.data;
    console.log("res data", data);
    return data;
  }
);
