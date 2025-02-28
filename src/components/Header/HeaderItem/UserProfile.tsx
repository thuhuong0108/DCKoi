import { authActions } from "@/redux/slices/auth/authSlices";
import { useAppDispatch } from "@/redux/store/hook";
import { Dropdown, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";

export interface UserProfileProps {
  name: string;
  role: string;
  avatar: string;
}

interface UserProfile {
  prop: UserProfileProps;
}

const UserProfile = ({ prop }: UserProfile) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/login");
  };

  const items: MenuProps["items"] = [
    {
      label: "Log out",
      key: "0",
      onClick: handleLogout,
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      trigger={["click"]}
      placement="bottom"
      arrow={{ pointAtCenter: true }}
    >
      <button>
        <div className="flex px-1.5 py-1 rounded-lg border border-solid border-zinc-400 border-opacity-20">
          <div className="flex gap-3 max-w-[300px] min-w-[180px]">
            <img
              loading="lazy"
              src={prop.avatar}
              alt={`Profile picture of ${prop.name}`}
              className="object-contain shrink-0 rounded-lg aspect-[0.85] w-[30px]"
            />
            <div className="flex flex-col my-auto min-h-[20px]">
              <div className="text-left text-base font-semibold text-zinc-900">
                {prop.name}
              </div>
              <div className="text-left text-xs font-light text-zinc-400">
                {prop.role}
              </div>
            </div>
          </div>
        </div>
      </button>
    </Dropdown>
  );
};

export default UserProfile;
