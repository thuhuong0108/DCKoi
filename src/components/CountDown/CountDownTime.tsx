import React, { useState } from "react";
import { Button, message, Statistic } from "antd";

const { Countdown } = Statistic;

const deadline = Date.now() + 1000 * 60 * 5; // 5 phút từ thời điểm hiện tại

const CountdownTime = ({ onTimeout }) => {
  const [isTimeUp, setIsTimeUp] = useState(false);

  const handleFinish = () => {
    setIsTimeUp(true);
  };

  return (
    <div>
      <Countdown
        title="Thời gian còn lại"
        value={deadline}
        format="mm:ss"
        onFinish={handleFinish}
      />
      {isTimeUp && (
        <div>
          <span>MÃ OTP đã hết hạn</span>
          <Button type="primary" onClick={onTimeout} className="mt-2">
            Gửi lại OTP
          </Button>
        </div>
      )}
    </div>
  );
};

export default CountdownTime;
