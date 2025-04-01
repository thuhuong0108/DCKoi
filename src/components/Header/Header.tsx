import ImgLogo from "@/assets/images/logo.png";
import {
  selectCurrentUser,
  selectIsAuthenticated,
  selectRole,
} from "@/redux/slices/auth/authSlices";
import { useAppSelector } from "@/redux/store/hook";
import { useNavigate } from "react-router-dom";
import Navbar from "./HeaderItem/Navbar";
import UserProfile from "./HeaderItem/UserProfile";
import { RoleUser } from "@/models/enums/RoleUser";

const Header = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const currentUser = useAppSelector(selectCurrentUser);
  const roleUser = useAppSelector(selectRole);
  const navigate = useNavigate();
  const screenNavigate = () => {
    if (roleUser === RoleUser.DESIGNER) {
      return "/designer";
    } else if (roleUser === RoleUser.MANAGER) {
      return "/manager";
    } else if (roleUser === RoleUser.CONSULTANT) {
      return "/consultant";
    } else if (roleUser === RoleUser.CUSTOMER) {
      return "/space-management/consultations";
    } else if (roleUser === RoleUser.ADMINISTRATOR) {
      return "/admin";
    } else if (roleUser === RoleUser.CONSTRUCTOR) {
      return "/constructor";
    }
  };

  return (
    <header className="flex flex-wrap items-center justify-between mx-auto px-4">
      <img loading="lazy" src={ImgLogo} alt="Logo" className="w-[7%]" />
      <Navbar />
      {isAuthenticated && currentUser ? (
        <div className="flex gap-4">
          <UserProfile
            prop={{
              name: currentUser.fullName,
              role: roleUser,
              avatar: currentUser.avatar,
            }}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded "
            onClick={() => navigate(`${screenNavigate()}`)}
          >
            Không gian làm việc
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <button
            className="bg-white text-black border border-black px-4 py-2 rounded hover:font-semibold"
            onClick={() => navigate("/login")}
          >
            Đăng nhập
          </button>
          <button
            className="bg-black text-white px-4 py-2 rounded border hover:font-semibold"
            onClick={() => navigate("/register")}
          >
            Đăng ký
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
