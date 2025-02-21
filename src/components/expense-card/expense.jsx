import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Paper from "@mui/material/Paper";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import style from "./expense.module.css";
import {
  Box,
  FormControl,
  Menu,
  MenuItem,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Input from "../input/input";
import { useState } from "react";
import {
  addParticipant,
  deleteExpense,
  updateSettlementExpense,
} from "../../features/expense/expense.action";
import { useEffect } from "react";

import { socket } from "../../configs/socket";

export default function ExpenseCard({
  setParticularExpenseId,
  setIsEditStateExpense,
  setIsOpenModal,
  setExpense,
  amount,
  expenseDescription,
  category,
  owner,
  members,
  id,
}) {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const groupMembers = useSelector((state) => state.group.currentGroupMembers);

  const [payAmount, setPayAmount] = useState("");
  const [leftAmount, setLeftPayAmount] = useState(parseInt(amount));
  const [assignedAmmount, setAssignAmount] = useState(0);

  const group = useSelector((state) => state.group.currentSelectedGroup);

  const data = groupMembers
    ?.map((member) => ({
      id: member.member_id._id,
      name: member.member_id.name,
      phone_no: member.member_id.phone_no,
      email: member.member_id.email,
    }))
    .filter((member) => {
      if (member.id === owner) {
        return false;
      }
      if (!members || members.length === 0) {
        return true;
      }

      return members.every(
        (expenseMember) =>
          member.id !== expenseMember.payer_id._id &&
          member.id !== expenseMember.payee_id
      );
    });

  const [openExpenseParticipantModal, setOpenExpenseParticipantModal] =
    useState(false);
  const [openAddParticipantModal, setOpenAddParticipantModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const styleModal = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "27vw",
    minWidth: "590px",
    height: 400,
    bgcolor: "rgb(255, 255, 255)",
    color: "black",
    p: 3,
  };
  const styleChildModal = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "27vw",
    minWidth: "500px",
    height: "250px",
    bgcolor: "rgb(255, 255, 255)",
    color: "black",
    p: 3,
  };

  const rows = members.map((member) => ({
    id: member.payer_id._id,
    name: member.payer_id.name,
    setelment_status: member.setelment_status,
    pay_amount: member.pay_amount,
    phone_no: member.payer_id.phone_no,
  }));

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

  function openModalToSeeLeftMembers() {
    setOpenExpenseParticipantModal(true);
  }

  function openAddMemberToExpenseModal() {
    setOpenExpenseParticipantModal(false);
    setOpenAddParticipantModal(true);
  }

  function addParticipantTOExpense() {
    dispatch(
      addParticipant({
        user_id: selectedRows[0],
        expense_id: id,
        pay_amount: payAmount,
        group_id: group.group_id._id,
      })
    );
    setOpenAddParticipantModal(false);
  }

  function deleteParticularExpense() {
    dispatch(
      deleteExpense({
        expense_id: id,
      })
    );
  }

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function updatePartcularExpense() {
    setParticularExpenseId(id);
    setIsEditStateExpense(true);
    setIsOpenModal(true);
    setExpense({
      description: expenseDescription,
      amount: amount,
      category: category,
    });
  }

  let Ammount = 0;
  useEffect(() => {
    for (let i = 0; i < members.length; i++) {
      Ammount += members[i].pay_amount;
    }
    setLeftPayAmount(amount - assignedAmmount);
    setAssignAmount(Ammount);
  }, [members]);

  return (
    <>
      <Card sx={{ maxWidth: "95%", margin: "10px" }}>
        <CardActionArea>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography gutterBottom variant="h5" component="div">
                {category}
              </Typography>
              {members.length <= 0 && (
                <>
                  <MoreVertIcon
                    sx={{ cursor: "pointer" }}
                    id="demo-positioned-button"
                    aria-controls={open ? "demo-positioned-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  ></MoreVertIcon>
                  <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    open={open}
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                  >
                    <MenuItem onClick={updatePartcularExpense}>
                      Update Expense
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
            <Typography gutterBottom variant="h5" component="div">
              Expense: {amount}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {expenseDescription}
            </Typography>
            <TableContainer sx={{ marginTop: "10px" }} component={Paper}>
              <Table
                sx={{ minWidth: 600 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: 200 }}>Name </TableCell>
                    <TableCell sx={{ width: 100 }} align="right">
                      Amount
                    </TableCell>
                    <TableCell sx={{ width: 100 }} align="right">
                      status
                    </TableCell>
                    <TableCell sx={{ width: 130 }} align="right">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        height: "40px",
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.pay_amount}</TableCell>
                      <TableCell
                        sx={{
                          backgroundColor: row.setelment_status
                            ? "green"
                            : "yellow",
                        }}
                        align="right"
                      >
                        {row.setelment_status ? "Paid" : "Pending"}
                      </TableCell>
                      <TableCell align="right">
                        {row.id === currentUser.user._id &&
                          !row.setelment_status && (
                            <Button
                              variant="contained"
                              onClick={() => {
                                dispatch(
                                  updateSettlementExpense({
                                    expense_id: id,
                                    setelment_status: true,
                                    user_id: row.id,
                                  })
                                );
                              }}
                            >
                              Pay
                            </Button>
                          )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </CardActionArea>
        {currentUser.user._id === owner && (
          <CardActions
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              size="small"
              color="primary"
              variant="contained"
              sx={{
                marginLeft: "5px",
                marginRight: "5px",
              }}
              onClick={openModalToSeeLeftMembers}
            >
              Add participant
            </Button>
            <Button
              size="small"
              sx={{
                backgroundColor: "red",
                color: "black",
                marginLeft: "5px",
                marginRight: "5px",
              }}
              onClick={deleteParticularExpense}
            >
              Delete
            </Button>
          </CardActions>
        )}
      </Card>

      <Modal
        sx={styleModal}
        open={openExpenseParticipantModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="data-grid">
          <Box sx={{ height: "300px" }}>
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
              sx={{ cursor: "pointer" }}
              checkboxSelection={false}
              onStateChange={(event) => {
                setSelectedRows(event.rowSelection);
              }}
              onCellClick={openAddMemberToExpenseModal}
            />
          </Box>

          <Box className="Add-close-button">
            <Button
              variant="contained"
              onClick={() => {
                setOpenExpenseParticipantModal(false);
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

      <FormControl className="form" sx={{ borderRadius: "10px" }}>
        <Modal sx={styleChildModal} open={openAddParticipantModal}>
          <Box className="add-functionality" sx={{ borderRadius: "10px" }}>
            <Box className="add-text">Add Participant</Box>
            <Box className={style.amount}>
              <Typography>Enter pay Amount</Typography>

              <Input
                lable="Amount"
                height={"40px"}
                width={"95%"}
                value={payAmount}
                error={leftAmount < 0}
                setState={(e) => {
                  setPayAmount(e.target.value);
                  setLeftPayAmount(amount - assignedAmmount - e.target.value);
                }}
              ></Input>
            </Box>
            <Box
              sx={{ display: "flex", margin: "5px 5px" }}
              className={style["left-amount"]}
            >
              <Typography sx={{ color: leftAmount < 0 ? "red" : "black" }}>
                LeftAmount :{" "}
              </Typography>
              {leftAmount >= 0 ? (
                <Typography sx={{ color: leftAmount < 0 ? "red" : "black" }}>
                  {leftAmount}
                </Typography>
              ) : (
                <Typography sx={{ color: "red" }}>
                  payamount is more than left amount
                </Typography>
              )}
            </Box>

            <Box className="Add-edit-close-button">
              {leftAmount >= 0 && (
                <Button
                  disableRipple
                  disableElevation
                  className="add-expense"
                  onClick={addParticipantTOExpense}
                  variant="contained"
                >
                  {"Create"}
                </Button>
              )}
              <Button
                disableRipple
                disableElevation
                className="close-modal"
                onClick={() => {
                  setOpenAddParticipantModal(false);
                  setPayAmount("");
                }}
                variant="contained"
              >
                {"Close"}
              </Button>
            </Box>
          </Box>
        </Modal>
      </FormControl>
    </>
  );
}
