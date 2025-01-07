import { Card, Col } from "antd";
import Meta from "antd/es/card/Meta";

const DesignTemplate = () => {
  return (
    <Col lg={{ span: 8 }}>
      <Card
        className="m-2"
        hoverable
        cover={
          <img
            alt="example"
            src="https://i.pinimg.com/736x/01/60/73/01607307164dbc04a5f2f33a93fa3377.jpg"
          />
        }
      >
        <Meta title="Feng shui koi pond design" description="description" />
      </Card>
    </Col>
  );
};

export default DesignTemplate;
