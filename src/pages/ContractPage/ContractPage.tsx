import { CountdownTime, Title } from "@/components";
import {
  contractActions,
  selectedContract,
} from "@/redux/slices/contract/contractSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import React, { useEffect, useState } from "react";
import TablePayment from "./TablePayment";
import {
  selectTemplateConstructionDetail,
  templateConstructionDetailActions,
} from "@/redux/slices/templateConstructionDetail/templateConstructionDetailSlices";
import TableStage from "./TableStage";
import {
  quotationDetailActions,
  selectedQuotationDetail,
} from "@/redux/slices/quotationDetail/quotationDetailSlices";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Modal, Space } from "antd";
import Marquee from "react-fast-marquee";
import { EyeOutlined } from "@ant-design/icons";
import VerifyContract from "./VerifyContract";

const ContractPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const contract = useAppSelector(selectedContract);
  const quotation = useAppSelector(selectedQuotationDetail);
  const template = useAppSelector(selectTemplateConstructionDetail);

  useEffect(() => {
    dispatch(contractActions.fetchContract(id));
  }, [dispatch]);

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

  const handleAccept = () => {
    setOpen(true);
    dispatch(contractActions.acceptContract(contract.id));
  };

  const handleReject = () => {
    dispatch(contractActions.rejectContract(contract.id));
    navigate("/space-management/contracts");
  };
  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
      <Title name="Hợp đồng thi công" />

      <Alert
        banner
        action={
          <Space direction="vertical">
            <Button
              size="middle"
              type="primary"
              className="w-[100px]"
              onClick={handleAccept}
            >
              Xác nhận
            </Button>
            <Button
              size="middle"
              danger
              ghost
              className="w-[100px]"
              onClick={handleReject}
            >
              Từ chối
            </Button>
          </Space>
        }
        message={
          <Marquee pauseOnHover gradient={false}>
            Vui lòng xem xét kĩ trước khi xác nhập hợp đồng
          </Marquee>
        }
      />
      <h1 className="text-base font-semibold text-black my-4">
        Hợp đồng bản mềm ở đây
      </h1>
      <div>
        <EyeOutlined /> Xem chi tiết
      </div>
      <h1 className="text-base font-semibold text-black my-4">
        Kế hoạch thi công
      </h1>
      <TableStage template={template.templateContructionItems} />
      <h1 className="text-base font-semibold text-black my-4">
        Các đợt thanh toán
      </h1>
      <TablePayment payments={contract.paymentBatches} />

      <Modal
        title="Xác nhận hợp đồng"
        open={open}
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
        onOk={() => setOpen(false)}
        footer={false}
      >
        <VerifyContract id={contract.id} setOpen={setOpen} />
      </Modal>
    </div>
  );
};

export default ContractPage;
