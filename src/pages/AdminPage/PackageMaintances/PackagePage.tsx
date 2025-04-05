import { Title } from "@/components";
import { packageMaintainceActions } from "@/redux/slices/packageMaintaice/packageMaintainceSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { Row } from "antd";
import React from "react";
import PackageCard from "./PackageCard";
import PackageCardSkeleton from "./PackageCardSkeleton";
import PlusPackage from "./PlusPackage";

const PackagePage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.packageMaintaince.loading);

  const items = useAppSelector(
    (state) => state.packageMaintaince.packageMaintainItems
  );

  React.useEffect(() => {
    dispatch(
      packageMaintainceActions.getPackageMaintaince({
        pageNumber: 1,
        pageSize: 10,
      })
    );
  }, []);
  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 h-full">
      <Title name="Các gói bảo dưỡng" />

      <Row gutter={[16, 16]}>
        <div className="p-4">
          <PlusPackage />
        </div>
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <PackageCardSkeleton key={index} />
            ))
          : items.data.map((item) => (
              <div key={item.id} className="p-4">
                <PackageCard item={item} />
              </div>
            ))}
      </Row>
    </div>
  );
};

export default PackagePage;
