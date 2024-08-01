import axios from "axios";
import { clearCurrentUser } from "../productAdim/store/actions/user";
import { store } from "../productAdim/store/configStore";

const authHeader=() => {
    const currentUser=store.getState().user;
    return {
        'Content-Type':'application/json',
        'authorization':'Bearer '+currentUser?.token,
    }
}

const handleResponseWithLoginCheck = () => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        const currentUser = store.getState().user;
        const isLoggedIn = currentUser?.token;
        const status = error?.response?.status;
        if (isLoggedIn && [401, 403].includes(status)) {
          store.dispatch(clearCurrentUser());
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  };
export { authHeader, handleResponseWithLoginCheck };