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
    color: "bg-red-600",
    title: "Expert Koi fish pond design consulting",
    description:
      "Expert Koi fish pond design consulting includes selecting the appropriate location and size of the pond, an effective water filtration system, designing the landscape in harmony with nature, and ensuring an ideal living environment for the Koi fish to optimize their growth and health. Additionally, it focuses on maintaining water quality, lighting, and the drainage system to create a relaxing and aesthetically pleasing space",
  },
  {
    color: "bg-emerald-600",
    title: "Expert Koi fish pond design consulting",
    description:
      "Expert Koi fish pond design consulting includes selecting the appropriate location and size of the pond, an effective water filtration system, designing the landscape in harmony with nature, and ensuring an ideal living environment for the Koi fish to optimize their growth and health. Additionally, it focuses on maintaining water quality, lighting, and the drainage system to create a relaxing and aesthetically pleasing space",
  },
  {
    color: "bg-yellow-600",
    title: "Expert Koi fish pond design consulting",
    description:
      "Expert Koi fish pond design consulting includes selecting the appropriate location and size of the pond, an effective water filtration system, designing the landscape in harmony with nature, and ensuring an ideal living environment for the Koi fish to optimize their growth and health. Additionally, it focuses on maintaining water quality, lighting, and the drainage system to create a relaxing and aesthetically pleasing space",
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
              Consulting, design, and construction of Koi fish ponds
            </p>
            <p className="text-white font-light text-2xl">
              Where koi passion turns into stunning designs
            </p>
            <div>
              <NavLinkCustom path="/contact" label="Contact now" />
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
                    Why choose DCKoi?
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
