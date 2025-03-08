import { Title } from "@/components"
import DragDropTemplateConstructor from "@/components/DragAndDrop/DragDropTemplateConstructor";
import { TemplateConstructionItemType } from "@/models";
import { ContentCopy, East, OpenInNew } from "@mui/icons-material";
import { useState } from "react";

const templateItems: TemplateConstructionItemType[] = [
  {
    id: '1',
    name: 'Category 1',
    description: "cate 1",
    isActive: true,
    child: [
      {
        id: '1-1',
        name: 'Task 1',
        description: 'Description 1',
        isActive: true,
        child: []
      },
      {
        id: '1-2',
        name: 'Task 2',
        description: 'Description 2',
        isActive: true,
        child: []
      }
    ]
  },
  {
    id: '2',
    name: 'Category 2',
    description: "cate 2",
    isActive: true,
    child: [
      {
        id: '2-1',
        name: 'Task 3',
        description: 'Description 3',
        isActive: true,
        child: []
      }
    ]
  },
  {
    id: '3',
    name: 'Category 3',
    description: "cate 3",
    isActive: true,
    child: [
      {
        id: '2-2',
        name: 'Task 4',
        description: 'Description 3',
        isActive: true,
        child: []
      }
    ]
  },
];

const childMenuItems = [
  {
    label: "Mở thẻ",
    icon: <OpenInNew />,
    action: () => console.log("Open item")
  },
  {
    label: "Sao chép thẻ",
    icon: <ContentCopy />,
    action: () => console.log("Copy item")
  },
  {
    label: "Di chuyển",
    icon: <East />,
    action: () => console.log("Move clicked")
  },
];

const ManagerConstruction = () => {
  const [items, setItems] = useState(templateItems);

  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 h-full">
      <Title name="Tiến độ công việc thi công" />

      <div className="my-2">
        <h2 className="text-xl font-bold">CP00112233</h2>
      </div>

      <DragDropTemplateConstructor
        items={items}
        idTemplate="template-123"
        onItemsChange={setItems}
        containerClassName="flex flex-wrap gap-4 py-6"
        parentItemClassName="bg-white p-5 rounded-xl shadow-lg w-[320px]"
        childItemClassName="bg-gray-200 rounded-md my-2 border-l-4 border-blue-500 hover:bg-gray-300"
        menuItems={childMenuItems}
        menuClassName="mx-2 font-semibold round space-y-2"
      />
    </div>
  )
}

export default ManagerConstruction
