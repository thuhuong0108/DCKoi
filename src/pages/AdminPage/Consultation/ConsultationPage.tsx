import { Consultationcard, Title } from "@/components";
import { projectActions } from "@/redux/slices/project/projectSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { Pagination, Stack } from "@mui/material";
import { Col, Row } from "antd";
import { useEffect } from "react";

const ConsultationPage = () => {
  const dispatch = useAppDispatch();
  const item = useAppSelector((state) => state.project.projects);

  useEffect(() => {
    dispatch(projectActions.fetchProject({ pageNumber: 1, pageSize: 10 }));
  }, []);

  const dataConsultation = item.data;

  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 min-h-full w-screen">
      <Title name="Consultations" />

      <Row>
        {dataConsultation.map((item, index) => (
          <Col>
            <Consultationcard {...item} key={index} />
          </Col>
        ))}
      </Row>

      <Row className="flex flex-row justify-between items-stretch mt-1">
        <label>Showing data 1 to 10 of {item.totalRecords} entries</label>
        <Stack spacing={2}>
          <Pagination count={item.totalPages} color="primary" />
        </Stack>
      </Row>
    </div>
  );
};

export default ConsultationPage;
