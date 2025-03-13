import { PaymentFailed, PaymentSuccess } from "@/components";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentStatus = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentData, setPaymentData] = useState(null);
  const searchParams = new URLSearchParams(location.search);
  const success = searchParams.get("success");
  const transactionId = searchParams.get("transactionId");

  const handleBack = () => {
    navigate("/space-management/transactions");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      {success == "failed" ? (
        <PaymentFailed {...paymentData} onBack={handleBack} />
      ) : (
        <PaymentSuccess {...paymentData} onBack={handleBack} />
      )}
    </div>
  );
};

export default PaymentStatus;
