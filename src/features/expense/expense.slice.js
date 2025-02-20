import { createSlice } from "@reduxjs/toolkit";
import {
  createExpense,
  deleteExpense,
  listExpense,
  listExpenseMember,
  updatedExpense,
  addParticipant,
  removeParticipant,
  updateSettlementExpense,
} from "./expense.action";
import { socket } from "../../configs/socket";

const initialState = {
  expenses: [],
  expenseParticipant: [],
  isLoading: false,
  error: null,
};

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    removeError: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter(
          (expense) => expense._id !== action.payload.expense._id
        );
        state.isLoading = false;
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updatedExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatedExpense.fulfilled, (state, action) => {
        const index = state.expenses.findIndex(
          (expense) => expense._id === action.payload.data._id
        );
        state.expenses.splice(index, 1, action.payload.data.expense);
        state.isLoading = false;
      })
      .addCase(updatedExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateSettlementExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSettlementExpense.fulfilled, (state, action) => {
        const index = state.expenseParticipant.findIndex(
          (participant) => participant._id === action.payload.data._id
        );
        state.expenseParticipant.splice(index, 1, action.payload.data);
        state.isLoading = false;
      })
      .addCase(updateSettlementExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(listExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listExpense.fulfilled, (state, action) => {
        state.expenses = action.payload;
        state.isLoading = false;
      })
      .addCase(listExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.expenses = [...state.expenses, action.payload];
        console.log(action.payload);
        socket.emit("create-expense", action.payload.group_id);
        state.isLoading = false;
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(listExpenseMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listExpenseMember.fulfilled, (state, action) => {
        state.expenseParticipant = action.payload;
        state.isLoading = false;
      })
      .addCase(listExpenseMember.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addParticipant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addParticipant.fulfilled, (state, action) => {
        state.expenseParticipant = [
          ...state.expenseParticipant,
          action.payload,
        ];
        state.isLoading = false;
      })
      .addCase(addParticipant.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(removeParticipant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeParticipant.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(removeParticipant.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { removeError } = expenseSlice.actions;

export default expenseSlice.reducer;
