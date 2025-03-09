import { Loading, Title, Uploader } from "@/components";
import { DesignDetailType, DesignRequest } from "@/models";
import { designActions } from "@/redux/slices/design/designSlices";
import { imageDesignActions } from "@/redux/slices/imageDesign/imageDesignSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import type { CollapseProps } from "antd";
import { Collapse, Modal } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DesignElement from "./DesignElement";
import Images from "./Images";
const Design = () => {
  const { id } = useParams<{ id: string }>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [type, setType] = useState("3D");
  const handleUploadSuccess = (urls: string[]) => {
    const data: DesignRequest = {
      projectId: id,
      type: type,
      designImages: urls.map((url) => ({ imageUrl: url })),
    };
    dispatch(designActions.postDesign(data));
    setIsModalVisible(false);
  };
  const dispatch = useAppDispatch();

  const designs = useAppSelector((state) => state.design.design);
  const loading = useAppSelector((state) => state.design.loading);
  const design: DesignDetailType = useAppSelector(
    (state) => state.designImage.image
  );

  const render3Ddesign = () => {
    const design3D = designs.data.filter((design) => design.type === "3D");

    if (loading) {
      return <Loading size="base" />;
    }
    return design3D.map((design) => <DesignElement {...design} />);
  };

  const render2Ddesign = () => {
    const design2D = designs.data.filter((design) => design.type === "2D");

    if (loading) {
      return <Loading size="base" />;
    }

    return design2D.map((design) => <DesignElement {...design} />);
  };

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Bản vẽ 3D",
      children: <div>{render3Ddesign()}</div>,
    },
    {
      key: "2",
      label: "Bản vẽ kĩ thuật",
      children: (
        <>
          <div>{render2Ddesign()}</div>
        </>
      ),
    },
  ];

  useEffect(() => {
    dispatch(designActions.fetchDesign(id));
    dispatch(imageDesignActions.resetImageDesign());
  }, []);

  const renderModal = () => {
    return (
      <Modal
        title={`Tải lên ${type}`}
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        <Uploader
          maxFiles={200}
          buttonText="Tải lên"
          onUploadSuccess={handleUploadSuccess}
        />
      </Modal>
    );
  };

  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
      <Title name="Thiết kế" />

      <div className="flex flex-row justify-between w-full ">
        <div className="w-1/2 ">
          <Images design={design} />
        </div>

        <div className="w-1/2 ">
          <Collapse items={items} />
        </div>
      </div>

      {renderModal()}
    </div>
  );
};

export default Design;
