import ImgLogo from "@/assets/images/logo.png";
import UserProfile, { UserProfileProps } from "./HeaderItem/UserProfile";
import Navbar from "./HeaderItem/Navbar";

const user: UserProfileProps = {
  name: "Huong Hoang",
  role: "Customer",
  avatar: "https://cdn.icon-icons.com/icons2/2643/PNG/512/avatar_female_woman_person_people_white_tone_icon_159360.png"
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