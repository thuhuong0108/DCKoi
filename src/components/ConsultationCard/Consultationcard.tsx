import { ProjectType, StaffType } from "@/models";
import { ProjectStatus } from "@/models/enums/Status";
import { staffActions } from "@/redux/slices/staff/staffSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { parseStatusProject } from "@/utils/helpers";
import { UserOutlined } from "@ant-design/icons";
import ArticleIcon from "@mui/icons-material/Article";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Avatar, List, Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, messageError, messageSuccess } from "../ui";
import Card from "../ui/Card";
import { assignConsultant } from "@/api/project";
import { projectActions } from "@/redux/slices/project/projectSlices";

const Consultationcard = ({
  customerName,
  address,
  phone,
  email,
  area,
  depth,
  packageName,
  standOut,
  note,
  status,
  createdDate,
  updatedDate,
  id,
}: ProjectType & {}) => {
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const item = useAppSelector((state) => state.staff.staffs);

  const dispatch = useAppDispatch();

  const handleDetail = () => {
    navigate(`${id}`);
  };
  const handleAddStaff = () => {
    fetchStaff();
    setIsModalVisible(true);
  };

  // fetch staff to add to project
  const fetchStaff = () => {
    dispatch(staffActions.fetchConsutantStaff({ pageNumber: 1, pageSize: 10 }));
  };

  const [loading, setLoading] = useState(false);

  const handleAdd = async (idStaff: string) => {
    setLoading(true);
    const res = await assignConsultant(id, { staffId: idStaff });
    if (res.isSuccess) {
      messageSuccess(res.message);
      dispatch(projectActions.reloadProject());
    } else {
      messageError(res.message);
    }
    setLoading(false);
  };
  return (
    <Card
      className="shadow-innerTop p-4 w-[370px] m-2"
      padding="sm"
      bordered={true}
      inner={true}
      hoverable={true}
    >
      <Card.Header className="custom-header flex flex-row justify-between items-center">
        <div>
          <Avatar size="default" icon={<UserOutlined />} />
          <label className="text-xl font-weight-bold mx-2">
            {customerName}
          </label>
        </div>
        {status === ProjectStatus.REQUESTING ? (
          <label className="text-sm bg-yellow-100 text-yellow-500 p-1 border-none rounded-lg w-[70px] text-center">
            {parseStatusProject(status)}
          </label>
        ) : status === ProjectStatus.FINISHED ? (
          <label className="text-sm bg-red-100 text-red-500 p-1 border-none rounded-lg w-[70px] text-center">
            {parseStatusProject(status)}
          </label>
        ) : (
          <label className="text-sm bg-green-100 text-green-500 p-1 border-none rounded-lg w-[70px] text-center">
            {parseStatusProject(status)}
          </label>
        )}
      </Card.Header>
      <Card.Body className="custom-body">
        <div className="p-2 flex flex-row justify-between items-center text-gray-400 border-b-2 ">
          <label>{createdDate}</label>
        </div>
        <div className="p-2 flex flex-row justify-start items-center">
          <LocalPhoneIcon className="mr-2 " />
          <label className="text-black">{phone}</label>
        </div>

        <div className="p-2 flex flex-row justify-start items-center">
          <LocationOnIcon className="mr-2 " />
          <label className="text-black">{address}</label>
        </div>
        <div className="p-2 flex flex-row justify-start items-center">
          <ArticleIcon className="mr-2 " />
          <label className="text-black">{packageName}</label>
        </div>
      </Card.Body>
      <Card.Footer className="custom-footer flex flex-row justify-between">
        {status === ProjectStatus.REQUESTING ? (
          <Button
            danger
            onClick={handleAddStaff}
            title="Thêm nhân viên"
            className="w-[165px]"
          />
        ) : (
          <Button
            info
            onClick={handleDetail}
            title="Chi tiết"
            className="w-[165px]"
          />
        )}
      </Card.Footer>

      <Modal
        title="Chọn nhân viên tư vấn"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        // hideCancelButton
      >
        <List
          itemLayout="horizontal"
          dataSource={item.data}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  onClick={async () => {
                    handleAdd(item.id);
                    setIsModalVisible(false);
                  }}
                  title="Thêm"
                />,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={item.fullName}
                description={item.email}
              />
            </List.Item>
          )}
        />
      </Modal>
    </Card>
  );
};

export default Consultationcard;
