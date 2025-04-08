import React from "react";
import { Result } from "antd";

const AuthorizePage = () => (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    className="min-h-screen "
    // extra={<Button type="primary">Back Home</Button>}
  />
);
export default AuthorizePage;
