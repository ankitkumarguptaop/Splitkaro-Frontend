import axios from "axios";
axios.defaults.withCredentials = true;

export const listExpenseService = async (payload) => {
  const { group_id } = payload;
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}expense/${group_id}`,
    { withCredentials: true }
  );
};

export const deleteExpenseService = async (payload) => {
  const { expense_id } = payload;
  return await axios.delete(
    `${process.env.REACT_APP_BACKEND_URL}expense/${expense_id}`,
    { withCredentials: true }
  );
};

export const updateExpenseService = async (payload) => {
  const { expense_id, updatedData } = payload;
  return await axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}expense/${expense_id}`,
    { data: updatedData },
    { withCredentials: true }
  );
};

export const createExpenseService = async (payload) => {
  const { user_id, description, amount, category, group_id } = payload;
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}expense/${user_id}`,
    {
      amount: amount,
      category: category,
      group_id: group_id,
      description: description,
    },
    { withCredentials: true }
  );
};

export const listExpenseMemberService = async (payload) => {
  const { group_id, search } = payload;
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}expense/participants/${group_id}?search=${search}`,
    { withCredentials: true }
  );
};

export const updateSettlementService = async (payload) => {
  const { expense_id, setelment_status, user_id } = payload;
  return await axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}expense/participants/${user_id}`,
    { setelment_status: setelment_status, expense_id: expense_id },
    { withCredentials: true }
  );
};

export const addParticipantService = async (payload) => {
  const { user_id, expense_id, pay_amount, group_id } = payload;
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}expense/participants/${user_id}`,
    {
      expense_id: expense_id,
      pay_amount: pay_amount,
      group_id: group_id,
    },
    { withCredentials: true }
  );
};

export const removeParticipantService = async (payload) => {
  const { expense_id, user_id } = payload;
  return await axios.delete(
    `${process.env.REACT_APP_BACKEND_URL}expense/participants/${expense_id}/${user_id}`,
    { data: payload }
  );
};
