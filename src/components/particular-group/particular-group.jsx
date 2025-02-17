import React, { useState } from "react";
import style from "./particular-group.module.css";
import { Avatar, Box, Menu, MenuItem, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  deleteGroup,
  listGroupMember,
} from "../../features/group/group.action";
import GroupMember from "../members-of-group/members-of-group";
import { setCheckboxSelection } from "../../features/group/group.slice";
import { listUser } from "../../features/user/user.action";

const ParticularGroup = () => {
  const dispatch = useDispatch();
  const group = useSelector((state) => state.group.currentSelectedGroup);
  const groupMembers = useSelector((state) => state.group.currentGroupMembers);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAddTOGroup ,setAddTOGroup] =useState(false)

  const open = Boolean(anchorEl);

  const [openGroupMemberModal, setOpenGroupMemberModal] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function viewMembers() {
    setAddTOGroup(false)
    dispatch(setCheckboxSelection(false));
    dispatch(listGroupMember({ group_id: group.group_id._id }));
    setOpenGroupMemberModal(true);
    setAnchorEl(false);
  }

  function addMembers() {
    setAddTOGroup(true)
    dispatch(setCheckboxSelection(true));
    dispatch(listGroupMember({ group_id: group.group_id._id }));
    dispatch(listUser({ group_id: group.group_id._id, search: "" }));
    setOpenGroupMemberModal(true);
    setAnchorEl(false);
  }
  return (
    <Box className={style["particular-group-container"]}>
      {group && (
        <>
          <Box className={style["group-header"]}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box>
                <Avatar alt="Remy Sharp" src="" />
              </Box>
              <Typography className={style["group-name"]} variant="h4">
                {group.group_id.name}
              </Typography>
            </Box>
            <MoreVertIcon
              sx={{ margin: 2, cursor: "pointer" }}
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            ></MoreVertIcon>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={viewMembers}>View members</MenuItem>
              {group.group_id.created_by === currentUser.user._id && (
                <Box>
                  <MenuItem onClick={addMembers}>Add member</MenuItem>
                  <MenuItem>remove members</MenuItem>
                  <MenuItem>Add Expense</MenuItem>
                  <MenuItem
                    sx={{ color: "green" }}
                    // onClick={() =>
                    //   dispatch(deleteGroup({ group_id: group.group_id._id }))
                    // }
                  >
                    Update
                  </MenuItem>
                  <MenuItem
                    sx={{ color: "red" }}
                    onClick={() => {
                      dispatch(deleteGroup({ group_id: group.group_id._id }));
                      setAnchorEl(false);
                    }}
                  >
                    Delete
                  </MenuItem>
                </Box>
              )}
            </Menu>
          </Box>
          <Box className={style["group-content"]}></Box>
        </>
      )}

      <GroupMember
        openGroupMemberModal={openGroupMemberModal}
        setOpenGroupMemberModal={setOpenGroupMemberModal}
        isAddTOGroup={isAddTOGroup}
      ></GroupMember>
    </Box>
  );
};

export default ParticularGroup;
