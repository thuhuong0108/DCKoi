import { Button } from "@/components";
import Card from "@/components/ui/Card";
import { DesignState } from "@/models/enums/DesignState";
import { ContractStatus, ProjectStatus } from "@/models/enums/Status";
import { selectedContract } from "@/redux/slices/contract/contractSlices";
import {
  contractProjectActions,
  selectedContractProject,
} from "@/redux/slices/contractProject/contractProjectSlices";
import {
  designActions,
  selectDesign,
} from "@/redux/slices/design/designSlices";
import {
  designDetailActions,
  selectedDesignDetail,
} from "@/redux/slices/designDetail/designDetailSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { Collapse, Descriptions, Divider, Image, Progress } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ModalProject = ({ project }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [percent, setPercent] = useState<number>(0);

  const contracts = useAppSelector(selectedContractProject);
  const contractActive = useAppSelector(selectedContract);
  const designs = useAppSelector(selectDesign);
  const designActive = useAppSelector(selectedDesignDetail);

  // const construction = useAppSelector(selectedConstruction);

  useEffect(() => {
    dispatch(contractProjectActions.fetchContractProject(project.id));
  }, [project.id]);

  useEffect(() => {
    dispatch(designActions.fetchDesign(project.id));
  }, [project.id]);

  // useEffect(() => {
  //     dispatch(constructionActions.fetchConstruction(project.id))
  // }, [project.id])

  useEffect(() => {
    if (designs?.data) {
      const filteredDesign = designs.data.filter(
        (designItem) => designItem.status === DesignState.CONFIRMED
      );

      filteredDesign.forEach((designItem) => {
        dispatch(designDetailActions.fetchDesignDetail(designItem.id));
      });
    }
  }, [designs, dispatch]);

  useEffect(() => {
    if (contracts?.data) {
      const filteredDesign = contracts.data.filter(
        (contractItem) => contractItem.status === ContractStatus.ACTIVE
      );

      filteredDesign.forEach((contractItem) => {
        dispatch(designDetailActions.fetchDesignDetail(contractItem.id));
      });
    }
  }, [contracts, dispatch]);

  return (
    <div>
      <Card hoverable className="h-full">
        <Descriptions
          title="Thông tin khách hàng"
          layout="vertical"
          items={[
            {
              key: "1",
              label: "Khách hàng",
              children: project.customerName,
            },
            {
              key: "2",
              label: "Số điện thoại",
              children: project.phone,
            },
            {
              key: "3",
              label: "Địa chỉ mail",
              children: project.email,
            },
            {
              key: "4",
              label: "Địa chỉ thi công",
              children: project.address,
            },
          ]}
        />
      </Card>

      <Divider orientation="left">Hợp đồng thi công </Divider>
      <Button
        block
        title="Chi tiết hợp đồng"
        onClick={() => navigate(`${project.id}/contract`)}
      />
      {contractActive.url ? (
        <iframe
          src={contractActive.url}
          width="100%"
          height="500px"
          title="PDF Viewer"
        />
      ) : (
        <></>
      )}

      <Divider orientation="left">Bản thiết kế</Divider>
      <Button
        block
        title="Chi tiết thiết kế"
        onClick={() => navigate(`${project.id}/design`)}
      />
      <Collapse
        className="my-3"
        items={[
          {
            key: "1",
            label: "Bản thiết kế mô hình 3D",
            children: designActive.designImages ? (
              <p>Chưa có</p>
            ) : (
              designActive.designImages.map((image) => (
                <Image key={image.id} width={200} src={image.imageUrl} />
              ))
            ),
          },
          {
            key: "2",
            label: "Bản thiết kế chi tiết 2D",
            children: designActive.designImages ? (
              <p>Chưa có</p>
            ) : (
              designActive.designImages.map((image) => (
                <Image key={image.id} width={200} src={image.imageUrl} />
              ))
            ),
          },
        ]}
      />

      <Divider orientation="left">Tiến trình thi công</Divider>
      {project.status == ProjectStatus.CONSTRUCTING ? (
        <Button
          block
          title="Chi tiết tiến trình thi công"
          onClick={() => navigate(`${project.id}/construction`)}
        />
      ) : (
        <></>
      )}

      <Progress
        percent={percent}
        type="line"
        size={[950, 20]}
        className="my-3"
      />
    </div>
  );
};

export default ModalProject;
