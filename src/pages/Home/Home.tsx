import ImgBanner from "@/assets/images/banner.png";
import ImgHand from "@/assets/images/hand.png";
import { FeatureCard,  NavLinkCustom } from "@/components";

const features = [
  {
    color: "bg-red-600",
    title: "Expert Koi fish pond design consulting",
    description: "Expert Koi fish pond design consulting includes selecting the appropriate location and size of the pond, an effective water filtration system, designing the landscape in harmony with nature, and ensuring an ideal living environment for the Koi fish to optimize their growth and health. Additionally, it focuses on maintaining water quality, lighting, and the drainage system to create a relaxing and aesthetically pleasing space"
  },
  {
    color: "bg-emerald-600",
    title: "Expert Koi fish pond design consulting",
    description: "Expert Koi fish pond design consulting includes selecting the appropriate location and size of the pond, an effective water filtration system, designing the landscape in harmony with nature, and ensuring an ideal living environment for the Koi fish to optimize their growth and health. Additionally, it focuses on maintaining water quality, lighting, and the drainage system to create a relaxing and aesthetically pleasing space"
  },
  {
    color: "bg-yellow-600",
    title: "Expert Koi fish pond design consulting",
    description: "Expert Koi fish pond design consulting includes selecting the appropriate location and size of the pond, an effective water filtration system, designing the landscape in harmony with nature, and ensuring an ideal living environment for the Koi fish to optimize their growth and health. Additionally, it focuses on maintaining water quality, lighting, and the drainage system to create a relaxing and aesthetically pleasing space"
  }
];

const Home = () => {
  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="relative">
        <img src={ImgBanner} alt="KoiPondBanner" className="w-screen h-96 object-cover brightness-50" />
        <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-white font-semibold text-3xl">Consulting, design, and construction of Koi fish ponds</p>
            <p className="text-white font-light text-2xl">Where koi passion turns into stunning designs</p>
            <div>
              <NavLinkCustom path="/contact" label="Contact now" />
            </div>
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default Home;
