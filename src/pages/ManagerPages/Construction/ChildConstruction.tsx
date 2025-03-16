import { TemplateConstructionItemType } from "@/models";
import { ItemConstructionStatus } from "@/models/enums/Status";
import {
  convertStringtoDate,
  parseDate,
  parseStatusConstruction,
} from "@/utils/helpers";
import { EyeOutlined } from "@ant-design/icons";
import { TimerOutlined } from "@mui/icons-material";
import { Button, Card, Tag, Tooltip, Typography } from "antd";
import React, { useState } from "react";
import DetailItemConstruction from "./DetailItemConstruction";
import { useAppDispatch } from "@/redux/store/hook";
import { constructionItemActions } from "@/redux/slices/constructionItemStage/constructionItemSlices";

const statusColors: Record<ItemConstructionStatus, string> = {
  [ItemConstructionStatus.OPENING]: "yellow",
  [ItemConstructionStatus.PROCESSING]: "blue",
  [ItemConstructionStatus.DONE]: "green",
};

const colorExprired = "bg-red-300 text-white";

const ChildConstruction = ({
  item,
}: {
  item: TemplateConstructionItemType;
}) => {
  const dispatch = useAppDispatch();

  const isExpired = new Date(item.estimateAt).getTime() < new Date().getTime();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <Card className="mb-2 w-[400px]" title={item.name}>
      <div className="flex flex-row justify-between items-center">
        <Tooltip title="Xem chi tiết ">
          <Button
            type="primary"
            shape="circle"
            icon={<EyeOutlined />}
            onClick={async () => {
              await dispatch(
                constructionItemActions.fetchConstructionItem(item.id)
              );
              await dispatch(
                constructionItemActions.fetchTasks({
                  id: item.id,
                  filter: { pageNumber: 1, pageSize: 5 },
                })
              );
              setIsModalVisible(true);
            }}
          />
        </Tooltip>
        <Tag
          className={`flex items-center ${
            isExpired ? colorExprired : ""
          } p-2 rounded-xl`}
        >
          <TimerOutlined />
          <Typography.Text>{item.estimateAt}</Typography.Text>
        </Tag>

        <Tag className="text-base p-2" color={statusColors[item.status]}>
          {parseStatusConstruction(item.status)}
        </Tag>
      </div>
      <DetailItemConstruction
        openModal={isModalVisible}
        setOpenModal={setIsModalVisible}
      />
    </Card>
  );
};

export default ChildConstruction;
