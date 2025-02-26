import {
  Button,
  confirmAlert,
  messageSuccess,
  TableComponent,
  Title,
} from "@/components";
import { KeyboardDoubleArrowRightOutlined } from "@mui/icons-material";
import { Avatar, Card, Col, Radio, Row } from "antd";
import { useEffect, useState } from "react";
import { FaPencilRuler } from "react-icons/fa";
import { FaRegFolder } from "react-icons/fa";
import { MdOutlineIndeterminateCheckBox } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { LuMail } from "react-icons/lu";
import { FiMapPin } from "react-icons/fi";
import { Slide, TextField } from "@mui/material";

interface Product {
  id: number;
  name: string;
  information: string;
  createdAt: string;
}

const DetailConsultation = () => {
  const [loading, setLoading] = useState(false);
  const setTimeDemoLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      messageSuccess("Time demo loading completed.");
    }, 1000);
  };
  const handleDetail = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      yes: () => {
        setTimeDemoLoading();
      },
      no: () => {
        console.log("No");
      },
    });
  };

  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Laptop", information: "1200", createdAt: "2023-10-01" },
    { id: 2, name: "Smartphone", information: "800", createdAt: "2023-10-02" },
    { id: 3, name: "Tablet", information: "600", createdAt: "2023-10-03" },
  ]);

  const [page, setPage] = useState(1);
  const itemsPerPage = 2;

  const handleEdit = (product: Product) => {
    console.log("Edit product:", product);
  };

  const handleDelete = (product: Product) => {
    setProducts(products.filter((p) => p.id !== product.id));
  };

  return (
    <div className="flex flex-col items-stretch mb-5 mt-8 mx-10 min-h-full w-screen">
      <Title name="Detail Consultation" />
      <div className="flex items-center space-x-2 my-4">
        <span className="bg-gray-300 rounded-2xl px-2 py-1"><KeyboardDoubleArrowRightOutlined /></span>
        <h1 className="w-1/5 font-semibold text-lg bg-gray-300 rounded-2xl py-1 text-center">HoangXuanViet - Basic Package</h1>
      </div>
      <Button
        primary
        onClick={handleDetail}
        title="Assign Staff"
        className="w-[165px] my-3"
      />
      <div className="flex flex-row justify-between my-2">
        <h2 className="text-red-600 text-2xl font-bold">TOTAL PRICE</h2>
        <h2 className="text-red-600 text-2xl font-bold">200.000.000 VND</h2>
      </div>
      <Row>
        <Col span={8}>
          <Title name="General Information" />
        </Col>
      </Row>
      <div className="flex gap-4 my-3">
        <Card className="w-1/3 break-words">
          <div className="flex gap-3">
            <img src="" alt="avatar" />
            <h2 className="font-bold text-xl mb-4">Hoàng Xuân Việt</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-lg"><FiPhone /></span>
              <p className="text-lg">0123 456 789</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg"><LuMail /></span>
              <p className="text-lg">viethxse@gmail.com</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg"><FiMapPin /></span>
              <p className="text-lg">10/5, 106 Street, Tang Nhon Phu A Ward,  Thu Duc City</p>
            </div>
          </div>
        </Card>
        <Card className="w-1/3">
          <h2 className="font-bold text-xl mb-4">Koi Pond Size</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-lg"><FaPencilRuler /></span>
              <p className="text-lg">20m2</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg"><FaRegFolder /></span>
              <p className="text-lg">1.2m</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg"><MdOutlineIndeterminateCheckBox /></span>
              <p className="text-lg">None</p>
            </div>
          </div>
        </Card>
      </div>
      <Row>
        <Col span={8}>
          <Title name="Design" />
        </Col>
      </Row>
      <div className="my-4">
        <Radio.Group disabled value="Design a new layout">
          <Radio value="Design a new layout" className="text-lg font-semibold">Design a new layout</Radio>
          <Radio value="Use template design" className="text-lg font-semibold">Use template design</Radio>
        </Radio.Group>
      </div>
      <Row>
        <Col span={8}>
          <Title name="Package information" />
        </Col>
      </Row>
      <TableComponent<Product>
        columns={["Name", "Price", "Created At", "Actions"]}
        data={products}
        props={["name", "information", "createdAt"]}
        actions={true}
        actionTexts={["Edit", "Delete"]}
        actionFunctions={[handleEdit, handleDelete]}
        loading={false}
        searchValue=""
        enablePagination={true}
        page={page}
        setPage={setPage}
        itemsPerPage={itemsPerPage}
        totalPages={Math.ceil(products.length / itemsPerPage)}
        sortableProps={["name", "information", "createdAt"]}
      />

      <div className="mt-4">
      <Row>
        <Col span={8}>
          <Title name="Note" />
        </Col>
      </Row>
      <TextField
        fullWidth
        label="Special request"
        margin="normal"
        variant="outlined"
      />
      </div>
    </div>
  );
};

export default DetailConsultation;
