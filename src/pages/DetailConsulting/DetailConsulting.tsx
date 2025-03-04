import { confirmAlert, messageInfo, TableComponent, Title } from "@/components";
import Button from "@/components/ui/Button";
import { QuotationProjectType } from "@/models/ProjectType";
// import Card from "@/components/ui/Card";
import {
  projectDetailActions,
  selectedProjectDetail,
} from "@/redux/slices/projectDetail/projectDetailSlices";
import {
  quotationProjectActions,
  selectedQuotationProject,
} from "@/redux/slices/quotationProject/QuotationProjectSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";

import {
  EyeOutlined,
  MailOutlined,
  PhoneOutlined,
  PushpinOutlined,
} from "@ant-design/icons";
import { Card, Col, Input, Modal, Row, Steps } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailPackageRequest from "./DetailPackageRequest";
import { Position } from "@/models/enums/Position";
import { parsePosition } from "@/utils/helpers";
import DetailQuotationConsulting from "./DetailQuotationConsulting";
import {
  quotationDetailActions,
  selectedQuotationDetail,
} from "@/redux/slices/quotationDetail/quotationDetailSlices";
import { quotationActions } from "@/redux/slices/quotation/quotationSlices";

const DetailConsulting = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const isLoading = useAppSelector((state) => state.projectDetail.loading);

  const item = useAppSelector(selectedProjectDetail);

  const quotations = useAppSelector(selectedQuotationProject);

  const quotation = useAppSelector(selectedQuotationDetail);

  useEffect(() => {
    dispatch(projectDetailActions.fetchProjectDetail(id));
    if (item && item.id) {
      dispatch(quotationProjectActions.fetchQuotationProject(item.id));
    }
  }, [dispatch, id, item?.id]);

  useEffect(() => {
    dispatch(projectDetailActions.fetchProjectDetail(id));
  }, []);

  const [openDetailPackage, setOpenDetailPackage] = useState(false);

  const [openDetailQuotation, setOpenDetailQuotation] = useState(false);

  const packageDetail = item.package;

  const handleDetailQuotation = (quotation: QuotationProjectType) => {
    dispatch(quotationDetailActions.fetchQuotationDetail(quotation.id));
    setOpenDetailQuotation(true);
  };

  const handleUpdating = (quotation: QuotationProjectType) => {
    confirmAlert({
      title: "Xác nhận cập nhật lại bảng báo giá",
      message: "Bạn có chắc chắn muốn cập nhật lại bảng báo giá này không ?",
      yes: () => {
        // dispatch(quotationActions.editQuotation({}));
      },
      no: () => {},
    });
  };

  console.log("quotation: ", quotation);
  const handleAccept = (quotation: QuotationProjectType) => {
    confirmAlert({
      title: "Xác nhận bảng báo giá",
      message: "Bạn có chắc chắn xác nhận bảng báo giá này ?",
      yes: () => {
        dispatch(
          quotationActions.approveQuotation({
            isApprove: true,
            reason: "",
            id: quotation.id,
          })
        );
      },
      no: () => {},
    });
  };

  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
      <Title name="Chi tiết yêu cầu tư vấn" />
      <Row className="my-8 mx-10">
        <Steps
          current={1}
          status="process"
          items={[
            {
              title: "Đã gửi yêu cầu",
            },
            {
              title: "Chờ báo giá",
            },
            {
              title: "Hoàn thành báo giá",
            },
          ]}
        />
      </Row>

      <div className="flex flex-row justify-evenly items-center mb-4">
        <div className="flex flex-row justify-start items-center ">
          <label className="text-gray-400 font-medium w-[150px]">
            Ngày gửi yêu cầu:
          </label>
          <label className="text-black">{item.createdDate}</label>
        </div>
        <div className="flex flex-row justify-start items-center ">
          <label className="text-gray-400 font-medium w-[150px]">
            Cập nhật mới nhất:
          </label>
          <label className="text-black">{item.updatedDate}</label>
        </div>
      </div>
      <Row className="flex flex-row justify-between mt-4">
        <Col className="w-1/3 px-4 flex flex-col">
          <Card
            hoverable
            children={
              <div className="h-full flex flex-col ">
                <Row className="flex flex-col ">
                  <div className="flex flex-col justify-start items-center gap-4 my-4">
                    <img
                      className="w-[100px] h-[100px]"
                      src="https://cdn-icons-png.flaticon.com/512/9131/9131646.png"
                      alt="user"
                    />
                    <label className="text-black font-semibold text-4xl">
                      {item.customerName}
                    </label>
                    <label className="text-sm bg-blue-200 text-blue-500 p-1 border-none rounded-lg w-[100px] text-center">
                      Khách hàng
                    </label>
                  </div>

                  <Col className="flex flex-col gap-4">
                    <label className="font-medium text-gray-600 text-lg">
                      <MailOutlined /> {item.email}
                    </label>
                    <label className="font-medium text-gray-600 text-lg">
                      <PhoneOutlined /> {item.phone}
                    </label>
                    <label className="font-medium text-gray-600 text-lg">
                      <PushpinOutlined />
                      {item.address}
                    </label>
                  </Col>
                </Row>
              </div>
            }
            className="w-full h-full shadow-lg border rounded-2xl bg-indigo-50 "
          />
        </Col>
        <Col className="w-1/3 px-4 flex flex-col">
          <Card
            hoverable
            children={
              <div className="h-full flex flex-col ">
                <Row className="flex flex-col ">
                  <div className="flex flex-col justify-start items-center gap-4 my-4">
                    <img
                      className="w-[100px] h-[100px]"
                      src="https://cdn-icons-png.flaticon.com/512/4536/4536762.png"
                      alt="package"
                    />
                    <label className="text-black font-semibold text-4xl">
                      {item.package.name}
                    </label>
                    <label className="text-sm bg-gray-200 text-gray-500 p-1 border-none rounded-lg w-[200px] text-center">
                      Yêu cầu thiết kê thi công
                    </label>
                  </div>

                  <Col className="flex flex-col mt-5 gap-4">
                    <label className="text-gray-600 font-medium text-lg">
                      # Chi tiết gói thi công:{" "}
                      <Button
                        block
                        title={item.package.name}
                        leadingIcon={<EyeOutlined />}
                        onClick={() => setOpenDetailPackage(true)}
                      />
                    </label>
                    <label className="text-gray-600 font-medium text-lg">
                      # Diện tích dự tính: {item.area} m2
                    </label>
                    <label className="text-gray-600 font-medium text-lg">
                      # Độ sâu của hồ: {item.depth} m
                    </label>
                  </Col>
                </Row>
              </div>
            }
            className="w-full h-full shadow-lg border rounded-2xl bg-gray-50 "
          />
        </Col>

        <Col className="w-1/3 px-4 flex flex-col">
          {item.staff &&
            item.staff.length > 0 &&
            item.staff
              .filter((staff) => staff.position === Position.CONSULTANT)
              .map((staff, index) => (
                <Card
                  key={index}
                  hoverable
                  children={
                    <div className="h-full flex flex-col ">
                      <Row className="flex flex-col ">
                        <div className="flex flex-col justify-start items-center gap-4 my-4">
                          <img
                            className="w-[100px] h-[100px]"
                            src="https://cdn-icons-png.flaticon.com/512/3143/3143160.png"
                            alt="user"
                          />
                          <label className="text-black font-semibold text-4xl">
                            {staff.fullName}
                          </label>
                          <label className="text-sm bg-red-200 text-red-500 p-1 border-none rounded-lg w-[150px] text-center">
                            Nhân viên tư vấn
                          </label>
                        </div>

                        <Col className="flex flex-col mt-5 gap-4">
                          <label className="font-medium text-gray-600 text-lg">
                            # Mã số nhân viên: {staff.id}
                          </label>
                          <label className="text-gray-600 font-medium text-lg">
                            <MailOutlined /> {staff.email}
                          </label>
                          <label className="text-gray-600 font-medium text-lg">
                            # {parsePosition(staff.position)}
                          </label>
                        </Col>
                      </Row>
                    </div>
                  }
                  className="w-full h-full shadow-lg border rounded-2xl bg-stone-100"
                />
              ))}
        </Col>
      </Row>

      <Row>
        <h1 className="text-xl font-semibold text-black my-4">
          Chú thích yêu cầu
        </h1>

        <Input.TextArea
          value={item.note}
          disabled
          rows={4}
          className="bg-gray-100 border border-gray-300 rounded-md text-lg p-2"
        />
      </Row>

      <Row>
        <h1 className="text-xl font-semibold text-black my-4">
          Báo giá thiết kế thi công
        </h1>
      </Row>
      <TableComponent<QuotationProjectType>
        columns={[
          "Tên bản báo giá",
          "Mẫu thi công",
          "Phiên bản",
          "Ngày gửi",
          "Trạng thái",
          "Chú thích",
        ]}
        data={quotations.data}
        props={[
          "projectId",
          "templateConstructionId",
          "version",
          "createdDate",
          "status",
          "reason",
        ]}
        actions={true}
        actionTexts={["Chi tiết"]}
        actionFunctions={[handleDetailQuotation]}
        loading={isLoading}
        enablePagination={true}
        page={quotations.pageNumber}
        setPage={(page) => {
          dispatch(quotationProjectActions.fetchQuotationProject());
        }}
        itemsPerPage={quotations.pageSize}
        totalPages={quotations.totalPages}
      />

      <Modal
        title={`Mô tả chi tiết ${packageDetail ? packageDetail.name : ""}`}
        centered
        open={openDetailPackage}
        width={1000}
        onCancel={() => setOpenDetailPackage(false)}
        onClose={() => setOpenDetailPackage(false)}
        onOk={() => setOpenDetailPackage(false)}
        footer={[]}
      >
        <DetailPackageRequest detail={packageDetail} />
      </Modal>

      <Modal
        title={`Báo giá chi tiết`}
        centered
        open={openDetailQuotation}
        width={1000}
        onCancel={() => setOpenDetailQuotation(false)}
        onClose={() => setOpenDetailQuotation(false)}
        onOk={() => setOpenDetailQuotation(false)}
        footer={[]}
      >
        <DetailQuotationConsulting quotation={quotation} project={item} />
      </Modal>
    </div>
  );
};

export default DetailConsulting;
