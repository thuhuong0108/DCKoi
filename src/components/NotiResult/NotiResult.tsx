import React from "react";
import { Result } from "antd";

const NotiResult = ({ icon, title, status, sutitle }) => {
  return (
    <div>
      <Result
        status={status}
        icon={icon}
        title={title}
        style={{ padding: 0 }}
        subTitle={sutitle}
      />
    </div>
  );
};

export default NotiResult;
