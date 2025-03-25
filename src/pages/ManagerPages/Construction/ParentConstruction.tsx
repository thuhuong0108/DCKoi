import { TemplateConstructionItemType } from "@/models";
import React, { useState } from "react";
import ChildConstruction from "./ChildConstruction";
import { Button, Card, DatePicker, Form, Input, Modal } from "antd";
import useForm from "@/hooks/useForm";
import type { DatePickerProps } from "antd";
import { validateConstruction } from "@/validations/validate";

const ParentConstruction = ({
  constructionItem,
}: {
  constructionItem: TemplateConstructionItemType[];
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div className="flex w-full flex-row">
      {constructionItem.map((item) => (
        <Card title={item.name} className="m-2 w-[1000px]">
          {item.childs.map((child) => (
            <ChildConstruction item={child} />
          ))}
          {/* <Button
            type="primary"
            onClick={() => {
              setIsModalVisible(true);
            }}
          >
            Thêm công việc
          </Button> */}
        </Card>
      ))}
    </div>
  );
};

export default ParentConstruction;
