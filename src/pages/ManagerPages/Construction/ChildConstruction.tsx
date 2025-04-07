import { TemplateConstructionItemType } from "@/models";
import { ItemConstructionStatus } from "@/models/enums/Status";
import {
  convertStringtoDate,
  parseDate,
  parseStatusConstruction,
} from "@/utils/helpers";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { TimerOutlined } from "@mui/icons-material";
import { Button, Card, Dropdown, Menu, Tag, Tooltip, Typography } from "antd";
import React, { useState } from "react";
import DetailItemConstruction from "./DetailItemConstruction";
import { useAppDispatch } from "@/redux/store/hook";
import { constructionItemActions } from "@/redux/slices/constructionItemStage/constructionItemSlices";
import { confirmAlert, messageError } from "@/components";
import { deleteItem } from "@/api/construction";
import { projectStateDetailActions } from "@/redux/slices/projectStateDetail/projectStateDetailSlices";
import { useParams } from "react-router-dom";

const statusColors: Record<ItemConstructionStatus, string> = {
  [ItemConstructionStatus.OPENING]: "yellow",
  [ItemConstructionStatus.PROCESSING]: "blue",
  [ItemConstructionStatus.DONE]: "green",
};

const colorExprired = "bg-red-300 text-white";

const ChildConstruction = ({
  item,
  openChild,

  setOpenChild,
}: {
  item: TemplateConstructionItemType;
  openChild: boolean;
  setOpenChild: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const isExpired = new Date(item.estimateAt).getTime() < new Date().getTime();

  return (
    <Card className="mb-2 w-[400px]" title={item.name}>
      <div className="flex flex-row justify-between items-center">
        <Dropdown
          trigger={["click"]}
          overlay={
            <Menu
              items={[
                {
                  label: "Xem chi tiết",
                  key: "1",
                  icon: <EyeOutlined />,
                  onClick: async () => {
                    await dispatch(
                      constructionItemActions.fetchConstructionItem(item.id)
                    );
                    await dispatch(
                      constructionItemActions.fetchTasks({
                        id: item.id,
                        filter: { pageNumber: 1, pageSize: 5 },
                      })
                    );
                    setOpenChild(true);
                  },
                },
                {
                  label: "Sửa",
                  key: "2",
                  icon: <EditOutlined />,
                },
                {
                  label: "Xóa",
                  key: "3",
                  icon: <DeleteOutlined />,
                  onClick: () => {
                    confirmAlert({
                      message: "Bạn có chắc chắn muốn xóa hạng mục này không?",
                      yes: async () => {
                        const res = await deleteItem(item.id);
                        if (res.isSuccess) {
                          dispatch(
                            projectStateDetailActions.fetchConstructions(id)
                          );
                        }
                      },
                    });
                  },
                },
              ]}
            />
          }
        >
          <Button
            type="primary"
            shape="circle"
            icon={<EllipsisOutlined />}
            onClick={() => {}}
          />
        </Dropdown>

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
      {/* <DetailItemConstruction
        openModal={isModalVisible}
        setOpenModal={setIsModalVisible}
      /> */}
    </Card>
  );
};

export default ChildConstruction;
