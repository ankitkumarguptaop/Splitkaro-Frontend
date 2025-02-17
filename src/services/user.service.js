import axios from "axios";

export const listUserService = async (payload) => {
    const { search ,group_id } = payload;
    return await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}users/${group_id}?search=${search}`,
      
    );
  };