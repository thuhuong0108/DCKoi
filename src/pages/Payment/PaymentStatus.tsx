import { PaymentFailed, PaymentSuccess } from "@/components";
import { useNavigate } from "react-router-dom";

const PaymentStatus = () => {
  const navigate = useNavigate();

  const data = {
    success: {
      amount: "2,500,000 VND",
      time: "14:30 09/03/2025",
      paymentId: "PAY123456789",
      method: "Momo",
      projectName: "Thi công hồ cá",
      service: "Đào đất",
      customerName: "Nguyễn Văn A",
      customerEmail: "nguyenvana@email.com",
      description: "123"
    },
    failed: {
      amount: "3,800,000 VND",
      time: "16:45 09/03/2025",
      paymentId: "PAY987654321",
      method: "VNPay",
      projectName: "Thi công hồ cá",
      service: "Đào đất",
      customerName: "Trần Thị B",
      customerEmail: "tranthib@email.com",
      description: "abcd"
    }
  };
  const isSuccess = true;

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      {isSuccess ? (
        <PaymentSuccess {...data.success} onBack={handleBack} />
      ) : (
        <PaymentFailed {...data.failed} onBack={handleBack} />
      )}
    </div>
  );
};

export default PaymentStatus;