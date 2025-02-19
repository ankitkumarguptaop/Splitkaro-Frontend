import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Paper from "@mui/material/Paper";
import style from "./expense.module.css";
import {
  Box,
  FormControl,
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
import { listGroupMember } from "../../features/group/group.action";
import {
  addParticipant,
  listExpenseMember,
  updatedExpense,
  updateSettlementExpense,
} from "../../features/expense/expense.action";

export default function ExpenseCard({
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
  const [leftAmount, setLeftPayAmount] = useState(100);
  // const expenseMembers = useSelector((state) => state.expense.expenseParticipant);
  console.log("✌️expenseMembers --->", members, id);

  console.log("groupMembers --->", groupMembers);
  console.log("Members --->", members);
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

  const styleModal = {
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
  const styleChildModal = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "27vw",
    minWidth: "350px",
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

  return (
    <>
      <Card sx={{ maxWidth: "95%", margin: "10px" }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {category}
            </Typography>
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
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                                )
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
        <CardActions>
          {currentUser.user._id === owner && (
            <Button
              size="small"
              color="primary"
              onClick={openModalToSeeLeftMembers}
            >
              Add participant
            </Button>
          )}
        </CardActions>
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
            {/* <Button
              sx={{ marginLeft: "5px", marginRight: "5px" }}
              variant="contained"
              onClick={addMemberToExpense}
            >
              Add
            </Button> */}

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
                error={false}
                setState={(e) => setPayAmount(e.target.value)}
              ></Input>
            </Box>
            <Box
              sx={{ display: "flex", margin: "5px 5px" }}
              className={style["left-amount"]}
            >
              <Typography>LeftAmount : </Typography>
              <Typography>{leftAmount}</Typography>
            </Box>

            <Box className="Add-edit-close-button">
              <Button
                disableRipple
                disableElevation
                className="add-expense"
                onClick={addParticipantTOExpense}
                variant="contained"
              >
                {"Create"}
              </Button>
              <Button
                disableRipple
                disableElevation
                className="close-modal"
                onClick={() => setOpenAddParticipantModal(false)}
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
