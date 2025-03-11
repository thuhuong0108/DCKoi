import { Card } from "antd";

const CardProject = ({ project, setOpenDetail }) => {
  return (
    <div className="w-[295px]" onClick={() => setOpenDetail(true)}>
      <Card
        hoverable
        className="h-full"
        cover={
          <img
            alt="example"
            src="https://product.hstatic.net/200000653273/product/ca-koi-1_4c51c03c41d14231b77d788c54e07213.jpg"
          />
        }
      >
        <Card.Meta
          title={project.name}
          description={
            <div className="flex flex-col">
              <label>Diện tích thi công: {project.area}</label>
              <label>Độ sâu: {project.depth}</label>
              <label>Địa chỉ thi công: {project.address}</label>
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default CardProject;
