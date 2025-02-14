import axios from "axios";

export const listGroupService = async (payload) => {
  const { user_id } = payload;
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}groups/${user_id}`,
    { withCredentials: true } );
};

export const deleteGroupService = async (payload) =>{
    const {group_id} =payload
  await axios.delete(
    `${process.env.REACT_APP_BACKEND_URL}groups/${group_id}`
  );
}
export const updateGroupService = async (payload) => {
  const { group_id, updatedData } = payload;
  return await axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}groups/${group_id}`,
    updatedData
  );
};

export const createGroupService = async (payload) => {
  const { user_id, description, name } = payload;
  await axios.post(`${process.env.REACT_APP_BACKEND_URL}groups/${user_id}`, {
    name: name,
    description: description
  },{ withCredentials: true });
};
