import { Title } from "@/components";
import {
  packageActions,
  selectPackage,
} from "@/redux/slices/package/packageSlices";
import { packageItemActions } from "@/redux/slices/packageItem/packageItemSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import React, { useEffect } from "react";
import PackageSkeleton from "./PackageSkeleton";
import DisplayPackage from "./DisplayPackage";

const Packages = () => {
  const dispatch = useAppDispatch();
  const packageLoading = useAppSelector((state) => state.package.loading);
  console.log(packageLoading);

  const packages = useAppSelector(selectPackage);
  const packageItemLoading = useAppSelector(
    (state) => state.packageItem.loading
  );
  const packageItems = useAppSelector(
    (state) => state.packageItem.packageItems
  );

  useEffect(() => {
    dispatch(packageActions.getPackage({ pageNumber: 1, pageSize: 10 }));
    dispatch(
      packageItemActions.fetchPackageItems({ pageNumber: 1, pageSize: 10 })
    );
  }, []);
  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 h-full">
      <Title name="Các gói thi công" />
      {packageLoading || packageItemLoading ? (
        Array.from({ length: 10 }).map((_, index) => (
          <PackageSkeleton key={index} />
        ))
      ) : (
        <DisplayPackage pkg={packages.data} itemPackage={packageItems.data} />
      )}
    </div>
  );
};

export default Packages;
