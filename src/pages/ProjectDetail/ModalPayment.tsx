import { createPayment } from "@/api/payment";
import { Button, messageError } from "@/components";
import { formatPrice } from "@/utils/helpers";
import { Col, Divider, Flex, Radio } from "antd";
import { PaymentRequest } from "@/models/Request/PaymentRequest";

const ModalPayment = ({ payment }) => {
  const handlePayment = async () => {
    try {
      const item: PaymentRequest = {
        batchPaymentId: payment.id,
        returnUrl: "http://localhost:5173/payment/response",
      };

      const response = await createPayment(item);
      if (response.isSuccess) {
        window.location.href = response.data;
      } else {
        messageError(response.message);
      }
    } catch (error) {
      messageError(error.message);
      console.log(error);
    }
  };
  return (
    <div className="w-full">
      <Col>
        <Divider orientation="left">Chọn phương thức thanh toán</Divider>
        <Radio.Group defaultValue={1}>
          <Radio value={1}>
            <Flex gap="small" justify="center" align="center">
              <div className="ml-4">
                <label className=" text-lg">VNPAY</label>
                <p className="text-sm text-gray-400">
                  VNPAY là dịch vụ thanh toán điện tử tại Việt Nam, hỗ trợ thanh
                  toán qua ví điện tử và mã QR nhanh chóng.
                </p>
              </div>

              <img
                className="w-[100px]"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1v7T287-ikP1m7dEUbs2n1SbbLEqkMd1ZA&s"
                alt=""
              />
            </Flex>
          </Radio>
        </Radio.Group>
      </Col>
      <Col>
        <Divider orientation="left">{payment.name}</Divider>
        <div className="flex flex-row justify-between text-base font-semibold">
          <label>Số tiền cần thanh toán:</label>
          <span className="text-red-600">
            {formatPrice(payment.totalValue)}
          </span>
        </div>
        <div className="flex flex-row justify-end items-end mt-4">
          <Button success title="Thanh toán" onClick={handlePayment} />
        </div>
      </Col>
    </div>
  );
};

export default ModalPayment;
