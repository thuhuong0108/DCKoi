import { TemplateConstructionItemType } from '@/models';
import React, { useRef, useState } from 'react';
import ContextMenu from './ContextMenu';
import TaskDetailModal from '../TaskDetailModal';

interface DraggableChildItemProps {
    item: TemplateConstructionItemType;
    className?: string;
    menuClassName?: string;
    menuItems?: { label: string; icon?: React.ReactNode; action: () => void }[];
    onItemUpdate?: (updatedItem: TemplateConstructionItemType) => void;
}

const DraggableChildItem = ({
    item,
    className,
    menuClassName,
    menuItems = [],
    onItemUpdate
}: DraggableChildItemProps) => {
    const defaultClassName = "w-full";
    const itemRef = useRef<HTMLDivElement>(null);
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [align, setAlign] = useState<"left" | "right">("right");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRightClick = (event: React.MouseEvent) => {
        event.preventDefault();
        if (!itemRef.current) return;

        const rect = itemRef.current.getBoundingClientRect();
        const screenWidth = window.innerWidth;

        // Check if there's enough space on the right, otherwise move to the left
        if (rect.right + 200 > screenWidth) {
            setAlign("left");
            setMenuPosition({ x: rect.left, y: rect.top });
        } else {
            setAlign("right");
            setMenuPosition({ x: rect.right, y: rect.top });
        }

        setMenuVisible(true);
    };

    const handleItemClick = (event: React.MouseEvent) => {
        // Only open modal on regular click, not right click
        if (event.button === 0) {
            setIsModalOpen(true);
        }
    };

    const handleUpdateItem = (updatedItem: TemplateConstructionItemType) => {
        if (onItemUpdate) {
            onItemUpdate(updatedItem);
        }
        setIsModalOpen(false);
    };

    const spotlightClasses = menuVisible
        ? "bg-gray-700 text-white shadow-lg transform scale-102 transition-all duration-200"
        : "";

    return (
        <>
            {/* Background overlay when menu is open */}
            {menuVisible && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setMenuVisible(false)}
                />
            )}
            <div
                ref={itemRef}
                className={`${className || defaultClassName} ${menuVisible ? "relative z-45 shadow-xl" : ""} 
                           p-2 rounded-md transition-all duration-200 cursor-pointer hover:bg-gray-300`}
                onContextMenu={handleRightClick}
                onClick={handleItemClick}
            >
                <div className="text-lg font-bold">{item.name}</div>
                {item.description && <p className="text-gray-600 mt-1">{item.description}</p>}
            </div>

            {/* Context Menu */}
            <ContextMenu
                className={menuClassName}
                menuItems={menuItems}
                isVisible={menuVisible}
                position={menuPosition}
                align={align}
                onClose={() => setMenuVisible(false)}
            />

            {/* Task Detail Modal */}
            <TaskDetailModal
                item={item}
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onUpdate={handleUpdateItem}
            />
        </>
    );
};

export default DraggableChildItem;