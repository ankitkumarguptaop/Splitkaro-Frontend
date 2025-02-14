import { createSlice } from "@reduxjs/toolkit";
import {
  createGroup,
  deleteGroup,
  listGroup,
  updatedGroup,
} from "./group.action";


const initialState = {
  groups: [],
  currentSelectedGroup:null,
  isOpenModal :false,
  isLoading: false,
  error: null,
};

export const authUserSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    removeError: (state, action) => {
      state.error = null;
    },
    setCurrentSeletedGroup :(state ,action)=>{
      state.currentSelectedGroup = action.payload
    },
    setGroupModal :(state ,action)=>{
       state.isOpenModal =action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updatedGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatedGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload.data;
      })
      .addCase(updatedGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(listGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.groups = action.payload;
      })
      .addCase(listGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        console.log("kndfkjjjnjnjn")
        state.isLoading = false;
        // state.groups=[...state.groups , action.payload]
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { removeError,setCurrentSeletedGroup ,setGroupModal } = authUserSlice.actions;

export default authUserSlice.reducer;
