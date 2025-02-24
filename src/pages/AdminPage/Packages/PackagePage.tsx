import { Title } from "@/components";
import {
  packageActions,
  selectPackage,
} from "@/redux/slices/package/packageSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { Row } from "antd";
import React from "react";
import PlusPackage from "./PlusPackage";
import PackageCard from "./PackageCard";
import PackageCardSkeleton from "./PackageCardSkeleton";

const PackagePage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.package.loading);

  const items = useAppSelector(selectPackage);

  React.useEffect(() => {
    dispatch(packageActions.getPackage({ pageNumber: 1, pageSize: 10 }));
  }, []);
  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 h-full">
      <Title name="Các gói thi công" />

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
