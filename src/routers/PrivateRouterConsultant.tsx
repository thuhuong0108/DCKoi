import { RoleUser } from "@/models/enums/roleUser";
import {
  selectIsAuthenticated,
  selectRole,
} from "@/redux/slices/auth/authSlices";
import { useAppSelector } from "@/redux/store/hook";
import { ComponentType } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouterConsultantProps {
  Pages: ComponentType;
}

const PrivateRouterConsultant = ({ Pages }: PrivateRouterConsultantProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const role = useAppSelector(selectRole);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  } else if (role !== RoleUser.CONSULTANT) {
    return <Navigate to="/consultant" />;
  }

  return <Pages />;
};

export default PrivateRouterConsultant;
