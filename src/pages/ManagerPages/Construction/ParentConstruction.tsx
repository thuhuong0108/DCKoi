import useForm from "@/hooks/useForm";
import { TemplateConstructionItemType } from "@/models";
import { projectStateDetailActions } from "@/redux/slices/projectStateDetail/projectStateDetailSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { parseCategory } from "@/utils/helpers";
import { validateConstructionItem } from "@/validations/validate";
import { EllipsisOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  DatePicker,
  DatePickerProps,
  Dropdown,
  Form,
  Input,
  Menu,
  Modal,
  Pagination,
  Skeleton,
  Table,
  TableColumnsType,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChildConstruction from "./ChildConstruction";
import DetailItemConstruction from "./DetailItemConstruction";
import ModalIssue from "./ModalIssue";
import { createChild } from "@/api/construction";
import { messageError, messageSuccess } from "@/components";

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

  const { formik, loading, regField, regHandleSubmit } = useForm({
    onSubmit: async (values) => {
      const data = {
        ...values,
        estimateAt: values.estimateAt
          ? values.estimateAt.format("YYYY-MM-DD")
          : "",
      };

      console.log(data);
      console.log(selectItem.id);

      const res = await createChild(selectItem.id, data);

      if (res.isSuccess) {
        messageSuccess(res.message);
        setIsModalOpen(false);
        formik.resetForm();
        dispatch(projectStateDetailActions.fetchConstructions(id));
      } else {
        messageError(res.message);
      }
    },
    validationSchema: validateConstructionItem,
    values: {
      name: "",
      description: "",
      estimateAt: "",
    },
  });

  // if (construction.loading) {
  //   return <Skeleton />;
  // }
  const [visiableChild, setVisiableChild] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

                    <Menu.Item
                      onClick={async () => {
                        setSelectItem(item);
                        setIsModalOpen(true);
                      }}
                      key="1"
                    >
                      Thêm hạng mục
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

      <Modal
        title="Thêm hạng mục thi công"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={false}
        width={1000}
      >
        <Form
          layout="vertical"
          onFinish={regHandleSubmit}
          className="flex flex-col gap-4"
        >
          <Form.Item
            label="Tên hạng mục"
            help={regField("name").error}
            validateStatus={regField("name").error ? "error" : "success"}
          >
            <Input
              {...regField("name")}
              placeholder="Nhập tên hạng mục"
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            help={regField("description").error}
            validateStatus={regField("description").error ? "error" : "success"}
          >
            <Input.TextArea
              {...regField("description")}
              placeholder="Nhập mô tả"
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            label="Thời gian dự kiến"
            help={regField("estimateAt").error}
            validateStatus={regField("estimateAt").error ? "error" : "success"}
          >
            <DatePicker
              onChange={(date: DatePickerProps) => {
                formik.setFieldValue("estimateAt", date);
              }}
              className="w-full"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
          >
            Lưu lại
          </Button>
        </Form>
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
