import { Button } from "@/components";
import Card from "@/components/ui/Card";
import {
  quotationDetailActions,
  selectedQuotationDetail,
} from "@/redux/slices/quotationDetail/quotationDetailSlices";
import {
  selectTemplateConstructionDetail,
  templateConstructionDetailActions,
} from "@/redux/slices/templateConstructionDetail/templateConstructionDetailSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { dateDDMMYYY, formatPrice, parseStatusContract } from "@/utils/helpers";
import { EyeOutlined } from "@ant-design/icons";
import { Col, Descriptions, Modal, Row } from "antd";
import { useEffect, useState } from "react";
import TablePayment from "./TablePayment";
import TableStage from "./TableStage";
import DetailQuotationConsulting from "./DetailQuotationConsulting";

const ModalContract = ({ contract, project }) => {
  const dispatch = useAppDispatch();
  const [openDetailQuotation, setOpenDetailQuotation] = useState(false);
  const quotation = useAppSelector(selectedQuotationDetail);
  const template = useAppSelector(selectTemplateConstructionDetail);

  useEffect(() => {
    if (contract?.quotationId) {
      dispatch(
        quotationDetailActions.fetchQuotationDetail(contract.quotationId)
      );
    }
  }, [dispatch, contract?.quotationId]);

  useEffect(() => {
    if (quotation?.templateConstructionId) {
      dispatch(
        templateConstructionDetailActions.getTemplateConstructionDetail(
          quotation.templateConstructionId
        )
      );
    }
  }, [dispatch, quotation?.templateConstructionId]);

  return (
    <div>
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
                  children: project.detail.customerName,
                },
                {
                  key: "2",
                  label: "Số điện thoại",
                  children: project.detail.phone,
                },
                {
                  key: "3",
                  label: "Địa chỉ mail",
                  children: project.detail.email,
                },
                {
                  key: "4",
                  label: "Địa chỉ thi công",
                  children: project.detail.address,
                },
              ]}
            />
          </Card>
        </Col>
        <Col span={12} className="flex-1">
          <Card hoverable className="h-full">
            <Descriptions
              title="Thông tin hợp đồng"
              layout="vertical"
              items={[
                {
                  key: "1",
                  label: "Tổng giá trị hợp đồng",
                  children: formatPrice(contract.contractValue),
                },
                {
                  key: "2",
                  label: "Ngày gửi",
                  children: dateDDMMYYY(contract.createdAt),
                },
                {
                  key: "3",
                  label: "Trạng thái",
                  children: parseStatusContract(contract.status),
                },
                {
                  key: "3",
                  label: "Chi tiết báo giá",
                  children: "",
                },
              ]}
            />
            <div className="w-1/3">
              <Button
                block
                title="Xem chi tiết"
                leadingIcon={<EyeOutlined />}
                onClick={() => setOpenDetailQuotation(true)}
              />
            </div>
          </Card>
        </Col>
      </Row>
      <iframe
        src={contract.url}
        width="100%"
        height="500px"
        title="PDF Viewer"
        className="my-4"
      />

      <h1 className="text-base font-semibold text-black my-4">
        Kế hoạch thi công
      </h1>
      <TableStage template={template.templateContructionItems} />
      <h1 className="text-base font-semibold text-black my-4">
        Các đợt thanh toán
      </h1>
      <TablePayment payments={contract.paymentBatches} />

      <Modal
        title="Báo giá Chi tiết"
        open={openDetailQuotation}
        width={1000}
        onClose={() => setOpenDetailQuotation(false)}
        onCancel={() => setOpenDetailQuotation(false)}
        onOk={() => setOpenDetailQuotation(false)}
        footer={false}
      >
        <DetailQuotationConsulting
          project={project}
          quotation={quotation}
          template={template}
        />
      </Modal>
    </div>
  );
};

export default ModalContract;
