import { TemplateConstructionItemType } from '@/models';
import React from 'react';

interface DraggableChildItemProps {
    item: TemplateConstructionItemType;
    className?: string;
}

const DraggableChildItem = ({
    item,
    className,
}: DraggableChildItemProps) => {
    const defaultClassName = "w-full";

    return (
        <div className={className || defaultClassName}>
            <div className="text-lg font-bold">{item.name}</div>
            {item.description && <p className="text-gray-600 mt-1">{item.description}</p>}
        </div>
    );
};

export default DraggableChildItem;