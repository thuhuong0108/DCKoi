import ImgBanner from "@/assets/images/banner.png";
const Banner = () => {
  return (
    <div className="relative">
      <img
        src={ImgBanner}
        alt="KoiPondBanner"
        className="w-screen h-96 object-cover brightness-50"
      />
      <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-white font-semibold text-3xl">Contact us</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
