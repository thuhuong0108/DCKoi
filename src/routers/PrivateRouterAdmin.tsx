import { RoleUser } from "@/models/enums/roleUser"
import { selectIsAuthenticated, selectRole } from "@/redux/slices/auth/authSlices"
import { useAppSelector } from "@/redux/store/hook"
import { ComponentType } from "react"
import { Navigate } from "react-router-dom"

interface PrivateRouterAdminProps {
    Pages: ComponentType
}

const PrivateRouterAdmin = ({ Pages }: PrivateRouterAdminProps) => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const role = useAppSelector(selectRole);

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }
    else if (role !== RoleUser.ADMINISTRATOR) {
        return <Navigate to="/" />
    }

    return (
        <Pages />
    )
}

export default PrivateRouterAdmin
