import { Button, CountdownTime } from "@/components";
import { VerifyContractType } from "@/models";
import { contractActions } from "@/redux/slices/contract/contractSlices";
import { Input } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const VerifyContract = ({ id, setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otpCode, setOtpCode] = useState("");
  const handleVerify = () => {
    const data: VerifyContractType = { id, otpCode };
    dispatch(contractActions.verifyContract(data));
    setOpen(false);
    navigate("/space-management/construction");
  };
  return (
    <div className="flex flex-col justify-between h-[200px]">
      <label>Mã OTP đã được gửi qua gmail của bạn</label>
      <span>Vui lòng nhập OTP</span>
      <Input
        placeholder="Vui lòng nhập mã xác thực"
        value={otpCode}
        onChange={(e) => setOtpCode(e.target.value)}
      />
      <CountdownTime />
      <Button primary title="Xác nhận" onClick={handleVerify} />
    </div>
  );
};

export default VerifyContract;
