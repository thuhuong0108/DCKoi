import { ImageGallery, Title } from "@/components";
import EmptyContent from "@/components/ui/EmptyContent";
import { Position } from "@/models/enums/Position";
import { designDetailActions, selectedDesignDetail } from "@/redux/slices/designDetail/designDetailSlices";
import { projectDetailActions, selectedProjectDetail } from "@/redux/slices/projectDetail/projectDetailSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { parsePosition } from "@/utils/helpers";
import { MailOutlined, PhoneOutlined, PushpinOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, message, Modal, Row } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CustomerDesignDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const design = useAppSelector(selectedDesignDetail);

  const item = useAppSelector(selectedProjectDetail);


  const [reason, setReason] = useState("");
  const [openModalReason, setOpenModalReason] = useState(false);

  const [openConfirmAccept, setOpenConfirmAccept] = useState(false);

  const [openModalRequestEdit, setOpenModalRequestEdit] = useState(false);

  const [selectedImage, setSelectedImage] = useState("");

  const images = design.designImages.map((image) => image.imageUrl);

  useEffect(() => {
    dispatch(designDetailActions.fetchDesignDetail(id));
    if (design.projectId) {
      dispatch(projectDetailActions.fetchProjectDetail(design.projectId));
    }

    if (design.designImages.length > 0) {
      setSelectedImage(design.designImages[0].imageUrl);
    }
  }, [dispatch, id, design.projectId, design.designImages]);

  const handleRejectDesign = () => {
    setOpenModalReason(true);
  };

  const handleRequestEditDesign = () => {
    setOpenModalRequestEdit(true);
  }

  const confirmAcceptDesign = () => {
    {
      dispatch(designDetailActions.acceptDesign(design.id));
      setOpenConfirmAccept(false);
    }
  }

  const confirmRejectDesign = () => {
    if (reason.trim()) {
      dispatch(designDetailActions.rejectDesign({
        id: design.id, reason
      }));
      setOpenModalReason(false);
      setReason("");
    } else {
      message.warning("Vui lòng nhập lý do từ chối");
    }
  };

  const confirmRequestEditDesign = () => {
    if (reason.trim()) {
      dispatch(designDetailActions.requestEditDesign({
        id: design.id, reason
      }));
      setOpenModalRequestEdit(false);
      setReason("");
    } else {
      message.warning("Vui lòng nhập lý do chỉnh sửa");
    }
  };

  if (!design.id) {
    return (
      <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
        <Title name="Chi tiết thiết kế" />

        <EmptyContent imgUrl="https://cdn1.iconfinder.com/data/icons/files-line-1/32/file_20-512.png"
          title="Chi tiết bản thiết kế đang trống hoặc đang bị lỗi" />
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
      <Title name="Chi tiết thiết kế" />

      {/* User Information */}
      <Row className="flex flex-row justify-between mt-4">
        <Col className="w-1/3 px-4 flex flex-col">
          <Card
            hoverable
            children={
              <div className="h-full flex flex-col ">
                <Row className="flex flex-col ">
                  <div className="flex flex-col justify-start items-center gap-4 my-4">
                    <img
                      className="w-[100px] h-[100px]"
                      src="https://cdn-icons-png.flaticon.com/512/9131/9131646.png"
                      alt="user"
                    />
                    <label className="text-black font-semibold text-4xl">
                      {item.customerName}
                    </label>
                    <label className="text-sm bg-blue-200 text-blue-500 p-1 border-none rounded-lg w-[100px] text-center">
                      Khách hàng
                    </label>
                  </div>

                  <Col className="flex flex-col gap-4">
                    <label className="font-medium text-gray-600 text-lg">
                      <MailOutlined /> {item.email}
                    </label>
                    <label className="font-medium text-gray-600 text-lg">
                      <PhoneOutlined /> {item.phone}
                    </label>
                    <label className="font-medium text-gray-600 text-lg">
                      <PushpinOutlined />
                      {item.address}
                    </label>
                  </Col>
                </Row>
              </div>
            }
            className="w-full h-full shadow-lg border rounded-2xl bg-indigo-50 "
          />
        </Col>
        <Col className="w-1/3 px-4 flex flex-col">
          <Card
            hoverable
            children={
              <div className="h-full flex flex-col ">
                <Row className="flex flex-col ">
                  <div className="flex flex-col justify-start items-center gap-4 my-4">
                    <img
                      className="w-[100px] h-[100px]"
                      src="https://cdn-icons-png.flaticon.com/512/4536/4536762.png"
                      alt="package"
                    />
                    <label className="text-black font-semibold text-4xl">
                      {item.package.name}
                    </label>
                  </div>

                  <Col className="flex flex-col mt-5 gap-4">
                    <label className="text-gray-600 font-medium text-lg">
                      # Diện tích dự tính: {item.area} m2
                    </label>
                    <label className="text-gray-600 font-medium text-lg">
                      # Độ sâu của hồ: {item.depth} m
                    </label>
                  </Col>
                </Row>
              </div>
            }
            className="w-full h-full shadow-lg border rounded-2xl bg-gray-50 "
          />
        </Col>

        <Col className="w-1/3 px-4 flex flex-col">
          {item.staff &&
            item.staff.length > 0 &&
            item.staff
              .filter((staff) => staff.position === Position.DESIGNER)
              .map((staff, index) => (
                <Card
                  key={index}
                  hoverable
                  children={
                    <div className="h-full flex flex-col ">
                      <Row className="flex flex-col ">
                        <div className="flex flex-col justify-start items-center gap-4 my-4">
                          <img
                            className="w-[100px] h-[100px]"
                            src="https://cdn-icons-png.flaticon.com/512/3143/3143160.png"
                            alt="user"
                          />
                          <label className="text-black font-semibold text-4xl">
                            {staff.fullName}
                          </label>
                          <label className="text-sm bg-red-200 text-red-500 p-1 border-none rounded-lg w-[150px] text-center">
                            {parsePosition(staff.position)}
                          </label>
                        </div>

                        <Col className="flex flex-col mt-5 gap-4">
                          <label className="font-medium text-gray-600 text-lg">
                            Mã số nhân viên: {staff.id}
                          </label>
                          <label className="text-gray-600 font-medium text-lg">
                            <MailOutlined /> {staff.email}
                          </label>
                        </Col>
                      </Row>
                    </div>
                  }
                  className="w-full h-full shadow-lg border rounded-2xl bg-stone-100"
                />
              ))}
        </Col>
      </Row>

      {/* Design Image */}
      <Row className="flex flex-row justify-between my-5">
        <Col className="w-3/5">
          <ImageGallery images={images} selectedImage={selectedImage} onSelect={setSelectedImage} />
        </Col>
        <Col className="w-2/5 flex flex-col items-center space-y-4">
          <div className="">
            <p className="text-lg font-semibold">
              Loại bản thiết kế: {design.type}
            </p>
          </div>
          <div className="flex flex-row gap-5">
            <Button
              onClick={() => setOpenConfirmAccept(true)}
              type="primary"
              className="px-8 py-6 text-lg font-semibold">
              Chấp nhận
            </Button>
            <Button
              onClick={() => handleRejectDesign()}
              color="danger"
              variant="solid"
              className="px-8 py-6 text-lg font-semibold">
              Từ chối
            </Button>
          </div>

          <div className="mt-2">
            <Button
              onClick={() => handleRequestEditDesign()}
              block
              color="gold"
              variant="solid"
              className="px-8 py-6 text-lg font-semibold">
              Yêu cầu chỉnh sửa
            </Button>
          </div>
        </Col>
      </Row>

      {/* Accept */}
      <Modal
        title="Xác nhận chấp nhận bản thiết kế?"
        open={openConfirmAccept}
        onCancel={() => setOpenConfirmAccept(false)}
        onOk={() => confirmAcceptDesign()}
      >
        <p className="font-semibold text-lg">Bạn có chắc chắn muốn chấp nhận bản thiết kế này không?</p>
      </Modal>

      {/* Reject */}
      <Modal
        title="Vui lòng nhập lý do từ chối"
        open={openModalReason}
        onCancel={() => setOpenModalReason(false)}
        footer={[]}
      >
        <Input.TextArea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={4}
        />
        <div className="flex flex-row gap-4 mt-2">
          <Button
            onClick={() => confirmRejectDesign()}
            type="primary">
            Xác nhận
          </Button>
          <Button color="danger"
            variant="solid"
            onClick={() => setOpenModalReason(false)}>
            Hủy
          </Button>
        </div>
      </Modal>

      {/* Request edit */}
      <Modal
        title="Vui lòng nhập lý do chỉnh sửa"
        open={openModalRequestEdit}
        onCancel={() => setOpenModalRequestEdit(false)}
        footer={[]}
      >
        <Input.TextArea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={4}
        />
        <div className="flex flex-row gap-4 mt-2">
          <Button
            onClick={() => confirmRequestEditDesign()}
            type="primary">
            Xác nhận
          </Button>
          <Button color="danger"
            variant="solid"
            onClick={() => setOpenModalRequestEdit(false)}>
            Hủy
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default CustomerDesignDetail
