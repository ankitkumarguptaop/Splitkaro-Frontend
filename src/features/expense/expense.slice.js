import { createSlice } from "@reduxjs/toolkit";
import {
  createExpense,
  deleteExpense,
  listExpense,
  listExpenseMember,
  updatedExpense,
  addParticipant,
  removeParticipant,
} from "./expense.action";

const initialState = {
  expenses: [],
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
          (expense) => expense.expenses._id !== action.payload.expenses._id
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
        state.isLoading = false;
      })
      .addCase(updatedExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(listExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listExpense.fulfilled, (state, action) => {
       console.log('✌️action.payload --->', action.payload);
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
        state.expenses = [...state.expenses, action.payload ];
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
