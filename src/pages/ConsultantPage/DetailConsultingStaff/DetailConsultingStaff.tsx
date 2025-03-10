import { TableComponent, Title } from "@/components";
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
} from "@/redux/slices/quotationProject/quotationProjectSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";

import { EyeOutlined } from "@ant-design/icons";
import { Card, Col, Descriptions, Input, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DetailQuotationConsulting from "./DetailQuotationConsulting";
import {
  quotationDetailActions,
  selectedQuotationDetail,
} from "@/redux/slices/quotationDetail/quotationDetailSlices";
import DetailPackageRequest from "./DetailPackageRequest";
import DetailConsultingSkeleton from "./DetailConsultingSkeleton";
import { QuotationStatus } from "@/models/enums/Status";
import { parseDate, parseStatusQuotation } from "@/utils/helpers";
import StepStatus from "./StepStatus";

const DetailConsultingStaff = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isLoading = useAppSelector((state) => state.projectDetail.loading);

  const item = useAppSelector(selectedProjectDetail);

  const quotations = useAppSelector(selectedQuotationProject);

  const quotation = useAppSelector(selectedQuotationDetail);

  useEffect(() => {
    dispatch(projectDetailActions.fetchProjectDetail(id));
  }, [id]);

  useEffect(() => {
    dispatch(
      quotationProjectActions.fetchQuotationProject({
        Filter: { pageNumber: 1, pageSize: 10 },
        id: id,
      })
    );
  }, [id]);

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

  const parseStatus = (status: QuotationStatus, prop: string) => {
    if (prop === "status") {
      return parseStatusQuotation(status);
    }
    return;
  };

  if (isLoading) {
    return <DetailConsultingSkeleton />;
  }

  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
      <Title name="Chi tiết yêu cầu tư vấn" />

      <StepStatus item={item} />

      <div className="flex flex-row justify-evenly items-center mb-4">
        <div className="flex flex-row justify-start items-center ">
          <label className="text-gray-400 font-medium w-[150px]">
            Ngày gửi yêu cầu:
          </label>
          <label className="text-black">{parseDate(item.createdAt)}</label>
        </div>
        <div className="flex flex-row justify-start items-center ">
          <label className="text-gray-400 font-medium w-[150px]">
            Cập nhật mới nhất:
          </label>
          <label className="text-black">{parseDate(item.updatedAt)}</label>
        </div>
      </div>
      <Row className="flex gap-4">
        <Col span={12} className="flex-1">
          <Card hoverable className="h-full">
            <Descriptions
              title="Thông tin khách hàng"
              layout="vertical"
              items={[
                {
                  key: "1",
                  label: "Khách hàng",
                  children: item.customerName,
                },
                {
                  key: "2",
                  label: "Số điện thoại",
                  children: item.phone,
                },
                {
                  key: "3",
                  label: "Địa chỉ mail",
                  children: item.email,
                },
                {
                  key: "4",
                  label: "Địa chỉ thi công",
                  children: item.address,
                },
              ]}
            />
          </Card>
        </Col>
        <Col span={12} className="flex-1">
          <Card hoverable className="h-full">
            <Descriptions
              title="Thông tin thi công"
              layout="vertical"
              items={[
                {
                  key: "1",
                  label: "Diện tích thi công (m2)",
                  children: item.area,
                },
                {
                  key: "2",
                  label: "Độ sâu của hồ (m)",
                  children: item.depth,
                },
                {
                  key: "3",
                  label: "Gói thi công",
                  children: item.package.name,
                },
                {
                  key: 4,
                  label: "Thông tin gói",
                  children: null,
                },
              ]}
            />
            <div className="w-1/3">
              <Button
                block
                title="Xem chi tiết"
                leadingIcon={<EyeOutlined />}
                onClick={() => setOpenDetailPackage(true)}
              />
            </div>
          </Card>
        </Col>
      </Row>

      <Row>
        <h1 className="text-base font-semibold text-black my-4">
          Chú thích yêu cầu
        </h1>
        <Input.TextArea
          value={item.note}
          rows={4}
          disabled
          className="text-base p-2"
        />
      </Row>

      <h1 className="text-base font-semibold text-black my-4">
        Báo giá chi tiết
      </h1>

      <div className="mt-2">
        <Button
          primary
          title="Viết báo giá"
          size="base"
          onClick={() => navigate(`new-quotation`)}
        />
      </div>

      <TableComponent<QuotationProjectType>
        columns={["Phiên bản", "Ngày gửi", "Trạng thái", "Chú thích"]}
        data={quotations.data}
        props={["version", "createdDate", "status", "reason"]}
        formatValue={parseStatus}
        actions={true}
        actionTexts={["Chi tiết"]}
        actionFunctions={[handleDetailQuotation]}
        loading={isLoading}
        enablePagination={true}
        page={quotations.pageNumber}
        setPage={(page) => {
          dispatch(
            quotationProjectActions.fetchQuotationProject({
              Filter: { pageNumber: page, pageSize: 10 },
              id: id,
            })
          );
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
        title={`Báo giá chi tiết `}
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

export default DetailConsultingStaff;
