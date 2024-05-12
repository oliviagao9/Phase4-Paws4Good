import { Navigate, Outlet} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const ProtectedRoute = (  ) => {
  const user = useSelector(state => state.session.user);
  return (
    !user? <Navigate to='/login' /> : <Outlet/>
  )

}