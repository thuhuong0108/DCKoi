import { messageInfo, TableComponent, Title } from "@/components";
import Button from "@/components/ui/Button";
import { QuotationProjectType } from "@/models/ProjectType";
// import Card from "@/components/ui/Card";
import {
  projectDetailActions,
  selectedProjectDetail,
} from "@/redux/slices/projectDetail/projectDetailSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { parsePosition } from "@/utils/helpers";
import {
  EyeOutlined,
  MailOutlined,
  PhoneOutlined,
  PushpinOutlined,
} from "@ant-design/icons";
import { Card, Col, Input, Row } from "antd";
import Meta from "antd/es/card/Meta";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailConsulting = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const isLoading = useAppSelector((state) => state.projectDetail.loading);

  const item = useAppSelector(selectedProjectDetail);

  useEffect(() => {
    dispatch(projectDetailActions.fetchProjectDetail(id));
  }, []);

  const handleDetail = () => {
    messageInfo("Detail");
  };

  const handleAccept = () => {
    messageInfo("handleAccept");
  };

  const handleReject = () => {
    messageInfo("handleReject");
  };
  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
      <Title name="Chi tiết yêu cầu tư vấn" />

      <div className="flex flex-col mt-4">
        <div className="flex flex-row justify-start items-center ">
          <label className="text-gray-600 font-medium w-[150px]">
            Ngày gửi yêu cầu
          </label>
          <label className="text-black">{item.data.createdDate}</label>
        </div>
        <div className="flex flex-row justify-start items-center ">
          <label className="text-gray-600 font-medium w-[150px]">
            Cập nhật mới nhất
          </label>
          <label className="text-black">{item.data.updatedDate}</label>
        </div>
      </div>
      <Row className="flex flex-row justify-between mt-4">
        <Col className="w-1/2 px-4">
          <h1 className="text-xl font-semibold text-black my-4">
            Thông tin khách hàng
          </h1>
          <Card
            hoverable
            children={
              <div>
                <Row className="flex flex-row justify-start items-center my-3">
                  <img
                    className="w-[100px] h-[100px] mr-10"
                    src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
                    alt="user"
                  />
                  <Col className="flex flex-col gap-4">
                    <label className="text-black font-semibold text-4xl">
                      {item.data.customerName}
                    </label>
                    <label className="text-gray-600 font-medium text-lg">
                      <MailOutlined /> {item.data.email}
                    </label>
                    <label className="text-gray-600 font-medium text-lg">
                      <PhoneOutlined /> {item.data.phone}
                    </label>
                  </Col>
                </Row>
                <div className="flex flex-row justify-start items-center text-gray-600 mt-3">
                  <PushpinOutlined className="w-[50px] h-[50px]" />
                  <label className="font-light text-base">
                    {item.data.address}
                  </label>
                </div>
              </div>
            }
            className="w-full shadow-lg border rounded-2xl"
          />
        </Col>

        <Col className="w-1/2 px-4">
          <h1 className="text-xl font-semibold text-black my-4">
            Thông tin nhân viên tư vấn
          </h1>
          <Card
            hoverable
            children={
              <div>
                <Row className="flex flex-row justify-start items-center my-3">
                  <img
                    className="w-[100px] h-[100px] mr-10"
                    src="https://cdn-icons-png.flaticon.com/512/3143/3143160.png"
                    alt="user"
                  />
                  <Col className="flex flex-col gap-4">
                    <label className="text-black font-semibold text-4xl">
                      {item.data.staff[0].fullName}
                    </label>
                    <label className="text-gray-600 font-medium text-lg">
                      <MailOutlined /> {item.data.staff[0].email}
                    </label>
                    <label className="text-gray-600 font-medium text-lg">
                      # {parsePosition(item.data.staff[0].position)}
                    </label>
                  </Col>
                </Row>
                <div className="flex flex-row justify-start items-center text-gray-600 mt-3">
                  <label className="font-light text-base">
                    Mã số nhân viên: {item.data.staff[0].id}
                  </label>
                </div>
              </div>
            }
            className="w-full shadow-lg border rounded-2xl"
          />
        </Col>
      </Row>

      <h1 className="text-xl font-semibold text-black my-4">
        Yêu cầu thi công
      </h1>
      <Card
        hoverable
        children={
          <div>
            <Col className="flex flex-row items-start">
              <div className="flex flex-col gap-4">
                <div className="flex flex-row justify-start items-center ">
                  <label className="text-gray-600 font-medium text-lg w-[200px]">
                    Gói thi công yêu cầu
                  </label>
                  <Button
                    ghost
                    title={item.data.packageName}
                    leadingIcon={<EyeOutlined />}
                    onClick={handleDetail}
                    className="text-black font-semibold text-lg"
                  />
                </div>
                <div className="flex flex-row justify-start items-center ">
                  <label className="text-gray-600 font-medium text-lg w-[200px]">
                    Diện tích dự tính (m2)
                  </label>
                  <label className="text-black font-semibold text-lg">
                    {item.data.area}
                  </label>
                </div>
                <div className="flex flex-row justify-start items-center ">
                  <label className="text-gray-600 font-medium text-lg w-[200px]">
                    Độ sâu của hồ (m)
                  </label>
                  <label className="text-black font-semibold text-lg">
                    {item.data.depth}
                  </label>
                </div>
              </div>
            </Col>
          </div>
        }
        className="w-1/2 mx-4 shadow-lg border rounded-2xl"
      />

      <Row>
        <h1 className="text-xl font-semibold text-black my-4">
          Chú thích yêu cầu
        </h1>

        <Input.TextArea
          value={item.data.note}
          disabled
          rows={4}
          className="bg-gray-100 border border-gray-300 rounded-md text-base p-2"
        />
      </Row>

      <Row>
        <h1 className="text-xl font-semibold text-black my-4">
          Báo giá thiết kế thi công
        </h1>

        {/* <TableComponent<QuotationProjectType>
          columns={[
            "Tên bản báo giá",
            "Mẫu thi công",
            "Phiên bản",
            "Ngày gửi",
            "Trạng thái",
            "Chú thích",
          ]}
          data={item.data.}
          props={[
            "projectId",
            "templateConstructionId",
            "version",
            "createdDate",
            "status",
            "reason",
          ]}
          actions={true}
          actionTexts={["Chi tiết", "Chấp nhận", "Từ chối"]}
          actionFunctions={[handleAccept, handleReject]}
          loading={isLoading}
          enablePagination={true}
          page={item.data.packageDetail.}
          setPage={(page) => {
            dispatch(
              equipmentActions.fetchEquipment({
                pageNumber: page,
                pageSize: 10,
              })
            );
          }}
          itemsPerPage={items.pageSize}
          totalPages={items.totalPages}
        /> */}
      </Row>
    </div>
  );
};

export default DetailConsulting;
