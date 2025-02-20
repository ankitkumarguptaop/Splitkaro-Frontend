import { Box, Button, Modal } from "@mui/material";
import { DataGrid, renderEditInputCell } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../input/input";
import { setCheckboxSelection } from "../../features/group/group.slice";
import { listUser } from "../../features/user/user.action";
import {
  addMembers,
  listGroupMember,
  removeMembers,
} from "../../features/group/group.action";
const GroupMember = ({
  openGroupMemberModal,
  setOpenGroupMemberModal,
  isAddTOGroup,
}) => {
  const dispatch = useDispatch();

  const [selectedRows, setSelectedRows] = useState([]);
  const [search, setSearch] = useState("");

  const users = useSelector((state) => state.user.users);

  const group = useSelector((state) => state.group.currentSelectedGroup);
  const checkboxSelection = useSelector(
    (state) => state.group.checkboxSelection
  );
  const groupMembers = useSelector((state) => state.group.currentGroupMembers);
  const currentUser = useSelector((state) => state.auth.currentUser);

  let data = [];

  if (isAddTOGroup) {
    data = users.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      phone_no: user.phone_no,
    }));
  } else {
    data = groupMembers
      .filter((member) => member.member_id._id !== currentUser.user._id)
      .map((member) => ({
        id: member.member_id._id,
        name: member.member_id.name,
        email: member.member_id.email,
        phone_no: member.member_id.phone_no,
      }));
  }

  const style = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "27vw",
    minWidth: "550px",
    minHeight: 410,
    bgcolor: "rgb(255, 255, 255)",
    color: "black",
    p: 3,
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 130,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 130,
      editable: true,
    },
    {
      field: "phone_no",
      headerName: "Phone No",
      type: "number",
      width: 150,
      editable: true,
    },
  ];

  function addMemberToGroup() {
    dispatch(
      addMembers({
        group_id: group.group_id._id,
        usersToAdd: selectedRows.map((row) => ({
          member_id: row,
          group_id: group.group_id._id,
        })),
      })
    );
    setSelectedRows([]);
    setOpenGroupMemberModal(false);
    dispatch(setCheckboxSelection(false));
  }

  function removeMembersFromGroup() {
    dispatch(
      removeMembers({
        group_id: group.group_id._id,
        removeMembers: selectedRows.map((row) => ({
          member_id: row,
          group_id: group.group_id._id,
        })),
      })
    );

    setSelectedRows([]);
    setOpenGroupMemberModal(false);
    dispatch(setCheckboxSelection(false));
  }

  return (
    <Modal
      sx={style}
      open={openGroupMemberModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="data-grid" >
        {isAddTOGroup && (
          <Input
            lable={"Search Members"}
            value={search}
            setState={(e) => {
              setSearch(e.target.value);
              if (isAddTOGroup) {
                dispatch(
                  listUser({
                    search: e.target.value,
                    group_id: group.group_id._id,
                  })
                );
              } else {
                dispatch(
                  listGroupMember({
                    search: e.target.value,
                    group_id: group.group_id._id,
                  })
                );
              }
            }}
          ></Input>
        )}
        <Box sx={{ height: "300px",  marginTop:"10px"}}>
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection={checkboxSelection}
            onCellClick={checkboxSelection}
            onStateChange={(event) => {
              setSelectedRows(event.rowSelection);
            }}
          />
        </Box>
        <Box className="Add-close-button">
          {selectedRows.length >= 1 && isAddTOGroup && (
            <Button
              sx={{ marginLeft: "5px", marginRight: "5px" }}
              variant="contained"
              onClick={addMemberToGroup}
            >
              Add
            </Button>
          )}

          {!isAddTOGroup && selectedRows.length >= 1 && (
            <Button
              sx={{ marginLeft: "5px", marginRight: "5px" }}
              variant="contained"
              onClick={removeMembersFromGroup}
            >
              Remove
            </Button>
          )}

          <Button
            variant="contained"
            onClick={() => {
              setOpenGroupMemberModal(false);
            }}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default GroupMember;
