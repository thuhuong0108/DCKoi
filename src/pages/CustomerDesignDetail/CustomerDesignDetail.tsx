import { ImageGallery, Title } from "@/components"
import { Position } from "@/models/enums/Position";
import { designDetailActions, selectedDesignDetail } from "@/redux/designDetail/designDetailSlices";
import { projectDetailActions, selectedProjectDetail } from "@/redux/slices/projectDetail/projectDetailSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook"
import { parsePosition } from "@/utils/helpers";
import { EyeOutlined, LeftOutlined, MailOutlined, PhoneOutlined, PushpinOutlined, RightOutlined } from "@ant-design/icons";
import { TextField } from "@mui/material";
import { Button, Card, Col, Input, Modal, Row } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CustomerDesignDetail = () => {
  // const dispatch = useAppDispatch();
  // const { id } = useParams();

  // const item = useAppSelector(selectedProjectDetail);

  // const designs = useAppSelector(selectedDesignDetail);

  // useEffect(() => {
  //   dispatch(projectDetailActions.fetchProjectDetail(id));
  //   if (item && item.id) {
  //     dispatch(designDetailActions.fetchDesignDetail(item.id));
  //   }
  // }, [dispatch, id, item, item.id]);

  const [reason, setReason] = useState("");
  const [openModalReason, setOpenModalReason] = useState(false);

  const item = {
    id: "123",
    customerName: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0987654321",
    address: "123 Đường ABC, Quận 1, TP. Hồ Chí Minh",
    area: 50,
    depth: 2,
    package: {
      id: "p001",
      name: "Gói thiết kế hồ cá Koi cao cấp"
    },
    staff: [
      {
        id: "s001",
        fullName: "Trần B",
        email: "tranb@example.com",
        position: Position.CONSULTANT
      },
      {
        id: "s002",
        fullName: "Lê C",
        email: "lec@example.com",
        position: Position.DESIGNER
      }
    ]
  };

  const [selectedImage, setSelectedImage] = useState(
    "https://storage.googleapis.com/digital-platform/hinh_anh_goi_y_15_mau_thiet_ke_ho_ca_Koi_dep_ai_nhin_cung_me_so_1_c8b8397ee5/hinh_anh_goi_y_15_mau_thiet_ke_ho_ca_Koi_dep_ai_nhin_cung_me_so_1_c8b8397ee5.jpg"
  );

  const images = [
    "https://storage.googleapis.com/digital-platform/hinh_anh_goi_y_15_mau_thiet_ke_ho_ca_Koi_dep_ai_nhin_cung_me_so_1_c8b8397ee5/hinh_anh_goi_y_15_mau_thiet_ke_ho_ca_Koi_dep_ai_nhin_cung_me_so_1_c8b8397ee5.jpg",
    "https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_800,h_450/https://cuahangthuysinh.vn/wp-content/uploads/2023/06/dich-vu-thi-cong-ho-ca-koi-dep.webp",
    "https://cdn-icons-png.flaticon.com/512/3143/3143160.png",
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  ];

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
                            # Mã số nhân viên: {staff.id}
                          </label>
                          <label className="text-gray-600 font-medium text-lg">
                            <MailOutlined /> {staff.email}
                          </label>
                          <label className="text-gray-600 font-medium text-lg">
                            # {parsePosition(staff.position)}
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
          <TextField
            variant="outlined"
            fullWidth
            multiline
            rows={9}
            value="text"
            disabled
          />
          <div className="flex flex-row gap-5">
            <Button onClick={() => setOpenModalReason(true)} type="primary" className="px-8 py-6 text-lg font-semibold">
              Chấp nhận
            </Button>
            <Button onClick={() => setOpenModalReason(true)} color="danger" variant="solid" className="px-8 py-6 text-lg font-semibold">
              Từ chối
            </Button>
          </div>
        </Col>
      </Row>

      <Modal
        title="Vui lòng nhập lý do"
        open={openModalReason}
        onCancel={() => setOpenModalReason(false)}
        onClose={() => setOpenModalReason(false)}
        onOk={() => setOpenModalReason(false)}
        footer={[]}
      >
        <Input.TextArea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={4}
        />
        <div className="flex flex-row gap-4 mt-2">
          <Button onClick={() => setOpenModalReason(false)} type="primary">
            Xác nhận
          </Button>
          <Button color="danger" variant="solid" onClick={() => setOpenModalReason(false)}>
            Hủy
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default CustomerDesignDetail
