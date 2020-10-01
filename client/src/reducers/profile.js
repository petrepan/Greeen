import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  DELETE_PROFILE,
} from "../actions/types";

const initialState = {
  profile: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
      case GET_PROFILE:
      case UPDATE_PROFILE:
        return {
          ...state,
          profile: action.payload,
          loading: false,
        };
      case PROFILE_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false,
          profile: null,
            };
        case DELETE_PROFILE:
            return {
                ...state,
                profile:null
            }
      default:
        return state;
    }
}