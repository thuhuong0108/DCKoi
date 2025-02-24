import React from "react";
import Card from "../ui/Card";

interface PackagePros {
  name: string;
  onClick: (name: string) => void;
}

const PackgeCard: React.FC<PackagePros> = ({ name, onClick }) => {
  return (
    <div onClick={() => onClick(name)}>
      <Card
        children={
          <div>
            <img
              className="w-[250px] rounded-t-3xl"
              src="https://i.pinimg.com/736x/d4/ab/ee/d4abee491ac72be5715f61695aac3564.jpg"
              alt="logo"
            />
            <div className="flex flex-row justify-center items-center mx-5 my-3">
              <label className="text-gray-600 font-bold"> {name}</label>
            </div>
          </div>
        }
        padding="none"
        hoverable
        className="m-3"
      />
    </div>
  );
};

export default PackgeCard;
