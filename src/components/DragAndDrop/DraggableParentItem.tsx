import { createItemsTemlateConstruction } from "@/api/templateConstruction";
import useForm from "@/hooks/useForm";
import { TemplateConstructionItemType } from "@/models";
import { templateConstructionDetailActions } from "@/redux/slices/templateConstructionDetail/templateConstructionDetailSlices";
import { useAppDispatch } from "@/redux/store/hook";
import { useCallback, useState } from "react";
import { messageError } from "../ui";
import { Button, Modal, TextField } from "@mui/material";
import DraggableContainer from "./DraggableContainer";
import DraggableChildItem from "./DraggableChildItem";
import { Add } from "@mui/icons-material";
import { ItemTypes } from "./type";
import { useDrop } from "react-dnd";
import DraggableItem from "./DraggableItem";

interface DraggableParentItemProps {
    item: TemplateConstructionItemType;
    parentId: string;
    idTemplate: string;
    index: number;
    moveItem: (dragIndex: number, hoverIndex: number, type: string, parentId?: string) => void;
    moveChildToParent: (childId: string, sourceParentId: string, targetParentId: string) => void;
    className?: string;
    childClassName?: string;
    onChildrenChange?: (parentId: string, children: TemplateConstructionItemType[]) => void;
    menuItems?: { label: string; icon?: React.ReactNode; action: () => void }[];
    menuClassName?: string;
    onTaskUpdate?: (task: TemplateConstructionItemType) => void;
}

const DraggableParentItem = ({
    item,
    parentId,
    idTemplate,
    index,
    moveItem,
    moveChildToParent,
    className,
    childClassName,
    onChildrenChange,
    menuItems,
    menuClassName,
    onTaskUpdate
}: DraggableParentItemProps) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Mock dispatch function if not using actual Redux
    const dispatch = (action: any) => console.log('Dispatched:', action);
    const templateConstructionDetailActions = {
        getTemplateConstructionDetail: (id: string) => ({ type: 'GET_TEMPLATE_DETAIL', payload: id })
    };

    // Handle child items change
    const handleChildItemsChange = useCallback(
        (newChildren: TemplateConstructionItemType[]) => {
            if (onChildrenChange) {
                onChildrenChange(item.id, newChildren);
            }
        },
        [item.id, onChildrenChange]
    );

    // Handle task update
    const handleTaskUpdate = useCallback(
        (updatedTask: TemplateConstructionItemType) => {
            if (onTaskUpdate) {
                onTaskUpdate(updatedTask);
            }
        },
        [onTaskUpdate]
    );

    // Reference to enable dropping children into the parent
    const [, drop] = useDrop({
        accept: ItemTypes.CHILD,
        drop: (droppedItem: { id: string, parentId: string }) => {
            // If the child is from a different parent, move it here
            if (droppedItem.parentId && droppedItem.parentId !== item.id) {
                moveChildToParent(droppedItem.id, droppedItem.parentId, item.id);
                return { parentId: item.id };
            }
        },
    });

    // Mock form hook for adding new tasks
    const useFormMock = () => {
        const [values, setValues] = useState({ name: "", description: "" });

        return {
            regHandleSubmit: () => {
                console.log("Form submitted with:", values);
                setIsModalVisible(false);
            },
            formik: {
                values,
                resetForm: () => setValues({ name: "", description: "" })
            },
            regField: (field: string) => ({
                value: values[field as keyof typeof values] || "",
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    setValues({ ...values, [field]: e.target.value }),
                error: false
            })
        };
    };

    const { regHandleSubmit, formik, regField } = useFormMock();

    const renderModal = () => {
        return (
            <Modal
                open={isModalVisible}
                onClose={() => setIsModalVisible(false)}
            >
                <div className="bg-white p-6 rounded-lg mx-auto mt-24 max-w-md">
                    <h2 className="font-bold text-2xl mb-4">Thêm công việc cho {item.name}</h2>
                    <div className="space-y-4">
                        <TextField
                            required
                            fullWidth
                            label="Tên hạng mục"
                            {...regField("name")}
                            error={Boolean(regField("name").error)}
                            helperText={regField("name").error}
                        />
                        <TextField
                            fullWidth
                            label="Mô tả"
                            {...regField("description")}
                            error={Boolean(regField("description").error)}
                            helperText={regField("description").error}
                        />
                        <div className="flex justify-end space-x-2 mt-4">
                            <Button variant="outlined" onClick={() => setIsModalVisible(false)}>
                                Hủy
                            </Button>
                            <Button variant="contained" onClick={() => regHandleSubmit()}>
                                Lưu
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    };

    const defaultClassName = "bg-gray-300 p-4 rounded-lg shadow-md w-[300px] h-full";
    const defaultChildClassName = "bg-white p-4 rounded-lg w-full h-full my-1 border hover:border-black";

    return (
        <div
            className={className || defaultClassName}
            ref={drop} // Apply drop ref to the parent container
        >
            <div className="text-lg font-bold text-center">{item.name}</div>
            <div className="border-b-4 border-sky-600 my-2"></div>

            <div className="flex flex-col justify-between">
                {item.child && item.child.length > 0 && (
                    <DraggableContainer
                        items={item.child}
                        onItemsChange={handleChildItemsChange}
                        className="flex flex-col space-y-1"
                        itemClassName={childClassName || defaultChildClassName}
                        renderItem={(childItem, childIndex) =>
                            <DraggableItem
                                key={childItem.id}
                                item={childItem}
                                index={childIndex}
                                moveItem={moveItem}
                                type={ItemTypes.CHILD}
                                parentId={item.id}
                                renderContent={(item) => (
                                    <DraggableChildItem
                                        item={item}
                                        menuItems={menuItems}
                                        menuClassName={menuClassName}
                                        onItemUpdate={handleTaskUpdate}
                                    />
                                )}
                            />
                        }
                        type={ItemTypes.CHILD}
                        parentId={item.id}
                    />
                )}

                <div className="bg-white mt-3 rounded-lg shadow-md w-full h-full">
                    <Button
                        size="large"
                        fullWidth
                        className="border-none text-lg font-semibold"
                        onClick={() => setIsModalVisible(true)}
                    >
                        <Add />
                        Thêm công việc
                    </Button>
                </div>
            </div>
            {renderModal()}
        </div>
    );
};

export default DraggableParentItem;