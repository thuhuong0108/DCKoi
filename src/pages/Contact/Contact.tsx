import {
  Banner,
  DesignTemplate,
  FormInput,
  PackageField,
  Title,
} from "@/components";
import { Button, Col, Radio, RadioChangeEvent, Row, Select } from "antd";
import { useState } from "react";

const Contact = () => {
  const [fields, setFields] = useState([
    {
      label: "Fullname",
      placeholder: "Enter your fullname",
      value: "",
    },
    {
      label: "Phone number",
      placeholder: "Enter your phone number",
      value: "",
    },
    {
      label: "Email",
      placeholder: "Enter your email",
      value: "",
    },
    {
      label: "Address",
      placeholder: "Enter your address",
      value: "",
    },
    {
      label: "Estimated area of ​​koi pond to be built",
      placeholder: "Enter estimated area of ​​koi pond to be built",
      value: "",
    },
    {
      label: "Koi pond construction depth",
      placeholder: "Enter Koi pond construction depth",
      value: "",
    },
  ]);
  const optionPackage = [
    "Basic package",
    "Standard package",
    "Premium package",
  ];
  const dataPackage = [
    {
      key: "1",
      item: "Setting-out of Drainage",
      description: "Set out as shown in the drawings.",
      unit: "sum",
      quantity: 1,
    },
    {
      key: "2",
      item: "Excavation",
      description:
        "Excavate foundation trench to a minimum depth of 0.3m (plus 0.25m sideways to allow working space)",
      unit: "m3",
      quantity: 15,
    },
    {
      key: "3",
      item: "Blinding",
      description:
        "Cast 75mm blinding under blockwork with concrete of ratio 1:3:6. slope towards south",
      unit: "m3",
      quantity: 2.75,
    },
  ];
  const [design, setDesign] = useState("Use template design");

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setDesign(e.target.value);
  };
  const handleChangePackage = (value: string) => {
    console.log(`Selected package: ${value}`);
  };
  const handleChangeValue = (e, index) => {
    const newFields = [...fields];
    newFields[index].value = e.target.value;
    setFields(newFields);
  };

  return (
    <div>
      <Banner />
      <Row className="p-5">
        <Col span={16} offset={4}>
          <Title name="BASE INFORMATON" />
          {fields.map((field, index) => (
            <FormInput
              key={index}
              label={field.label}
              placeholder={field.placeholder}
              value={field.value}
              onChange={(e) => handleChangeValue(e, index)}
            />
          ))}

          <Title name="PACKAGE INFORMATON" />
          <div className="my-4">
            <Select
              size="large"
              style={{ width: "100%" }}
              defaultValue="Basic package"
              onChange={handleChangePackage}
              options={optionPackage.map((pkg) => ({ label: pkg, value: pkg }))}
            />

            <PackageField label="Pond layout" data={dataPackage} />
            <PackageField label="Pond layout" data={dataPackage} />
            <PackageField label="Pond layout" data={dataPackage} />
          </div>

          <Title name="DESIGN TEMPLATE" />
          <div className="my-4">
            <Radio.Group onChange={onChange} value={design}>
              <Radio value="Use template design">Use template design</Radio>
              <Radio value="Design a new layout">Design a new layout</Radio>
            </Radio.Group>
            {design === "Design a new layout" ? (
              <></>
            ) : (
              <Row className="flex flex-row justify-between my-5">
                <DesignTemplate />
                <DesignTemplate />
                <DesignTemplate />
              </Row>
            )}
          </div>

          <Title name="NOTE" />
          <FormInput
            label="Special request"
            placeholder="Enter your opinion"
            value=""
          />

          <div className="flex flex-row justify-between">
            <Title name="TOTAL PRICE" />
            <Title name="200.000.000VND" />
          </div>

          <div className="flex justify-end my-5">
            <Button type="primary" size="large">
              Send Request
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Contact;
