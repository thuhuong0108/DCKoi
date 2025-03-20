import { TaskType } from "@/models/TaskType";

import React from "react";
import { Card, Image, Typography } from "antd";
import { formatDate } from "@/utils/helpers";
import Avatar from "@/components/ui/Avatar";

const { Title, Text } = Typography;

const TaskCard = ({ task }: { task: TaskType }) => {
  return (
    <div className="p-4 w-ful">
      <Card
        style={{ width: "" }}
        title={
          <div className="flex items-center justify-between">
            <div>
              <Avatar name={task.staff.fullName} src={task.staff.avatar} />
              <Text className="ml-2">{task.staff.fullName}</Text>
            </div>

            <Text>{formatDate(new Date(task.updatedAt))}</Text>
          </div>
        }
        className="w-full mx-auto"
      >
        <div className="mt-4 flex flex-row justify-between items-start">
          <Text className="w-1/4">{task.name}</Text>
          <div className="w-1/2">
            <Typography.Text>Mô tả:</Typography.Text>
            <br />
            <Typography.Text>
              {task.constructionItem.description}
            </Typography.Text>
          </div>

          <Image src={task.imageUrl} width={100} height={100} />
        </div>
      </Card>
    </div>
  );
};

export default TaskCard;
