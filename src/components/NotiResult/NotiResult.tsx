import React from "react";
import { Result } from "antd";

const NotiResult = ({ icon, title, status }) => {
  return (
    <div>
      <Result
        status={status}
        icon={icon}
        title={title}
        style={{ padding: 0 }}
      />
    </div>
  );
};

export default NotiResult;
