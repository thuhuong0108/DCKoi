import { Banner } from "@/components";
import { projectActions } from "@/redux/slices/project/projectSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { Card, Col, Pagination, Row, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import SampleCard from "./SampleCard";

const { Title } = Typography;

const ExampleProject = () => {
  const projectState = useAppSelector((state) => state.project);

  const { projects, loading } = projectState;
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      projectActions.fetchSampleProject({
        pageNumber: 1,
        pageSize: 10,
      })
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Banner />

      <div className=" mx-auto px-4 py-8">
        <Title level={3} className="text-center mb-8">
          Danh Sách Mẫu Project
        </Title>

        {loading ? (
          <div className="text-center py-16">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <Row gutter={[16, 16]}>
              {projects.data.map((project) => (
                <Col key={project.id} xs={24} sm={12} md={8} lg={6}>
                  <SampleCard project={project} />
                </Col>
              ))}
            </Row>

            <div className="mt-8 text-center">
              <Pagination
                current={projects.pageNumber}
                pageSize={projects.pageSize}
                total={projects.totalRecords}
                showSizeChanger={false}
                onChange={(page, pageSize) => {
                  dispatch(
                    projectActions.fetchSampleProject({
                      pageNumber: page,
                      pageSize: pageSize,
                    })
                  );
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ExampleProject;
