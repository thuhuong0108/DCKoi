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
        <Title name="Our Service"></Title>

        {services.map((city, index) => (
          <div key={index} className="p-2 border-b-2 ">
            <label className="pl-2">{city.name}</label>
          </div>
        ))}
      </Col>

      <Col span={8} className="flex flex-col justify-end ">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4659.477816840489!2d106.80498362653066!3d10.877092171250453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8a6b19d6763%3A0x143c54525028b2e!2zTmjDoCBWxINuIGjDs2EgU2luaCB2acOqbiBUUC5IQ00!5e0!3m2!1svi!2s!4v1736234489242!5m2!1svi!2s" className="border-0 w-[60%]" loading="lazy" aria-hidden="false" tabIndex={0} />
      </Col>
    </Row>
  );
};

export default Footer;
