import { TemplateConstructionItemType } from "@/models";
import { useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableItem from "./DraggableItem";
import { ItemTypes } from "./type";
import DraggableParentItem from "./DraggableParentItem";

interface DragDropTemplateConstructorProps {
    items: TemplateConstructionItemType[];
    idTemplate: string;
    onItemsChange: (items: TemplateConstructionItemType[]) => void;
    containerClassName?: string;
    parentItemClassName?: string;
    childItemClassName?: string;
}

const DragDropTemplateConstructor = ({
    items,
    idTemplate,
    onItemsChange,
    containerClassName,
    parentItemClassName,
    childItemClassName,
}: DragDropTemplateConstructorProps) => {
    // Function to handle moving parent items
    const moveParentItem = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            const newItems = [...items];
            const draggedItem = newItems[dragIndex];
            newItems.splice(dragIndex, 1);
            newItems.splice(hoverIndex, 0, draggedItem);
            onItemsChange(newItems);
        },
        [items, onItemsChange]
    );

    // Function to handle changing children of a parent
    const handleChildrenChange = useCallback(
        (parentId: string, newChildren: TemplateConstructionItemType[]) => {
            const newItems = items.map(item => {
                if (item.id === parentId) {
                    return { ...item, child: newChildren };
                }
                return item;
            });
            onItemsChange(newItems);
        },
        [items, onItemsChange]
    );

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={containerClassName || "flex flex-wrap gap-4 p-4"}>
                {items.map((item, index) => (
                    <DraggableItem
                        key={item.id}
                        item={item}
                        index={index}
                        moveItem={moveParentItem}
                        type={ItemTypes.PARENT}
                        className={parentItemClassName || ""}
                        parentId="root"
                        renderContent={(item) => (
                            <DraggableParentItem
                                item={item}
                                parentId="root"
                                idTemplate={idTemplate}
                                index={index}
                                moveItem={moveParentItem}
                                className={parentItemClassName}
                                childClassName={childItemClassName}
                                onChildrenChange={handleChildrenChange}
                            />
                        )}
                    />
                ))}
            </div>
        </DndProvider>
    );
};

export default DragDropTemplateConstructor;