import { messageError, TableComponent, Title } from "@/components";
import Button from "@/components/ui/Button";
import {
  ContractProjectType,
  QuotationProjectType,
} from "@/models/ProjectType";
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

import { Position } from "@/models/enums/Position";
import { ContractStatus, QuotationStatus } from "@/models/enums/Status";
import {
  contractActions,
  selectedContract,
} from "@/redux/slices/contract/contractSlices";
import {
  contractProjectActions,
  selectedContractProject,
} from "@/redux/slices/contractProject/contractProjectSlices";
import {
  quotationDetailActions,
  selectedQuotationDetail,
} from "@/redux/slices/quotationDetail/quotationDetailSlices";
import { templateConstructionDetailActions } from "@/redux/slices/templateConstructionDetail/templateConstructionDetailSlices";
import {
  formatPrice,
  parseDate,
  parsePosition,
  parseStatusContract,
  parseStatusQuotation,
} from "@/utils/helpers";
import { EyeOutlined } from "@ant-design/icons";
import { Card, Col, Descriptions, Input, Modal, Row } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContractDetail from "./ContractDetail";
import DetailConsultingSkeleton from "./DetailConsultingSkeleton";
import DetailPackageRequest from "./DetailPackageRequest";
import DetailQuotationConsulting from "./DetailQuotationConsulting";
import StepStatus from "./StepStatus";

const DetailConsulting = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const isLoading = useAppSelector((state) => state.projectDetail.loading);

  const item = useAppSelector(selectedProjectDetail);

  const quotations = useAppSelector(selectedQuotationProject);
  const contracts = useAppSelector(selectedContractProject);
  const quotation = useAppSelector(selectedQuotationDetail);
  const contractDetail = useAppSelector(selectedContract);

  useEffect(() => {
    dispatch(projectDetailActions.fetchProjectDetail(id));
  }, []);

  useEffect(() => {
    dispatch(
      contractProjectActions.fetchContractProject({
        filter: { pageNumber: 1, pageSize: 10 },
        id: id,
      })
    );
  }, [id]);

  useEffect(() => {
    dispatch(
      quotationProjectActions.fetchQuotationProject({
        Filter: { pageNumber: 1, pageSize: 10 },
        id: id,
      })
    );
  }, [id]);

  const [openDetailPackage, setOpenDetailPackage] = useState(false);
  const [openDetailQuotation, setOpenDetailQuotation] = useState(false);
  const [openDetailContract, setOpenDetailContract] = useState(false);

  const packageDetail = item.package;

  const handleDetailQuotation = (quotation: QuotationProjectType) => {
    if (quotation.status === QuotationStatus.OPEN) {
      messageError("Bạn chưa có quyền xem báo giá này.");
    } else {
      dispatch(quotationDetailActions.fetchQuotationDetail(quotation.id));
      // get template of quotation
      dispatch(
        templateConstructionDetailActions.getTemplateConstructionDetail(
          quotation.templateConstructionId
        )
      );

      setOpenDetailQuotation(true);
    }
  };

  const handleDetailContract = (contract: ContractProjectType) => {
    setOpenDetailContract(true);
    dispatch(contractActions.fetchContract(contract.id));
  };
  const parseStatus = (status: QuotationStatus, prop: string) => {
    if (prop === "status") {
      return parseStatusQuotation(status);
    }
    return;
  };

  const parseValues = (
    value: ContractStatus | string | number,
    prop: string
  ) => {
    if (prop === "contractValue") {
      return formatPrice(value as number);
    }
    if (prop === "createdAt") {
      return parseDate(value as string);
    }
    if (prop === "status") {
      return parseStatusContract(value as ContractStatus);
    }
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
        {item.staff &&
          item.staff.length > 0 &&
          item.staff
            .filter((staff) => staff.position === Position.CONSULTANT)
            .map((staff, index) => (
              <Col span={12} className="flex-1">
                <Card hoverable className="h-full">
                  <Descriptions
                    title="Thông tin nhân viên tư vấn"
                    layout="vertical"
                    items={[
                      {
                        key: "1",
                        label: "Tư vấn viên",
                        children: staff.fullName,
                      },
                      {
                        key: "2",
                        label: "Mã số nhân viên",
                        children: staff.id,
                      },
                      {
                        key: "3",
                        label: "Địa chỉ mail",
                        children: staff.email,
                      },
                      {
                        key: "4",
                        label: "Vị trí",
                        children: parsePosition(staff.position),
                      },
                    ]}
                  />
                </Card>
              </Col>
            ))}
      </Row>

      <Row>
        <h1 className="text-base font-semibold text-black my-4">
          Chú thích yêu cầu
        </h1>

        <Input.TextArea
          value={item.note}
          disabled
          rows={4}
          className="bg-gray-100 border border-gray-300 rounded-md text-base p-2"
        />
      </Row>
      {contracts.data ? (
        <TableComponent<ContractProjectType>
          columns={[
            "Tên hợp đồng",
            "khách hàng",
            "Giá trị hợp đồng",
            "Ngày tạo",
            "Trạng thái",
          ]}
          data={contracts.data}
          props={[
            "name",
            "customerName",
            "contractValue",
            "createdAt",
            "status",
          ]}
          formatValue={parseValues}
          actions={true}
          actionTexts={["Chi tết"]}
          actionFunctions={[handleDetailContract]}
          enablePagination={true}
          page={contracts.pageNumber}
          setPage={(page) => {
            dispatch(
              contractProjectActions.fetchContractProject({
                filter: {
                  pageNumber: page,
                  pageSize: 10,
                },
                id: id,
              })
            );
          }}
          itemsPerPage={contracts.pageSize}
          totalPages={contracts.totalPages}
        />
      ) : (
        <></>
      )}
      <Row>
        <h1 className="text-base font-semibold text-black my-4">
          Báo giá thiết kế thi công
        </h1>
      </Row>
      <TableComponent<QuotationProjectType>
        columns={["Phiên bản", "Ngày gửi", "Trạng thái", "Chú thích"]}
        data={quotations.data}
        props={["version", "createdDate", "status", "reason"]}
        actions={true}
        actionTexts={["Chi tiết"]}
        actionFunctions={[handleDetailQuotation]}
        loading={isLoading}
        enablePagination={true}
        page={quotations.pageNumber}
        setPage={(page) => {
          dispatch(
            quotationProjectActions.fetchQuotationProject({
              id: id,
              Filter: { pageNumber: page, pageSize: 10 },
            })
          );
        }}
        formatValue={parseStatus}
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
        title={`Thông tin báo giá `}
        centered
        open={openDetailQuotation}
        width={1000}
        onCancel={() => setOpenDetailQuotation(false)}
        onClose={() => setOpenDetailQuotation(false)}
        onOk={() => setOpenDetailQuotation(false)}
        footer={[]}
      >
        <DetailQuotationConsulting
          quotation={quotation}
          project={item}
          setOpenDetailQuotation={setOpenDetailQuotation}
          isDetail={false}
        />
      </Modal>

      <Modal
        title={`Thông tin chi tiêt hợp đồng`}
        open={openDetailContract}
        width={1500}
        onCancel={() => setOpenDetailContract(false)}
        onClose={() => setOpenDetailContract(false)}
        onOk={() => setOpenDetailContract(false)}
        footer={false}
      >
        <ContractDetail
          contractDetail={contractDetail}
          project={item}
          setOpenDetailContract={setOpenDetailContract}
        />
      </Modal>
    </div>
  );
};

export default DetailConsulting;
