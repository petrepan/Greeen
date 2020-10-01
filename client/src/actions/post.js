import axios from "axios";

import {
  GET_POSTS,
  GET_POST,
  ADD_POST,
  DRAFT_POST,
  DELETE_POST,
  POST_LIKES,
  ADD_COMMENT,
  ADD_SUBCOMMENT,
  DELETE_COMMENT,
  POST_ERROR,
  EDIT_POST,
} from "./types";  


//get all posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get("/post")
        
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: error.response.data
        })
    }
}

//get single post
export const getPost = (id) => async dispatch => {
    try {
        const res = await axios.get(`/post/${id}`)
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (error) {
        dispatch({
          type: POST_ERROR,
          payload: error.response.data,
        });
    }
}

//add post
export const addPost = (postData) => async dispatch => {
    try {
        const res = await axios.post("/post/new", postData)

        dispatch({
            type: ADD_POST,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: error.response.data
        })
    }
}

//draft post
export const draftPost = (postData) => async (dispatch) => {
  try {
    const res = await axios.post("/post/draft", postData);

    dispatch({
      type: DRAFT_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.response.data,
    });
  }
};

//edit post
export const editPost = (id, postData) => async (dispatch) => {
  try {
    const res = await axios.put(`/post/edit/${id}`, postData);

    dispatch({
      type: EDIT_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.response.data,
    });
  }
};

//delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/post/delete/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.response.data,
    });
  }
};

//like post
export const likePost = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/post/like/${id}`);

    dispatch({
      type: POST_LIKES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.response.data,
    });
  }
};

//comment post
export const commentPost = (postId, formData) => async (dispatch) => {
  try {
    const res = await axios.put(`/post/comment/${postId}`, formData);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.response.data,
    });
  }
};

//delete comment post
export const deleteCommentPost = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/post/comment/${postId}/${commentId}`);

    dispatch({
      type: DELETE_COMMENT,
      payload: commentId,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.response.data,
    });
  }
};

//add subcomment post
export const subcommentPost = (postId,commentId, formData) => async (dispatch) => {
  try {
    const res = await axios.put(`/post/comment/${postId}/${commentId}`, formData);

    dispatch({
      type: ADD_SUBCOMMENT,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.response.data,
    });
  }
};