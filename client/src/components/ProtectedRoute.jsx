import { Navigate, Outlet} from "react-router-dom";

export const ProtectedRoute = ( { user } ) => {
  
  return (
    !user? <Navigate to='/login' /> : <Outlet/>
  )

}