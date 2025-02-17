import { createSlice } from "@reduxjs/toolkit";
import {
  createGroup,
  deleteGroup,
  listGroup,
  listGroupMember,
  updatedGroup,
} from "./group.action";

const initialState = {
  groups: [],
  currentGroupMembers:[],
  currentSelectedGroup: null,
  isOpenModal: false,
  isLoading: false,
  error: null,
  checkboxSelection:false
};

export const authUserSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    removeError: (state, action) => {
      state.error = null;
    },
    setCurrentSeletedGroup: (state, action) => {
      state.currentSelectedGroup = action.payload;
    },
    setGroupModal: (state, action) => {
      state.isOpenModal = action.payload;
    },
    setCheckboxSelection:(state,action)=>{
      state.checkboxSelection=action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.groups = state.groups.filter(
          (group) => group.group_id._id !== action.payload.group._id,
        );
        state.currentSelectedGroup=null
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
        console.log("list");
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
        state.groups = [...state.groups , {group_id : action.payload}];
        state.isLoading = false;
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(listGroupMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listGroupMember.fulfilled, (state, action) => {
        state.currentGroupMembers =  action.payload;
        state.isLoading = false;
      })
      .addCase(listGroupMember.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { removeError, setCurrentSeletedGroup, setGroupModal ,setCheckboxSelection } =
  authUserSlice.actions;

export default authUserSlice.reducer;
