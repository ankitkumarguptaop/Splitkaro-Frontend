import React, { useEffect, useState } from "react";
import style from "./particular-group.module.css";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Menu,
  MenuItem,
  Modal,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  deleteGroup,
  listGroupMember,
} from "../../features/group/group.action";
import GroupMember from "../members-of-group/members-of-group";
import {
  setCheckboxSelection,
  setGroupModal,
} from "../../features/group/group.slice";
import { listUser } from "../../features/user/user.action";
import ExpenseCard from "../expense-card/expense";
import { FixedSizeList } from "react-window";
import Input from "../input/input";
import {
  createExpense,
  listExpense,
  listExpenseMember,
  listExpenseParticipants,
  updatedExpense,
} from "../../features/expense/expense.action";

const ParticularGroup = ({ setInput, setIsEditState }) => {
  const dispatch = useDispatch();
  const group = useSelector((state) => state.group.currentSelectedGroup);
  const expenses = useSelector((state) => state.expense.expenses);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const expenseMembers = useSelector(
    (state) => state.expense.expenseParticipant
  );

  const groupMembers = useSelector((state) => state.group.currentGroupMembers);
  const [isAddTOGroup, setAddTOGroup] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [openGroupMemberModal, setOpenGroupMemberModal] = useState(false);
  const [isEditStateExpense, setIsEditStateExpense] = useState(false);
  const [particularExpenseId, setParticularExpenseId] = useState(false);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [expense, setExpense] = useState({
    description: "",
    amount: "",
    category: "",
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const modalStyle = {
    top: "50%",
    left: "65%",
    transform: "translate(-50%, -50%)",
    width: "26vw",
    minWidth: "330px",
    height: "310px",
    maxHeight: "auto",
    bgcolor: "rgb(255, 255, 255)",
    color: "black",
    p: 6,
    borderRadius: "10px",
  };

  function viewMembers() {
    setAddTOGroup(false);
    dispatch(setCheckboxSelection(false));
    setOpenGroupMemberModal(true);
    setAnchorEl(false);
  }

  function addMembers() {
    setAddTOGroup(true);
    dispatch(setCheckboxSelection(true));
    dispatch(listUser({ group_id: group.group_id._id, search: "" }));
    setOpenGroupMemberModal(true);
    setAnchorEl(false);
  }

  function removeMembers() {
    setAddTOGroup(false);
    dispatch(setCheckboxSelection(true));
    setOpenGroupMemberModal(true);
    setAnchorEl(false);
  }

  function openExpenseModal() {
    setAddTOGroup(false);
    setIsOpenModal(true);
    setAnchorEl(false);
  }

  function addExpense() {
    dispatch(
      createExpense({
        amount: expense.amount,
        category: expense.category,
        description: expense.description,
        user_id: currentUser.user._id,
        group_id: group.group_id._id,
      })
    );

    setExpense({
      description: "",
      amount: "",
      category: "",
    });
    setIsOpenModal(false);
  }

  useEffect(() => {
    group &&
      dispatch(
        listExpense({
          group_id: group?.group_id?._id,
        })
      );

    group &&
      dispatch(
        listExpenseParticipants({
          group_id: group?.group_id?._id,
        })
      );

    group &&
      dispatch(listGroupMember({ search: "", group_id: group.group_id._id }));
  }, [group]);

  function renderRow() {
    return (
      <>
        {expenses.map((expense) => (
          <ExpenseCard
            setParticularExpenseId={setParticularExpenseId}
            setIsEditStateExpense={setIsEditStateExpense}
            setIsOpenModal={setIsOpenModal}
            setExpense={setExpense}
            key={expense._id}
            id={expense._id}
            amount={expense.amount}
            expenseDescription={expense.description}
            category={expense.category}
            owner={expense.created_by}
            members={expenseMembers.filter(
              (member) => member.expense_id === expense._id
            )}
          ></ExpenseCard>
        ))}
      </>
    );
  }

  function editExpense() {
    dispatch(
      updatedExpense({
        expense_id: particularExpenseId,
        updatedData: {
          ...expense,
        },
      })
    );
    setExpense({
      description: "",
      amount: "",
      category: "",
    });
    setIsEditState(false);
    setIsOpenModal(false);
    setIsEditStateExpense(false)
  }

  function handleCloseModal() {
    setExpense({
      description: "",
      amount: "",
      category: "",
    });
    setIsEditState(false);
    setIsOpenModal(false);
    setIsEditStateExpense(false)

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
              <MenuItem onClick={openExpenseModal}>Add Expense</MenuItem>
              {group.group_id.created_by === currentUser.user._id && (
                <Box>
                  <MenuItem onClick={addMembers}>Add member</MenuItem>
                  <MenuItem onClick={removeMembers}>remove members</MenuItem>
                  <MenuItem
                    sx={{ color: "green" }}
                    onClick={() => {
                      setIsEditState(true);
                      setInput({
                        groupName: group.group_id.name,
                        description: group.group_id.description,
                      });
                      dispatch(setGroupModal(true));
                    }}
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
          <Box className={style["group-content"]}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px",
                width: "100%",
                height: "100%",
                maxWidth: "100%",
                bgcolor: "background.paper",
                backgroundColor: "rgb(225, 222, 222)",
              }}
            >
              <FixedSizeList
                height={600}
                width={"100%"}
                itemSize={1}
                itemCount={1}
                overscanCount={5}
              >
                {renderRow}
              </FixedSizeList>
            </Box>
          </Box>
        </>
      )}

      <GroupMember
        openGroupMemberModal={openGroupMemberModal}
        setOpenGroupMemberModal={setOpenGroupMemberModal}
        isAddTOGroup={isAddTOGroup}
      ></GroupMember>

      <FormControl className="form" sx={{ borderRadius: "10px" }}>
        <Modal sx={modalStyle} open={isOpenModal} onClose={handleCloseModal}>
          <Box className="add-functionality" sx={{ borderRadius: "10px" }}>
            <Box className="add-text">Create Expense</Box>
            <Box className={style.amount}>
              <Input
                lable="Amount"
                height={"40px"}
                width={"95%"}
                value={expense.amount}
                error={false}
                setState={(e) =>
                  setExpense({ ...expense, amount: e.target.value })
                }
              ></Input>
            </Box>
            <Box className={style.description}>
              <Input
                lable="Description"
                height={"40px"}
                width={"95%"}
                value={expense.description}
                error={false}
                setState={(e) =>
                  setExpense({ ...expense, description: e.target.value })
                }
              ></Input>
            </Box>
            <Box className={style.name}>
              <Input
                lable="Category"
                height={"40px"}
                width={"95%"}
                value={expense.category}
                error={false}
                setState={(e) =>
                  setExpense({ ...expense, category: e.target.value })
                }
              ></Input>
            </Box>
            <Box className="Add-edit-close-button">
              <Button
                disableRipple
                disableElevation
                className="add-expense"
                onClick={isEditStateExpense ? editExpense : addExpense}
                variant="contained"
              >
                {isEditStateExpense ? "Edit" : "Create"}
              </Button>
              <Button
                disableRipple
                disableElevation
                className="close-modal"
                onClick={handleCloseModal}
                variant="contained"
              >
                {"Close"}
              </Button>
            </Box>
          </Box>
        </Modal>
      </FormControl>
    </Box>
  );
};

export default ParticularGroup;
