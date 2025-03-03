import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import {
  projectActions,
  selectedProject,
} from "@/redux/slices/project/projectSlices";
import ConsultingCard from "./ConsultingCard";
import { Col, Row } from "antd";
import { Title } from "@/components";
import { Pagination } from "@mui/material";

const ConsultingPage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.project.loading);

  const items = useAppSelector(selectedProject);

  useEffect(() => {
    dispatch(projectActions.fetchProject({ pageNumber: 1, pageSize: 10 }));
  }, []);

  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
      <Title name="Danh sách tư vấn" />

      <Row className="my-5">
        {items.data.map((item) => (
          <Col>
            <ConsultingCard item={item} key={item.id} />
          </Col>
        ))}
      </Row>

      <Pagination count={items.totalPages} color="primary" />
    </div>
  );
};

export default ConsultingPage;
