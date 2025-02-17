import {
  Button,
  confirmAlert,
  messageSuccess,
  TableComponent,
  Title,
} from "@/components";
import { Avatar, Col, Row } from "antd";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  information: string;
  createdAt: string;
}

const DetailConsultation: React.FC = () => {
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
      <Button
        primary
        onClick={handleDetail}
        title="Assign Staff"
        className="w-[165px] my-3"
      />

      <Row>
        <Col span={8}>
          <Title name="General Information" />
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
    </div>
  );
};

export default DetailConsultation;
