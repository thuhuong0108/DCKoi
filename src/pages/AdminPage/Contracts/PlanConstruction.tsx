import { Title } from "@/components";
import {
  selectTemplateConstructionDetail,
  templateConstructionDetailActions,
} from "@/redux/slices/templateConstructionDetail/templateConstructionDetailSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { Tree } from "antd";
import React, { useEffect } from "react";

const transformData = (data) => {
  return data.map((item) => ({
    key: item.id,
    title: item.name,
    children: item.child
      ? transformData(item.child).map((child) => ({ ...child, disabled: true }))
      : [],
  }));
};

const PlanConstruction = ({ id }) => {
  const dispatch = useAppDispatch();
  const template = useAppSelector(selectTemplateConstructionDetail);

  useEffect(() => {
    dispatch(
      templateConstructionDetailActions.getTemplateConstructionDetail(id)
    );
  }, [id]);

  const treeData = transformData(template.templateContructionItems);
  return (
    <div className="flex flex-col">
      <Title name={template.name} />
      <p className="text-gray-500 text-sm my-3">{template.description}</p>

      <Tree
        className="draggable-tree"
        defaultExpandAll
        draggable
        blockNode
        checkable
        treeData={treeData}
      />
    </div>
  );
};

export default PlanConstruction;
