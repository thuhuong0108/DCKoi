import { Button } from "@/components";
import Card from "@/components/ui/Card";
import { formatPrice, parseDate, parseStatusContract } from "@/utils/helpers";
import { EyeOutlined } from "@ant-design/icons";
import { Col, Descriptions, Modal, Row } from "antd";
import TablePayment from "./TablePayment";
import { useEffect, useState } from "react";
import { QuotationItem } from "./type";
import { FieldQuotationDetailType } from "@/models";
import { Category } from "@/models/enums/Category";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import {
  quotationDetailActions,
  selectedQuotationDetail,
} from "@/redux/slices/quotationDetail/quotationDetailSlices";
import DetailQuotationConsulting from "./DetailQuotationConsulting";
import { contractActions } from "@/redux/slices/contract/contractSlices";
import VerifyContract from "./VerifyContract";
import { ContractStatus } from "@/models/enums/Status";
import { templateConstructionDetailActions } from "@/redux/slices/templateConstructionDetail/templateConstructionDetailSlices";
import { useParams } from "react-router-dom";
import { getQuotation } from "@/api/quotation";
import { acceptContract } from "@/api/contract";
import { set } from "date-fns";

const ContractDetail = ({ contractDetail, project, setOpenDetailContract }) => {
  const dispatch = useAppDispatch();
  const [openDetailQuotation, setOpenDetailQuotation] = useState(false);
  const [openVerify, setOpenVerify] = useState(false);
  const quotation = useAppSelector(selectedQuotationDetail);

  const { id } = useParams();
  useEffect(() => {
    if (contractDetail?.quotationId) {
      dispatch(
        quotationDetailActions.fetchQuotationDetail(contractDetail.quotationId)
      );
    }
  }, [contractDetail?.quotationId]);

  const services = quotation.services;
  const equipments = quotation.equipments;

  const [itemWork, setItemWork] = useState<QuotationItem[]>([]);

  useEffect(() => {
    const categoryCollection: string[] = Object.values(Category);

    // Build itemWork from services and equipments
    const itemWork = categoryCollection.map((category) => {
      const servicesInCategory = services.filter(
        (service) => service.category === category
      );

      const equipmentsInCategory = equipments
        .filter((equipment) => equipment.category === category)
        .map((equipment) => ({
          ...equipment,
          unit: "Chiếc",
        }));

      const fieldQuotationDetailType: FieldQuotationDetailType[] = [
        ...servicesInCategory,
        ...equipmentsInCategory,
      ];

      const totalPrice = fieldQuotationDetailType.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        totalPrice,
        name: category,
        items: fieldQuotationDetailType,
      };
    });

    setItemWork(itemWork);
  }, [services, equipments]);

  const handleAccept = async () => {
    setLoading(true);
    const res = await acceptContract(contractDetail.id);
    if (res.isSuccess) {
      setOpenVerify(true);

      //  set dealine 5 minutes

      setDeadline(new Date(Date.now() + 5 * 60000));
    }
    setLoading(false);
  };
  const [deadline, setDeadline] = useState<Date | null>(null);
  const handleReject = () => {
    dispatch(contractActions.rejectContract(contractDetail.id));
    setOpenDetailContract(false);
  };
  const [loading, setLoading] = useState(false);

  return (
    <div>
      {contractDetail.status == ContractStatus.PROCESSING ? (
        <Row className="flex flex-row gap-4 justify-center my-4">
          <Button danger title="Từ chối hợp đồng" onClick={handleReject} />
          <Button
            success
            title="Đồng ý hợp đồng"
            onClick={handleAccept}
            loading={loading}
          />
        </Row>
      ) : (
        <></>
      )}

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
                  children: formatPrice(contractDetail.contractValue),
                },
                {
                  key: "2",
                  label: "Ngày gửi",
                  children: parseDate(contractDetail.createdAt),
                },
                {
                  key: "3",
                  label: "Trạng thái",
                  children: parseStatusContract(contractDetail.status),
                },
                {
                  key: "4",
                  label: "Thông tin báo giá",
                  children: "",
                },
              ]}
            />
            <div className="w-1/3">
              <Button
                block
                title="Xem chi tiết"
                leadingIcon={<EyeOutlined />}
                onClick={async () => {
                  const res = await getQuotation(contractDetail.quotationId);

                  if (res.isSuccess) {
                    await dispatch(
                      templateConstructionDetailActions.getTemplateConstructionDetail(
                        res.data.templateConstructionId
                      )
                    );
                  }

                  setOpenDetailQuotation(true);
                }}
              />
            </div>
          </Card>
        </Col>
      </Row>

      <iframe
        className="my-4"
        src={contractDetail.url}
        width="100%"
        height="500px"
        title="PDF Viewer"
      />

      <h1 className="text-base font-semibold text-black my-4">
        Các đợt thanh toán
      </h1>
      <TablePayment payments={contractDetail.paymentBatches} />

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
          setOpenDetailQuotation={setOpenDetailQuotation}
          isDetail={true}
        />
      </Modal>

      <Modal
        title="Xác nhận hợp đồng"
        open={openVerify}
        onCancel={() => setOpenVerify(false)}
        onClose={() => setOpenVerify(false)}
        onOk={() => setOpenVerify(false)}
        footer={false}
      >
        <VerifyContract
          id={contractDetail.id}
          setOpenVerify={setOpenVerify}
          deadline={deadline}
        />
      </Modal>
    </div>
  );
};

export default ContractDetail;
