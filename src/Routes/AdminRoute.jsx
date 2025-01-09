import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";


const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()
    const [isAdmin, isaAdminLoading] = useAdmin()


    if (loading || isaAdminLoading) {
        return <progress className="progress w-56"></progress>
    }
    if (user && isAdmin) {
        return children
    }
    return <Navigate to='/' state={{ from: location }} replace></Navigate>
};

export default AdminRoute;