import { Button, Loading, TableComponent, Title } from "@/components";
import { projectStateDetailActions } from "@/redux/slices/projectStateDetail/projectStateDetailSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { EyeOutlined } from "@ant-design/icons";
import { Image, Modal } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ParentConstruction from "./ParentConstruction";
import Skeleton from "./Skeleton";
import Staff from "./Staff";
import { IssueStatus } from "@/models/enums/Status";
import ModalIssue from "./ModalIssue";

const Construction = () => {
  const dispatch = useAppDispatch();
  const [openIssue, setOpenIssue] = useState(false);
  const construction = useAppSelector(
    (state) => state.projectStateDetail.construction
  );

  const project = useAppSelector((state) => state.projectStateDetail.project);
  const issue = useAppSelector((state) => state.projectStateDetail.issue);

  useEffect(() => {
    dispatch(projectStateDetailActions.fetchProjectDetail(id));
    dispatch(projectStateDetailActions.fetchConstructions(id));
    dispatch(projectStateDetailActions.fetchIssues(id));
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 h-full w-full">
      <Title name="Tiến độ công việc thi công" />

      {project.loading ? (
        <Loading />
      ) : (
        <div className="flex  w-full my-4">
          <Staff staff={project.detail.staff} />
        </div>
      )}
      <div className="w-[200px]">
        <Button
          primary
          leadingIcon={<EyeOutlined />}
          title="Vấn đề thi công"
          onClick={() => setOpenIssue(true)}
        />
      </div>

      {issue.loading ? (
        <Loading />
      ) : (
        <Modal
          title="Vấn đề thi công"
          width={1500}
          open={openIssue}
          footer={false}
          onCancel={() => setOpenIssue(false)}
        >
          <ModalIssue issue={issue} />
        </Modal>
      )}
      {construction.loading ? (
        <Skeleton />
      ) : (
        <ParentConstruction constructionItem={construction.constructions} />
      )}
    </div>
  );
};

export default Construction;
