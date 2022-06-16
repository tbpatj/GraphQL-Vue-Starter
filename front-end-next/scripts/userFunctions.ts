import axios from "axios";
import { DispatchWithoutAction } from "react";
import { meInfo } from "../resources/GQL";

export function setUser(dispatch, response) {
  dispatch({
    type: "setUserFromToken",
    data: { ...response },
  });
}

export async function getUser(dispatch) {
  const token = window.localStorage.getItem("token");
  if (token !== undefined && token !== null && token !== "") {
    console.log("setting token", token);
    const header = `Bearer${window.localStorage.getItem("token")}`;
    let body = meInfo();
    let response = await axios
      .post(process.env.NEXT_PUBLIC_SERVER_HOST, body, {
        headers: { Authorization: header },
      })
      .then((res) => {
        return res.data.data.me;
      });
    dispatch({
      type: "setUserFromToken",
      data: { ...response },
    });
  }
}
export async function logoutUser(dispatch) {
  window.localStorage.removeItem("token");
  dispatch({
    type: "setUserFromToken",
    data: null,
  });
}
