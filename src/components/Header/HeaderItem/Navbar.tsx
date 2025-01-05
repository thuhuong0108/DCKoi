import { NavLink } from "react-router-dom";

interface NavItems {
    label: string;
    path: string;
}

const navItems: NavItems[] = [
    { label: "Home", path: "/" },
    { label: "Introduction", path: "/*" },
    { label: "Blogs", path: "/*" },
    { label: "Services", path: "/*" },
    { label: "Projects", path: "/*" },
    { label: "Quote", path: "/*" }
];

const Navbar = () => {
    return (
        <div className="flex flex-row space-x-8 font-medium">
            {navItems.map((item) => (
                <NavLink key={item.label} to={item.path} className="relative group py-0.5">{item.label}
                    <span className="absolute bottom-0 left-1/2 h-[3px] rounded-md w-0 bg-black transition-all duration-300 transform -translate-x-1/2 group-hover:w-full"></span>
                </NavLink>
            ))}
        </div>
    )
}
export default Navbar