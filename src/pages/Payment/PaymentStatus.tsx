import { PaymentFailed, PaymentSuccess } from "@/components";
import {
  selectedTransaction,
  transactionActions,
} from "@/redux/slices/transaction/transactionSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentStatus = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const success = searchParams.get("success");
  const transactionId = searchParams.get("transactionId");
  const transaction = useAppSelector(selectedTransaction);

  useEffect(() => {
    dispatch(transactionActions.fetchTransactionDetail(transactionId));
  }, [dispatch, transactionId]);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      {success == "failed" ? (
        <PaymentFailed transaction={transaction} onBack={handleBack} />
      ) : (
        <PaymentSuccess transaction={transaction} onBack={handleBack} />
      )}
    </div>
  );
};

export default PaymentStatus;
