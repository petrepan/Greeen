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
} from "../actions/types";

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
      case GET_POSTS:
        return {
          ...state,
          posts: action.payload,
          loading: false,
        };
      case GET_POST:
        return {
          ...state,
          post: action.payload,
          loading: false,
        };
      case ADD_POST:
        return {
          ...state,
          posts: [action.payload, ...state.posts],
          loading: false,
        };
      case DRAFT_POST:
        return {
          ...state,
          posts: [action.payload, ...state.posts],
          loading: false,
        };
      case DELETE_POST:
        return {
          ...state,
          posts: state.posts.filter((post) => post.id !== action.payload),
          loading: false,
        };
      case POST_LIKES:
        return {
          ...state,
          post: { ...state.post, likes: action.payload },
          loading: false,
        };
      case ADD_COMMENT:
        return {
          ...state,
          post: { ...state.post, comments: action.payload },
          loading: false,
        };
      case DELETE_COMMENT:
        return {
          ...state,
          post: {
            ...state.post,
            comments: state.post.comments.filter(
              (comment) => comment._id !== action.payload
            ),
          },
          loading: false,
        };
      case ADD_SUBCOMMENT:
        return {
          ...state,
          post: { ...state.post, comments: {subcomments: action.payload} },
          loading: false,
        };
        case EDIT_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
                loading: false
            };
        case POST_ERROR: {
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        }
      default:
        return state
    }
}