import { useEffect, useRef } from "react";
import { ContextMenuProps } from "./type";

const ContextMenu = ({
    className,
    menuItems,
    isVisible,
    position,
    align,
    onClose
}: ContextMenuProps) => {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isVisible]);

    if (!isVisible) return null;

    const defaultClassName = "absolute bg-white shadow-md rounded-md py-2 w-48 z-50";

    // Apply positioning based on align prop, but preserve user-provided className
    const style: React.CSSProperties = {
        position: 'absolute',
        top: `${position.y}px`,
        [align === "left" ? "right" : "left"]: `${align === "left" ? "auto" : position.x}px`,
        [align === "left" ? "left" : "right"]: `${align === "left" ? position.x - 200 : "auto"}px`,
        zIndex: 50
    };

    return (
        <div
            ref={menuRef}
            className={className || defaultClassName}
            style={style}
        >
            {menuItems.map((item, index) => (
                <div
                    key={index}
                    className="bg-gray-300 px-2 py-1 hover:bg-gray-200 cursor-pointer flex items-center"
                    onClick={() => {
                        item.action();
                        onClose();
                    }}
                >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    <span>{item.label}</span>
                </div>
            ))}
        </div>

    );
};

export default ContextMenu;