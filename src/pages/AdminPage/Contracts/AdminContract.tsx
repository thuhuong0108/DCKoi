import { Button, Title } from "@/components";
import React, { useEffect, useState } from "react";
import UploadContract from "./UploadContract";
import { Modal, Row } from "antd";
import PlanConstruction from "./PlanConstruction";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import {
  projectDetailActions,
  selectedProjectDetail,
} from "@/redux/slices/projectDetail/projectDetailSlices";
import {
  quotationDetailActions,
  selectedQuotationDetail,
} from "@/redux/slices/quotationDetail/quotationDetailSlices";
import InformationContract from "./InformationContract";

const AdminContract = () => {
  const [openPlan, setOpenPlan] = useState(false);
  const { id, quotationId } = useParams();
  const dispatch = useAppDispatch();
  const project = useAppSelector(selectedProjectDetail);
  const quotation = useAppSelector(selectedQuotationDetail);

  useEffect(() => {
    dispatch(quotationDetailActions.fetchQuotationDetail(quotationId));
  }, [quotationId]);

  useEffect(() => {
    dispatch(projectDetailActions.fetchProjectDetail(id));
  }, [id]);

  const handleSend = () => {};

  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
      <Title name="Hợp đồng" />

      <h1 className="text-xl font-semibold text-blue-800 my-4">Kế hoạch</h1>
      <div>
        <Button title="Tạo kế hoạch" onClick={() => setOpenPlan(true)} />
      </div>

      <h1 className="text-xl font-semibold text-blue-800 my-4">Hợp đồng</h1>

      <InformationContract quotation={quotation} project={project} />

      <div className="w-1/2 my-4">
        <UploadContract />
      </div>

      <div className="flex justify-end">
        <Button title="Gửi hợp đồng" onClick={handleSend} />
      </div>

      <Modal
        title="Tạo kế hoạch thi công cho dự án "
        centered
        open={openPlan}
        onOk={() => setOpenPlan(false)}
        onCancel={() => setOpenPlan(false)}
        width={1000}
        footer={null}
      >
        <PlanConstruction
          id={quotation.templateConstructionId}
          setOpen={setOpenPlan}
        />
      </Modal>
    </div>
  );
};

export default AdminContract;
