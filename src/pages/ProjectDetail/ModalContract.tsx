import Card from "@/components/ui/Card";
import {
  contractActions,
  selectedContract,
} from "@/redux/slices/contract/contractSlices";
import {
  projectDetailActions,
  selectedProjectDetail,
} from "@/redux/slices/projectDetail/projectDetailSlices";
import {
  quotationDetailActions,
  selectedQuotationDetail,
} from "@/redux/slices/quotationDetail/quotationDetailSlices";
import {
  selectTemplateConstructionDetail,
  templateConstructionDetailActions,
} from "@/redux/slices/templateConstructionDetail/templateConstructionDetailSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { parseDate, parseStatusContract } from "@/utils/helpers";
import { Col, Descriptions, Row } from "antd";
import { useEffect } from "react";
import TablePayment from "./TablePayment";
import TableStage from "./TableStage";

const ModalContract = ({ id }) => {
  const dispatch = useAppDispatch();
  const contract = useAppSelector(selectedContract);
  const project = useAppSelector(selectedProjectDetail);
  const quotation = useAppSelector(selectedQuotationDetail);
  const template = useAppSelector(selectTemplateConstructionDetail);

  useEffect(() => {
    dispatch(contractActions.fetchContract(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (contract?.projectId) {
      dispatch(projectDetailActions.fetchProjectDetail(contract.projectId));
    }
  }, [dispatch, contract?.projectId]);

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
                  children: project.customerName,
                },
                {
                  key: "2",
                  label: "Số điện thoại",
                  children: project.phone,
                },
                {
                  key: "3",
                  label: "Địa chỉ mail",
                  children: project.email,
                },
                {
                  key: "4",
                  label: "Địa chỉ thi công",
                  children: project.address,
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
                  children: contract.contractValue,
                },
                {
                  key: "2",
                  label: "Ngày gửi",
                  children: parseDate(contract.createdAt),
                },
                {
                  key: "3",
                  label: "Trạng thái",
                  children: parseStatusContract(contract.status),
                },
              ]}
            />
            {/* <div className="w-1/3">
              <Button
                block
                title="Xem chi tiết"
                leadingIcon={<EyeOutlined />}
                onClick={() => setOpenDetailPackage(true)}
              />
            </div> */}
          </Card>
        </Col>
      </Row>
      <iframe
        src={contract.url}
        width="100%"
        height="500px"
        title="PDF Viewer"
      />

      <h1 className="text-base font-semibold text-black my-4">
        Kế hoạch thi công
      </h1>
      <TableStage template={template.templateContructionItems} />
      <h1 className="text-base font-semibold text-black my-4">
        Các đợt thanh toán
      </h1>
      <TablePayment payments={contract.paymentBatches} />
    </div>
  );
};

export default ModalContract;
