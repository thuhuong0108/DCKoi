import ImgBanner from "@/assets/images/banner.png";
import ImgHand from "@/assets/images/hand.png";
import ImgFish from "@/assets/images/fish.png";
import {
  EstimatedPrice,
  FeatureCard,
  NavLinkCustom,
  ServiceCard,
} from "@/components";
import { Col, Row, Select } from "antd";
import { useAppDispatch } from "@/redux/store/hook";
import Packages from "./Packages";
import PackageMaintance from "./PackageMaintance";

const features = [
  {
    color: "bg-blue-600",
    title: "Thiết kế & thi công hồ cá Koi trọn gói",
    description:
      "Dịch vụ trọn gói từ A-Z bao gồm thiết kế 3D chuyên nghiệp và thi công hồ cá Koi tiêu chuẩn Nhật Bản. Chúng tôi cam kết hồ cá đạt chuẩn về độ sâu, tỷ lệ, hệ thống lọc đa tầng và phong thủy hài hòa với không gian sống của gia đình bạn.",
  },
  {
    color: "bg-green-600",
    title: "Hệ thống lọc nước thông minh",
    description:
      "Lắp đặt hệ thống lọc hiện đại tích hợp 5 cấp lọc: lọc thô, lọc tinh, lọc vi sinh, lọc hóa học và tia UV diệt khuẩn. Đảm bảo nước luôn trong vắt, cân bằng pH ổn định và cung cấp đủ oxy cho cá Koi phát triển khỏe mạnh.",
  },
  {
    color: "bg-purple-600",
    title: "Vật liệu & cảnh quan cao cấp",
    description:
      "Sử dụng 100% vật liệu cao cấp: bê tông cốt thép chống thấm, đá tự nhiên nguyên khối, gỗ nhập khẩu chịu nước. Thiết kế cảnh quan bao gồm thác nước, cây xanh, đèn LED nghệ thuật tạo điểm nhấn sang trọng cho không gian ngoại thất.",
  },
];

const optionPackage = ["Basic package", "Standard package", "Premium package"];

const handleChangePackage = (value: string) => {
  console.log(`Selected package: ${value}`);
};

const servicePrices = [
  {
    size: "hồ cá 1m2 trở xuống",
    regularPrice: "200.000đ / 1 lần",
    irregularPrice: "200.000đ / 1 lần",
  },
  {
    size: "hồ cá 1m2-1m7",
    regularPrice: "250.000đ / 1 lần",
    irregularPrice: "300.000đ / 1 lần",
  },
  {
    size: "hồ cá 1m8-2m5",
    regularPrice: "300.000đ / 1 lần",
    irregularPrice: "350.000đ / 1 lần",
  },
];

const serviceFeatures = [
  "Lau chùi quanh hồ cá koi.",
  "Vệ sinh các máy móc trong hồ.",
  "Kiểm tra đến các hoạt động của các loại máy chạy trong hồ.",
  "Vệ sinh xung quanh hồ, cắt tỉa cây lá,…",
];

const Home = () => {
  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="relative">
        <img
          src={ImgBanner}
          alt="KoiPondBanner"
          className="w-screen h-96 object-cover brightness-50"
        />
        <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-white font-semibold text-3xl">
              Tư vấn, thiết kế, thi công hồ cá Koi
            </p>
            <p className="text-white font-light text-2xl">
              Nơi niềm đam mê cá koi chuyển thành những thiết kế tuyệt đẹp
            </p>
            <div>
              <NavLinkCustom label="Liên hệ ngay" />
            </div>
          </div>
        </div>
      </div>

      <Row className="p-5">
        <Col span={16} offset={4}>
          {/* Why choose DCKoi */}
          <div className="">
            <div className="flex gap-5 max-md:flex-col">
              <div className="flex flex-col w-[30%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col mt-9 text-2xl font-semibold tracking-tight text-center items-center text-indigo-800 max-md:mt-10">
                  <img
                    loading="lazy"
                    src={ImgHand}
                    alt="hand image"
                    className="object-cover w-2/3"
                  />
                  <div className="self-center mt-11 max-md:mt-10">
                    Tại sao nên chọn DCKoi?
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[70%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col w-full max-md:mt-10 max-md:max-w-full">
                  {/* Features */}
                  {features.map((feature, index) => (
                    <FeatureCard {...feature} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Maintain Service */}
          <PackageMaintance />
          <Packages />

          {/* Initial estimated price */}
          <div className="my-5">
            <div className="text-center">
              <h2 className="text-indigo-800 font-bold text-2xl">
                Dự tính giá sơ bộ
              </h2>
            </div>

            <EstimatedPrice />

            {/* Form estimated price */}
            <div className="mt-4"></div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
