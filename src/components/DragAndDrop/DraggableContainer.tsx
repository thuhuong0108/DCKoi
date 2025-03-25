// DraggableContainer.tsx
import React, { useCallback } from 'react';
import DraggableItem from './DraggableItem';
import { TemplateConstructionItemType } from '@/models';

interface DraggableContainerProps {
    items: TemplateConstructionItemType[];
    onItemsChange: (items: TemplateConstructionItemType[]) => void;
    className?: string;
    itemClassName?: string;
    renderItem: (item: TemplateConstructionItemType, index: number) => React.ReactNode;
    type: string;
    parentId: string;
}

const DraggableContainer = ({
    items,
    onItemsChange,
    className,
    itemClassName,
    renderItem,
    type,
    parentId
}: DraggableContainerProps) => {
    // Function to move items within this container
    const moveItem = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            const draggedItem = items[dragIndex];
            const newItems = [...items];
            newItems.splice(dragIndex, 1);
            newItems.splice(hoverIndex, 0, draggedItem);
            onItemsChange(newItems);
        },
        [items, onItemsChange]
    );

    return (
        <div className={className || "flex flex-col space-y-2"}>
            {items.map((item, index) => (
                <div key={item.id} className={itemClassName}>
                    {renderItem(item, index)}
                </div>
            ))}
        </div>
    );
};

export default DraggableContainer;