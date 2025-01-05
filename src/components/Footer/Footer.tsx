import ImgLogo from "@/assets/images/logo.png";
import { HomeOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import Title from "../Title";

const Footer = () => {
  const infor = [
    { name: "Ho Chi Minh City", icon: <HomeOutlined /> },
    { name: "dckoi@gmail.com", icon: <MailOutlined /> },
    { name: "0123 456 789", icon: <PhoneOutlined /> },
  ];

  const services = [
    { name: "Consulting of Koi fish ponds" },
    { name: "Design and construction of Koi fish ponds" },
    { name: "Cleaning and maintain of Koi fish ponds" },
  ];
  return (
    <Row className="my-8">
      <Col span={6} offset={3}>
        <img loading="lazy" src={ImgLogo} alt="Logo" className="w-[30%]" />
        <label className="text-gray-500">
          Where koi passion turns into stunning designs
        </label>

        {infor.map((city, index) => (
          <div key={index} className="p-2">
            {city.icon}
            <label className="pl-2">{city.name}</label>
          </div>
        ))}
      </Col>

      <Col span={5} className="flex flex-col justify-end mx-5 pr-5">
        <Title name="Our Sevice"></Title>

        {services.map((city, index) => (
          <div key={index} className="p-2 border-b-2 ">
            <label className="pl-2">{city.name}</label>
          </div>
        ))}
      </Col>

      <Col span={8} className="flex flex-col justify-end ">
        <img loading="lazy" src={ImgLogo} alt="Logo" className="w-[30%]" />
      </Col>
    </Row>
  );
};

export default Footer;
