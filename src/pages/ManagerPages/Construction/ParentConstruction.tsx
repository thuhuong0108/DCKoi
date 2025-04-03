import { TemplateConstructionItemType } from "@/models";
import React, { useEffect, useState } from "react";
import ChildConstruction from "./ChildConstruction";
import {
  Button,
  Card,
  DatePicker,
  Dropdown,
  Form,
  Input,
  Menu,
  Modal,
  Skeleton,
} from "antd";
import useForm from "@/hooks/useForm";
import type { DatePickerProps } from "antd";
import { validateConstruction } from "@/validations/validate";
import { EllipsisOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import ModalIssue from "./ModalIssue";
import { projectStateDetailActions } from "@/redux/slices/projectStateDetail/projectStateDetailSlices";
import { useParams } from "react-router-dom";
import { set } from "date-fns";
import { parseCategory } from "@/utils/helpers";
import DetailItemConstruction from "./DetailItemConstruction";

const ParentConstruction = () => {
  const construction = useAppSelector(
    (state) => state.projectStateDetail.construction
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const issueProject = useAppSelector(
    (state) => state.projectStateDetail.issue
  );
  const dispatch = useAppDispatch();
  const [openIssue, setOpenIssue] = useState(false);
  const { id } = useParams();
  const [selectItem, setSelectItem] = useState<TemplateConstructionItemType>({
    id: "",
  });
  useEffect(() => {
    dispatch(projectStateDetailActions.fetchConstructions(id));
  }, []);

  // if (construction.loading) {
  //   return <Skeleton />;
  // }
  const [visiableChild, setVisiableChild] = useState(false);
  return (
    <div className="flex w-full flex-row">
      {construction.loading && <Skeleton />}
      {construction.constructions.map((item) => (
        <Card
          title={
            <div className="flex flex-row justify-between">
              <div>
                {item.name}{" "}
                {item.category ? (
                  <span>: {parseCategory(item.category)}</span>
                ) : null}
              </div>
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item
                      onClick={async () => {
                        await dispatch(
                          projectStateDetailActions.fetchIssueConstructionItem({
                            idProject: id,
                            idConstructionItem: item.id,
                          })
                        );
                        setSelectItem(item);
                        setOpenIssue(true);
                      }}
                      key="1"
                    >
                      Vấn đề
                    </Menu.Item>
                  </Menu>
                }
                trigger={["click"]}
              >
                <Button
                  type="primary"
                  shape="circle"
                  icon={<EllipsisOutlined />}
                />
              </Dropdown>
            </div>
          }
          className="m-2 w-[1000px]"
        >
          {item.childs.map((child) => (
            <ChildConstruction
              item={child}
              openChild={visiableChild}
              setOpenChild={setVisiableChild}
            />
          ))}
          {/* <Button
            type="primary"
            onClick={() => {
              setIsModalVisible(true);
            }}
          >
            Thêm công việc
          </Button> */}
        </Card>
      ))}

      <Modal
        title="Vấn đề thi công"
        width={1500}
        loading={issueProject.loading}
        open={openIssue}
        footer={false}
        onCancel={() => {
          setOpenIssue(false);
        }}
      >
        <ModalIssue issue={issueProject} idItem={selectItem.id} />
      </Modal>

      {visiableChild && (
        <DetailItemConstruction
          openModal={visiableChild}
          setOpenModal={setVisiableChild}
        />
      )}
    </div>
  );
};

export default ParentConstruction;
