import * as api from "../Api";
import { setcurrentuser } from "./currentuser";

export const login = (authdata) => async (dispatch) => {
  try {
    const { data } = await api.login(authdata);

    // ✅ Save full data object to localStorage
    localStorage.setItem("Profile", JSON.stringify(data));

    // ✅ Dispatch full object (with result and token)
    dispatch({ type: "AUTH", data });
    dispatch(setcurrentuser(data)); // ✅ FIXED HERE
    
  } catch (error) {
    alert("Login failed. Please check credentials or try again.");
    console.error(error);
  }
};
