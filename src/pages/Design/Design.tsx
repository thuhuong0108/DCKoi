import { Title } from "@/components";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import DesignCard from "./DesignCard";
import DesignSkeleton from "./DesignSkeleton";
import { useEffect } from "react";
import { projectActions } from "@/redux/slices/project/projectSlices";

const Design = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.project.projects);
  const isLoading = useAppSelector((state) => state.project.loading);
  useEffect(() => {
    dispatch(
      projectActions.fetchDesignProject({ pageNumber: 1, pageSize: 10 })
    );
  }, []);
  if (isLoading) {
    return (
      <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 h-full">
        <Title name="Thiết kế" />
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <DesignSkeleton key={item} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 h-full">
      <Title name="Thiết kế" />
      <div className="grid grid-cols-3 gap-4">
        {items.data.map((item) => (
          <DesignCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Design;
