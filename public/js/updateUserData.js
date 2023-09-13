/* eslint-disable */ /*because it is configured for node.js */

import axios from "axios";
import { showAlert } from "./alerts";

// type is either "password" or "data"
export const updateData = async (data, type) => {
  try {
    const url =
      type === "password"
        ? "/api/v1/users/updatePassword"
        : "/api/v1/users/updateMe";

    const res = await axios({
      method: "PATCH",
      url,
      data,
    });

    if (res.data.status === "success") {
      showAlert("success", `${type} updated successfully!`);
      window.setTimeout(() => {
        location.reload();
      }, 2000);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
