import { PackageMaintainType } from "@/models/PackageType";

interface ServiceCardProps {
  title: string;
  image: string;
  isRegular: boolean;
  serviceFeatures: string[];
}

const ServiceCard = ({
  name,
  image,
  maintenanceItems,
}: PackageMaintainType & { image: string }) => {
  return (
    <div className="flex flex-col self-stretch px-px pt-28 my-auto min-w-[240px] shadow-md rounded-2xl w-[588px] max-md:pt-24 max-md:max-w-full">
      <div className="flex z-10 flex-col px-11 pb-14 bg-white rounded-3xl max-md:px-5 max-md:max-w-full">
        <img
          loading="lazy"
          src={image}
          className="object-contain z-10 self-center -mt-28 max-w-full aspect-square rounded-[100px] shadow-sm w-[250px]"
        />
        <div className="mt-20 text-4xl font-bold text-indigo-800 max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
          {name}
        </div>
        <div className="flex flex-col mt-20 text-lg font-medium leading-none text-gray-500 min-h-[248px] max-md:mt-10 max-md:max-w-full">
          {maintenanceItems.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col pt-2.5 mt-6 w-full max-md:max-w-full"
            >
              <div className="self-center">{feature.name}</div>
              <div className="shrink-0 mt-3.5 h-0.5 border border-black border-dashed max-md:max-w-full" />
            </div>
          ))}
        </div>
        <button className="self-center px-14 py-2 mt-20 max-w-full text-lg font-semibold leading-loose text-white bg-indigo-600 hover:bg-indigo-800 transition-all duration-300 rounded-xl w-[264px] max-md:px-5 max-md:mt-10">
          Đặt dịch vụ
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
