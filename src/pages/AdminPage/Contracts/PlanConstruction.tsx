import { Title } from "@/components";
import { TemplateConstructionItemType } from "@/models";
import {
  selectTemplateConstructionDetail,
  templateConstructionDetailActions,
} from "@/redux/slices/templateConstructionDetail/templateConstructionDetailSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { Table } from "antd";
import { useEffect } from "react";
import { columns } from "./type";
import type { TableColumnsType, TableProps } from "antd";

const PlanConstruction = ({ id }) => {
  type TableRowSelection<T extends object = object> =
    TableProps<T>["rowSelection"];
  const dispatch = useAppDispatch();
  const template = useAppSelector(selectTemplateConstructionDetail);

  useEffect(() => {
    dispatch(
      templateConstructionDetailActions.getTemplateConstructionDetail(id)
    );
  }, [id]);

  const flattenData = (items: TemplateConstructionItemType[]) => {
    return items.map((item) => ({
      ...item,
      key: item.id,
      children: item.child ? flattenData(item.child) : undefined,
    }));
  };

  return (
    <div className="flex flex-col">
      <Title name={template.name} />
      <p className="text-gray-500 text-sm my-3">{template.description}</p>

      <Table<TemplateConstructionItemType>
        columns={columns}
        // rowSelection={{ ...rowSelection, checkStrictly }}
        dataSource={flattenData(template.templateContructionItems)}
        pagination={false}
      />
    </div>
  );
};

export default PlanConstruction;
