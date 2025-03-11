import { ManagerSkeleton, Title } from "@/components";
import DragDropTemplateConstructor from "@/components/DragAndDrop/DragDropTemplateConstructor";
import { ContentCopy, East, OpenInNew } from "@mui/icons-material";
import { useEffect, useState } from "react";

const templateItems = [
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
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const projectId = "CP00112233";

  // Simulate fetching data
  useEffect(() => {
    const fetchTemplateData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call with timeout
        setTimeout(() => {
          setItems(templateItems);
          setIsLoading(false);
        }, 1500); // Increased timeout to better see the skeleton effect
      } catch (error) {
        console.error("Error fetching template data:", error);
        setIsLoading(false);
      }
    };

    fetchTemplateData();
  }, [projectId]);

  // Function to update a specific task
  const handleTaskUpdate = (updatedTask) => {
    // Create a deep copy of the items to avoid direct state mutation
    const updatedItems = JSON.parse(JSON.stringify(items));

    // Find and update the task
    updatedItems.forEach((category) => {
      const taskIndex = category.child.findIndex(task => task.id === updatedTask.id);
      if (taskIndex !== -1) {
        category.child[taskIndex] = updatedTask;
      }
    });

    setItems(updatedItems);
  };

  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 h-full">
      <Title name="Tiến độ công việc thi công" />

      <div className="my-2 flex justify-between items-center">
        <h2 className="text-xl font-bold">{projectId}</h2>
      </div>

      {isLoading ? (
        <ManagerSkeleton />
      ) : (
        <DragDropTemplateConstructor
          items={items}
          idTemplate="template-123"
          onItemsChange={setItems}
          containerClassName="flex flex-wrap gap-4 py-6"
          parentItemClassName="bg-white p-5 rounded-xl shadow-lg w-[320px]"
          childItemClassName="bg-gray-200 rounded-md my-2 border-l-4 border-blue-500 hover:bg-gray-300"
          menuItems={childMenuItems}
          menuClassName="mx-2 font-semibold round space-y-2"
          onTaskUpdate={handleTaskUpdate}
        />
      )}
    </div>
  );
};

export default ManagerConstruction;