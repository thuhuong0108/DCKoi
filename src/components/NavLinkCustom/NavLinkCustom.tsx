import { NavLink } from "react-router-dom";

interface NavLinkProps {
    path: string;
    label: string;
}

const NavLinkCustom = ({ path, label }: NavLinkProps) => {
    return (
        <div>
            <NavLink to={path} className="bg-transparent text-white border border-solid border-white px-7 py-2 transition-all duration-300 hover:font-bold hover:text-xl hover:px-9 hover:py-3">
                {label}
            </NavLink>
        </div>
    )
}

export default NavLinkCustom
