import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Paper from "@mui/material/Paper";
// import style from "./expense.module.css";
import {
  Box,
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

export default function ExpenseCard({
  amount,
  expenseDescription,
  category,
  owner,
}) {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const groupMembers = useSelector((state) => state.group.currentGroupMembers);
  const expenseMembers = useSelector((state) => state.expense.currentGroupMembers);

  console.log("groupMembers --->", groupMembers);
  const data = [];
  const group = useSelector((state) => state.group.currentSelectedGroup);

  // const data = groupMembers.map((member) => {
  //   return {
  //     id: member.member_id._id,
  //     name: member.member_id.name,
  //     phone_no: member.member_id.phone_no,
  //     email: member.member_id.email
  //   };
  // }).filter((member)=>{
  //     return expenseMembers.find((expenseMember)=>{
  //        id!=expenseMember._id
  //     })
  // })

  const [openExpenseParticipantModal, setOpenExpenseParticipantModal] =
    useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
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

  const rows = [createData("Frozen yoghurt", 159, 6.0, 24, 4.0)];

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

  function openModalTOAddMember() {
    setOpenExpenseParticipantModal(true);
  }

  function addMemberToExpense() {
    // setOpenExpenseParticipantModal(false);
  }

  return (
    <>
      <Card sx={{ maxWidth: 650, borderRadius: "10px", margin: "10px" }}>
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
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {currentUser.user._id === owner && (
            <Button size="small" color="primary" onClick={openModalTOAddMember}>
              Add participant
            </Button>
          )}
        </CardActions>
      </Card>

      <Modal
        sx={style}
        open={openExpenseParticipantModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="data-grid">
          <Box sx={{ height: "300px" }}>
            <DataGrid
              rows={data}
              // getRowId={(member) => {
              //   console.log(member);
              //   return member.id;
              // }}

              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection={false}
              onStateChange={(event) => {
                setSelectedRows(event.rowSelection);
              }}
            />
          </Box>

          <Box className="Add-close-button">
            <Button
              sx={{ marginLeft: "5px", marginRight: "5px" }}
              variant="contained"
              onClick={addMemberToExpense}
            >
              Add
            </Button>

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
    </>
  );
}
