import { TemplateConstructionItemType } from '@/models';
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface DraggableItemProps {
    item: TemplateConstructionItemType;
    type: string;
    index: number;
    moveItem: (dragIndex: number, hoverIndex: number, type: string, parentId?: string) => void;
    className?: string;
    renderContent: (item: TemplateConstructionItemType) => React.ReactNode;
    parentId?: string;
}

const DraggableItem = ({
    item,
    type,
    index,
    moveItem,
    className,
    renderContent,
    parentId,
}: DraggableItemProps) => {
    const ref = React.useRef<HTMLDivElement>(null);

    const [{ isDragging }, drag] = useDrag({
        type,
        item: { id: item.id, index, parentId },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: type,
        hover: (draggedItem: { id: string; index: number; parentId?: string }, monitor) => {
            if (!ref.current) return;

            const dragIndex = draggedItem.index;
            const hoverIndex = index;

            // Don't replace items with themselves
            if (dragIndex === hoverIndex && draggedItem.parentId === parentId) return;

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Get horizontal middle
            const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            if (!clientOffset) return;

            // Get pixels to the top/left
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            const hoverClientX = clientOffset.x - hoverBoundingRect.left;

            // Dragging vertically
            if (Math.abs(hoverClientY - hoverMiddleY) > Math.abs(hoverClientX - hoverMiddleX)) {
                // Dragging downward
                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
                // Dragging upward
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
            }
            // Dragging horizontally
            else {
                // Dragging rightward
                if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) return;
                // Dragging leftward
                if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) return;
            }

            // Time to actually perform the action
            moveItem(dragIndex, hoverIndex, type, parentId);

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            draggedItem.index = hoverIndex;
        },
    });

    drag(drop(ref));

    return (
        <div
            ref={ref}
            className={`${className} ${isDragging ? 'opacity-50' : 'opacity-100'}`}
            style={{ cursor: 'move' }}
        >
            {renderContent(item)}
        </div>
    );
};

export default DraggableItem;