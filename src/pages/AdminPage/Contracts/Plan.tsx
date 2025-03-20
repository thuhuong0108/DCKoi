import { TemplateConstructionItemType } from "@/models";
import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { columnsConstruction } from "./type";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { constructionProjectActions } from "@/redux/slices/constructionProject/constructionProjectSlices";
import { useParams } from "react-router-dom";

const Plan = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [tableData, setTableData] = useState<TemplateConstructionItemType[]>(
    []
  );
  const construction = useAppSelector(
    (state) => state.constructionProject.itemConstruction
  );
  const loading = useAppSelector((state) => state.constructionProject.loading);

  const flattenData = (items: TemplateConstructionItemType[]) => {
    return items.map((item) => ({
      ...item,
      key: item.id,
      children: item.childs ? flattenData(item.childs) : undefined,
    }));
  };

  useEffect(() => {
    setTableData(flattenData(construction));
  }, [construction]);

  useEffect(() => {
    dispatch(constructionProjectActions.fetchConstructionProject(id));
  }, []);

  return (
    <div>
      <Table<TemplateConstructionItemType>
        loading={loading}
        columns={columnsConstruction}
        dataSource={tableData}
        pagination={false}
      />
    </div>
  );
};

export default Plan;
