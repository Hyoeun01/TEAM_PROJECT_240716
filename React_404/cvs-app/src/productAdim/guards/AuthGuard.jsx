import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children, roles }) => {
  const currentUser = useSelector((state) => state.user);

  const authorize = () => {
    //현재 인증된 유저가 아니면 401
    console.log("401확인해보자");
    if (!currentUser) {
      return <Navigate to="/401" />;
    }
    //유저의 권한이 props권한과 같은게 없을 경유 401
    if (roles?.indexOf(currentUser.role) === -1) {
      return <Navigate to="/401" />;
    }
    return children;
  };
  return authorize();
};
export default AuthGuard;
