import React from "react";
import { Statistic } from "antd";

const { Countdown } = Statistic;

const deadline = Date.now() + 1000 * 60 * 5;

const CountdownTime = () => (
  <Countdown
    title="Thời gian còn lại"
    value={deadline}
    format="mm:ss"
    className="text-sm"
  />
);

export default CountdownTime;
