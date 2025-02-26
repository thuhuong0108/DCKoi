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
    <div className="mt-10">
      <div className="text-center">
        <h2 className="text-indigo-800 font-bold text-2xl">Các gói thi công</h2>
      </div>
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
