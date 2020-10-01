import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";
// import setAuthToken from '../utils/setAuthToken'

export const loadUser = () => async (dispatch) => {
  //  if (localStorage.token) {
  //    setAuthToken(localStorage.token)
  //  }
  try {
    const res = await axios.get("/user/me");
    console.log(res.data);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("user/register", formData);
    console.log(res.data);
    if (res.data.success) {
      dispatch(setAlert(res.data.msg, "bg-green-500", "border-red-400"));
    }
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, "bg-red-500", "border-red-400"))
      );
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const login = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("user/login", formData);
    console.log(res.data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, "bg-red-500", "border-red-400"))
      );
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const activation = (formData) => async (dispatch) => {
  try {
    console.log(formData.token);
    const res = await axios.post("/user/activation", formData.token);
    console.log(res.data);
    dispatch({
      type: ACTIVATION_SUCCESS,
      payload: res.data,
    });
    //dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(error.response.data);
    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, "bg-red-500", "border-red-400"))
      );
    }
    dispatch({
      type: ACTIVATION_FAIL,
      payload: error.response.data,
    });
  }
};

export const logout = () => ({ type: LOGOUT });
