import { Card, Col, Image, Row } from "antd";

const CardIssue = () => {
  return (
    <Card hoverable className="flex flex-col gap-4 my-4">
      <div className="flex flex-row justify-evenly items-center">
        <div>
          <label className="text-sm text-blue-800">Ngày bắt đầu:</label>
        </div>
        <div>
          <label className="text-sm text-blue-800">Ngày hoàn thành: </label>
        </div>
        <div>
          <label className="text-sm text-blue-800">Trạng thái: </label>
        </div>
      </div>

      <Row className="flex flex-row justify-between items-start ">
        <Col span={3} className="p-3">
          <label className="text-gray-400 font-medium">
            Hạng mục công việc
          </label>
          <span className="block  border-b border-gray-300 mt-1"></span>
          <span className="my-2">Chuẩn bị mặt bằng</span>
        </Col>
        <Col span={3} className="p-3">
          <label className="text-gray-400 font-medium">Vấn đề thi công</label>
          <span className="block  border-b border-gray-300 mt-1"></span>
          <span className="my-2">Chuẩn bị mặt bằng</span>
        </Col>
        <Col span={6} className="p-3">
          <label className="text-gray-400 font-medium">Mô tả chi tiết</label>
          <span className="block border-b border-gray-300 mt-1"></span>
          <label className="my-2">
            Remove trees, shrubs, weeds, and other natural obstacles.
          </label>
        </Col>
        <Col span={3} className="p-3">
          <label className="text-gray-400 font-medium">Lí do</label>
          <span className="block  border-b border-gray-300 mt-1"></span>
          <span className="my-2">Chuẩn bị mặt bằng</span>
        </Col>
        <Col span={3} className="p-3">
          <label className="text-gray-400 font-medium">Hướng giải quyết</label>
          <span className="block  border-b border-gray-300 mt-1"></span>
          <span className="my-2">Chuẩn bị mặt bằng</span>
        </Col>
        <Col span={3} className="p-3">
          <label className="text-gray-400 font-medium">
            Nhân viên đảm nhiệm
          </label>
          <span className="block  border-b border-gray-300 mt-1"></span>
          <span className="my-2">Chuẩn bị mặt bằng</span>
        </Col>
        <Col span={3} className="p-3">
          <label className="text-gray-400 font-medium">Hình ảnh</label>
          <span className="block border-b border-gray-300 mt-1"></span>
          <Image
            className="my-2"
            width={100}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </Col>
      </Row>
    </Card>
  );
};

export default CardIssue;
