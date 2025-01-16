import ImgBanner from "@/assets/images/banner.png";
import ImgHand from "@/assets/images/hand.png";
import ImgKoiPond from "@/assets/images/koipond.png";
import { FeatureCard, KoiCard, NavLinkCustom } from "@/components";
import { Col, Row } from "antd";
import { NavLink } from "react-router-dom";

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

const pricingTableData = {
  headers: ["", "Basic", "Standard", "Premium"],
  plans: [
    {
      feature: "Koi pond 8 to 10m³",
      basic: "10.000.000 đ/m³",
      standard: "12.000.000 đ/m³",
      premium: "15.000.000 đ/m³",
    },
    {
      feature: "Koi pond 10 to 20m³",
      basic: "9.500.000 đ/m³",
      standard: "11.000.000 đ/m³",
      premium: "14.000.000 đ/m³",
    },
    {
      feature: "Koi pond 20 to 50m³",
      basic: "8.500.000 đ/m³",
      standard: "10.000.000 đ/m³",
      premium: "12.500.000 đ/m³",
    },
    {
      feature: "Koi pond 50 to 100m³",
      basic: "7.800.000 đ/m³",
      standard: "9.000.000 đ/m³",
      premium: "11.500.000 đ/m³",
    },
    {
      feature: "Koi pond from 100m³",
      basic: "7.100.000 đ/m³",
      standard: "8.000.000 đ/m³",
      premium: "9.500.000 đ/m³",
    },
    {
      feature: "Free design",
      basic: "✔️",
      standard: "✔️",
      premium: "✔️",
    },
    {
      feature: "Oil-repellent waterproofing",
      basic: "✔️",
      standard: "50 Pages",
      premium: "50 Pages",
    },
    {
      feature: "Pump",
      basic: "Taiwan",
      standard: "Japanese push flow pump",
      premium: "All Japanese pumps",
    },
    {
      feature: "Smell flowers and basic shrubs",
      basic: "✔️",
      standard: "✔️",
      premium: "✔️",
    },
    {
      feature: "Floating LED spotlight",
      basic: "",
      standard: "✔️",
      premium: "✔️",
    },
    {
      feature: "Decorative Buddhist pine",
      basic: "",
      standard: "",
      premium: "✔️",
    },
  ],
};

const koiPondData = [
  {
    image: ImgKoiPond,
    title: "Garden Koi fish pond",
    description:
      "Utilize the front yard space to make the Koi fish pond a focal point for the house. The perfect ...",
  },
  {
    image: ImgKoiPond,
    title: "Garden Koi fish pond",
    description:
      "Utilize the front yard space to make the Koi fish pond a focal point for the house. The perfect ...",
  },
  {
    image: ImgKoiPond,
    title: "Garden Koi fish pond",
    description:
      "Utilize the front yard space to make the Koi fish pond a focal point for the house. The perfect ...",
  },
  {
    image: ImgKoiPond,
    title: "Garden Koi fish pond",
    description:
      "Utilize the front yard space to make the Koi fish pond a focal point for the house. The perfect ...",
  },
  {
    image: ImgKoiPond,
    title: "Garden Koi fish pond",
    description:
      "Utilize the front yard space to make the Koi fish pond a focal point for the house. The perfect ...",
  },
  {
    image: ImgKoiPond,
    title: "Garden Koi fish pond",
    description:
      "Utilize the front yard space to make the Koi fish pond a focal point for the house. The perfect ...",
  },
  {
    image: ImgKoiPond,
    title: "Garden Koi fish pond",
    description:
      "Utilize the front yard space to make the Koi fish pond a focal point for the house. The perfect ...",
  },
  {
    image: ImgKoiPond,
    title: "Garden Koi fish pond",
    description:
      "Utilize the front yard space to make the Koi fish pond a focal point for the house. The perfect ...",
  },
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

      <div className="mx-48">
        {/* Why choose DCKoi */}
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
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </div>

        {/* Price List */}
        <div className="mt-12 mb-4 flex justify-center">
          <h2 className="text-indigo-800 font-bold text-2xl">
            Our design and construction packages
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 text-sm text-center">
            {/* Table Header */}
            <thead className="bg-white">
              <tr>
                {pricingTableData.headers.map((header, index) => (
                  <th
                    key={index}
                    className="border border-gray-300 px-6 py-3 text-gray-800"
                  >
                    <div className="flex flex-col space-y-2">
                      <span className="text-2xl font-bold">{header}</span>
                      {index !== 0 && (
                        <NavLink
                          to="/contact"
                          className="text-white bg-indigo-600 py-3 rounded-3xl"
                        >
                          Getting started
                        </NavLink>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {pricingTableData.plans.map((plan, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-5 py-4 font-bold">
                    {plan.feature}
                  </td>
                  <td className="border border-gray-300 px-5 py-4 font-semibold">
                    {plan.basic || "-"}
                  </td>
                  <td className="border border-gray-300 px-5 py-4 font-semibold">
                    {plan.standard || "-"}
                  </td>
                  <td className="border border-gray-300 px-5 py-4 font-semibold">
                    {plan.premium || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Beautiful Koi pond models */}
        <div className="mt-12 mb-4 flex justify-center">
          <h2 className="text-indigo-800 font-bold text-2xl">
            Beautiful Koi pond models
          </h2>
        </div>
        <Row gutter={[16, 24]}>
          {koiPondData.map((koiPond, index) => (
            <Col span={6}>
              <KoiCard key={index} {...koiPond} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Home;
