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
    menuItems?: { label: string; icon?: React.ReactNode; action: () => void }[];
    menuClassName?: string;
    onTaskUpdate?: (task: TemplateConstructionItemType) => void;
}

const DragDropTemplateConstructor = ({
    items,
    idTemplate,
    onItemsChange,
    containerClassName,
    parentItemClassName,
    childItemClassName,
    menuItems,
    menuClassName,
    onTaskUpdate
}: DragDropTemplateConstructorProps) => {

    /// Enhanced function to handle moving both parent and child items
    const moveItem = useCallback(
        (dragIndex: number, hoverIndex: number, type: string, parentId?: string) => {
            if (type === ItemTypes.PARENT) {
                // Handle parent item movement
                const newItems = [...items];
                const draggedItem = newItems[dragIndex];
                newItems.splice(dragIndex, 1);
                newItems.splice(hoverIndex, 0, draggedItem);
                onItemsChange(newItems);
            } else if (type === ItemTypes.CHILD) {
                // Handle child item movement
                const newItems = [...items];

                // Find source and target parent items
                const sourceParentIndex = newItems.findIndex(p => p.id === parentId);
                if (sourceParentIndex === -1) return;

                // Get the source parent
                const sourceParent = newItems[sourceParentIndex];

                // Get the dragged child
                const draggedChild = sourceParent.child[dragIndex];

                // Create new source parent with the child removed
                const newSourceChildren = [...sourceParent.child];
                newSourceChildren.splice(dragIndex, 1);

                // Update the source parent
                newItems[sourceParentIndex] = {
                    ...sourceParent,
                    child: newSourceChildren
                };

                // If target parent is the same as source
                if (parentId) {
                    // Insert the child at the hover index
                    newItems[sourceParentIndex].child.splice(hoverIndex, 0, draggedChild);
                }

                onItemsChange(newItems);
            }
        },
        [items, onItemsChange]
    );

    // Function to handle moving a child to a different parent
    const moveChildToParent = useCallback(
        (childId: string, sourceParentId: string, targetParentId: string) => {
            const newItems = [...items];

            // Find source and target parent items
            const sourceParentIndex = newItems.findIndex(p => p.id === sourceParentId);
            const targetParentIndex = newItems.findIndex(p => p.id === targetParentId);

            if (sourceParentIndex === -1 || targetParentIndex === -1) return;

            // Find the child to move
            const childIndex = newItems[sourceParentIndex].child.findIndex(c => c.id === childId);
            if (childIndex === -1) return;

            // Get the child
            const childToMove = newItems[sourceParentIndex].child[childIndex];

            // Remove from source
            newItems[sourceParentIndex] = {
                ...newItems[sourceParentIndex],
                child: newItems[sourceParentIndex].child.filter(c => c.id !== childId)
            };

            // Add to target
            newItems[targetParentIndex] = {
                ...newItems[targetParentIndex],
                child: [...newItems[targetParentIndex].child, childToMove]
            };

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

    // Function to handle task updates
    const handleTaskUpdate = useCallback(
        (updatedTask: TemplateConstructionItemType) => {
            if (onTaskUpdate) {
                onTaskUpdate(updatedTask);
            }
        },
        [onTaskUpdate]
    );

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={containerClassName || "flex flex-wrap gap-4 p-4"}>
                {items.map((item, index) => (
                    <DraggableItem
                        key={item.id}
                        item={item}
                        index={index}
                        moveItem={moveItem}
                        type={ItemTypes.PARENT}
                        parentId="root"
                        renderContent={(item) => (
                            <DraggableParentItem
                                item={item}
                                parentId="root"
                                idTemplate={idTemplate}
                                index={index}
                                moveItem={moveItem}
                                moveChildToParent={moveChildToParent}
                                className={parentItemClassName}
                                childClassName={childItemClassName}
                                onChildrenChange={handleChildrenChange}
                                menuItems={menuItems}
                                menuClassName={menuClassName}
                                onTaskUpdate={handleTaskUpdate}
                            />
                        )}
                    />
                ))}
            </div>
        </DndProvider>
    );
};

export default DragDropTemplateConstructor;