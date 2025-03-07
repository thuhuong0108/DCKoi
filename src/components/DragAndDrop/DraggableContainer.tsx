// DraggableContainer.tsx
import React, { useCallback } from 'react';
import DraggableItem from './DraggableItem';
import { TemplateConstructionItemType } from '@/models';

interface ContainerProps {
    items: TemplateConstructionItemType[];
    onItemsChange: (items: TemplateConstructionItemType[]) => void;
    className?: string;
    itemClassName?: string;
    renderItem: (item: TemplateConstructionItemType) => React.ReactNode;
    type: string;
    parentId?: string;
}

const DraggableContainer = ({
    items,
    onItemsChange,
    className,
    itemClassName,
    renderItem,
    type,
    parentId,
}: ContainerProps) => {
    const moveItem = useCallback(
        (dragIndex: number, hoverIndex: number, itemType: string, dragParentId?: string) => {
            // Only move items within the same container
            if (dragParentId !== parentId) return;

            const draggedItem = items[dragIndex];
            const newItems = [...items];
            newItems.splice(dragIndex, 1);
            newItems.splice(hoverIndex, 0, draggedItem);
            onItemsChange(newItems);
        },
        [items, onItemsChange, parentId]
    );

    return (
        <div className={className}>
            {items.map((item, index) => (
                <DraggableItem
                    key={item.id}
                    item={item}
                    index={index}
                    moveItem={moveItem}
                    type={type}
                    className={itemClassName}
                    renderContent={renderItem}
                    parentId={parentId}
                />
            ))}
        </div>
    );
};

export default DraggableContainer;