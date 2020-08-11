import { RECEIVE_USER_LOGOUT, RECEIVE_USER_SIGN_IN, RECEIVE_CURRENT_USER } from "../actions/session_actions";

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined,
      }
    case RECEIVE_USER_SIGN_IN:
      return {
        isAuthenticated: true,
        user: action.currentUser,
      }
    case RECEIVE_CURRENT_USER:
      debugger
      return {
        isAuthenticated: true,
        user: {
          email: action.currentUser.data.email,
          handle: action.currentUser.data.handle,
        },
      };
    default:
      return state;
  }
}