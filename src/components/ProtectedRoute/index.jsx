import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { isLoggedInState } from "../../lib/recoil/auth";

function ProtectedRoute() {
  const isLoggedIn = useRecoilValue(isLoggedInState);

  if (!isLoggedIn) {
    return <Navigate to={"/"} replace={true} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
