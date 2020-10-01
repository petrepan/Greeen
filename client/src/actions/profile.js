import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  DELETE_PROFILE,
} from "./types";
import { setAlert } from "./alert";

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get("/profile/me")

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
         const errors = error.response.data.errors;

         if (errors) {
           errors.forEach((error) =>
             dispatch(setAlert(error.msg, "bg-red-500", "border-red-400"))
           );
         }
            dispatch({
                type: PROFILE_ERROR,
                payload: error.response.data
            })
    }
}

//get profile by id
export const getProfileById = userId => async dispatch => {
    try {
        const res = await axios.get(`/profile/${userId}`)
           dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
         const errors = error.response.data.errors;

         if (errors) {
           errors.forEach((error) =>
             dispatch(setAlert(error.msg, "bg-red-500", "border-red-400"))
           );
         }
            dispatch({
                type: PROFILE_ERROR,
                payload: error.response.data
            })
    }
} 

//update/create profile 
export const createProfile = (formData) => async dispatch => {
    try {
        const res = await axios.post("/profile", formData);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
    } catch (error) {
            if (errors) {
              errors.forEach((error) =>
                dispatch(setAlert(error.msg, "bg-red-500", "border-red-400"))
              );
        }
        
        dispatch({
            type: PROFILE_ERROR
        })
    }
} 

//delete profile
export const deleteProfile = () => async dispatch => {
      if (window.confirm("Are you sure? This can NOT be undone!")) {
        try {
          await axios.delete("/profile");

          dispatch({ type: DELETE_PROFILE });

          dispatch(
            setAlert(
              "Your account has been permanently deleted",
              "bg-red-500",
              "border-red-400"
            )
          );
        } catch (error) {
             const errors = error.response.data.errors;

             if (errors) {
               errors.forEach((error) =>
                 dispatch(setAlert(error.msg, "bg-red-500", "border-red-400"))
               );
             }
          dispatch({
            type: PROFILE_ERROR,
          });
        }
      }
}