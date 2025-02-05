import ImgLogo from "@/assets/images/logo.png";
import ImgAvatar from "@/assets/images/avatar.png";
import UserProfile, { UserProfileProps } from "./HeaderItem/UserProfile";
import Navbar from "./HeaderItem/Navbar";

const user: UserProfileProps = {
  name: "Huong Hoang",
  role: "Customer",
  avatar: ImgAvatar
}

const Header = () => {
  return (
    <header className="flex flex-wrap items-center justify-between mx-auto px-4">
      <img
        loading="lazy"
        src={ImgLogo}
        alt="Logo"
        className="w-[7%]"
      />
      <Navbar />
      <UserProfile prop={user} />
    </header>
  )
}

export default Header