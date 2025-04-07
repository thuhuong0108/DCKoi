import { getDesignOfProject } from "@/api/project";
import { ProjectType } from "@/models";
import { designDetailActions } from "@/redux/slices/designDetail/designDetailSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { EyeOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import {
  Card,
  Col,
  Divider,
  Image,
  Modal,
  Rate,
  Row,
  Spin,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Text, Title } = Typography;

const SampleCard = ({ project }: { project: ProjectType }) => {
  const dispatch = useAppDispatch();
  const designDetailState = useAppSelector((state) => state.designDetail);
  const [openDesignDetail, setOpenDesignDetail] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Card
        hoverable
        cover={
          <div className="relative h-48 overflow-hidden">
            <img
              alt={project.name || project.customerName}
              src={
                project.thumbnail ||
                project.imageUrl ||
                "/images/default-project.jpg"
              }
              className="w-full h-full object-cover"
            />
            {project.standOut && (
              <div className="absolute top-2 right-2">
                <Tooltip title="Nổi bật">
                  <StarFilled className="text-yellow-400 text-2xl" />
                </Tooltip>
              </div>
            )}
          </div>
        }
        onClick={async () => {
          setLoading(true);
          // get design project
          const response = await getDesignOfProject(project.id);
          if (response.isSuccess) {
            // find design public
            const design = response.data.find(
              (design) => design.isPublic === true
            );
            if (design) {
              dispatch(designDetailActions.fetchDesignDetail(design.id));
            }
          }
          setOpenDesignDetail(true);
          setLoading(false);
        }}
      >
        <div className="flex justify-between items-start">
          <Title level={5} className="mb-1 truncate">
            {project.name || `Dự án ${project.customerName}`}
          </Title>
        </div>

        <Text type="secondary" className="block mb-2">
          {project.packageName}
        </Text>

        <div className="flex justify-between items-center mb-2">
          <Text>
            Diện tích: <strong>{project.area}m²</strong>
          </Text>
          <Text>
            Chiều sâu: <strong>{project.depth}m</strong>
          </Text>
        </div>

        <Divider className="my-3" />

        {/* <div className="flex justify-between items-center">
        <div className="flex items-center">
          <EyeOutlined className="mr-1" />
          <Text type="secondary">1.2k</Text>
        </div>
        <Rate
          disabled
          defaultValue={4.5}
          character={({ index }) =>
            index! < 4.5 ? <StarFilled /> : <StarOutlined />
          }
          allowHalf
        />
      </div> */}
      </Card>
      <Modal
        open={openDesignDetail}
        onCancel={() => setOpenDesignDetail(false)}
        footer={null}
      >
        <div className="flex flex-col items-center">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Spin size="large" />
            </div>
          ) : (
            <>
              {designDetailState.designDetail && (
                <Row gutter={16} className="mb-4">
                  {designDetailState.designDetail.designImages.map((design) => (
                    <Col key={design.id} xs={24} sm={12} md={12} lg={12}>
                      <div className="mb-4 transition-all duration-300 hover:shadow-xl">
                        <Image
                          width="100%"
                          height={200}
                          src={design.imageUrl}
                          alt={`Design ${design.id}`}
                          className="rounded-lg shadow-md object-cover cursor-pointer"
                        />
                      </div>
                    </Col>
                  ))}
                </Row>
              )}
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default SampleCard;
