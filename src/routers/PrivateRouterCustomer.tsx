import { RoleUser } from "@/models/enums/RoleUser";
import {
  selectIsAuthenticated,
  selectRole,
} from "@/redux/slices/auth/authSlices";
import { useAppSelector } from "@/redux/store/hook";
import { ComponentType } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouterCustomerProps {
  Pages: ComponentType;
}

const PrivateRouterCustomer = ({ Pages }: PrivateRouterCustomerProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const role = useAppSelector(selectRole);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  } else if (role !== RoleUser.CUSTOMER) {
    return <Navigate to="/" />;
  }

  return <Pages />;
};

export default PrivateRouterCustomer;
