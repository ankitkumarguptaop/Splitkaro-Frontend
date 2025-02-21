import axios from "axios";

export const listNotificationService = async (payload) => {
  const { user_id } = payload;
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}notifications/${user_id}`
  );
};
