import { CLEAR_CURRENT_USER, SET_CURRENT_USER } from "../types";

const userReducer = (state = {}, action) => {
  switch (action?.type) {
    case SET_CURRENT_USER: // SER_CURRENT_USER => 유저정보 payload를 로컬저장소에 저장하고 유저정보를 업데이트
      localStorage.setItem("currentUser", JSON.stringify(action?.payload));
      return action?.payload;
    case CLEAR_CURRENT_USER:
      localStorage.removeItem("currentUser");
      return null;
    default:
      return  null;//JSON.parse(localStorage.getItem("currentUser"));
  }
};
export default userReducer;
