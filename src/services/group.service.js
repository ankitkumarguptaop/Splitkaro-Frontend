import axios from "axios";
axios.defaults.withCredentials = true;

export const listGroupService = async (payload) => {
  const { user_id } = payload;
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}groups/${user_id}`,
    { withCredentials: true }
  );
};

export const deleteGroupService = async (payload) => {
  const { group_id } = payload;
  return await axios.delete(
    `${process.env.REACT_APP_BACKEND_URL}groups/${group_id}`,
    { withCredentials: true }
  );
};

export const updateGroupService = async (payload) => {
  const { group_id, updatedData } = payload;
  return await axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}groups/${group_id}`,
    updatedData
  );
};

export const createGroupService = async (payload) => {
  const { user_id, description, name } = payload;
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}groups/${user_id}`,
    {
      name: name,
      description: description,
    },
    { withCredentials: true }
  );
};

export const listGroupMemberService = async (payload) => {
  const { group_id, search } = payload;
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}groups/members/${group_id}?search=${search}`,
    { withCredentials: true }
  );
};

export const addMembersService = async (payload) => {
  const { group_id } = payload;
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}groups/members/${group_id}`,
    payload,
    { withCredentials: true }
  );
};

export const removeMembersService = async (payload) => {
  const { group_id } = payload;
  console.log("payload", payload);
  return await axios.delete(
    `${process.env.REACT_APP_BACKEND_URL}groups/members/${group_id}`,
    { data: payload }
  );
};
