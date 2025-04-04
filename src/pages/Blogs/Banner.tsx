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
          <p className="text-white font-semibold text-3xl">
            Tư vấn, thiết kế, thi công hồ cá Koi
          </p>
          <p className="text-white font-light text-2xl">
            Nơi niềm đam mê cá koi chuyển thành những thiết kế tuyệt đẹp
          </p>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
