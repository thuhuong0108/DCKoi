import { Button, Result } from "antd";
import React from "react";

const PageNotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, trang bạn truy cập không tồn tại."
      //   extra={<Button type="primary">Back Home</Button>}
    />
  );
};

export default PageNotFound;
