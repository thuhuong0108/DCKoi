import { confirmAlert, messageSuccess, PackgeCard, Title } from "@/components";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { FormControl, Input, InputAdornment, TextField } from "@mui/material";
import { Col, Row } from "antd";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Card from "@/components/ui/Card";

interface PackageItem {
  idPackageItem: string;
  quantity: number;
  description: string;
}

interface PackageType {
  id: number;
  name: string;
  description: string;
  price: number;
  items: PackageItem[];
}

const PackagePage = () => {
  const [loading, setLoading] = useState(false);
  const setTimeDemoLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      messageSuccess("Time demo loading completed.");
    }, 1000);
  };

  const [data, setData] = useState<PackageType[]>([
    {
      id: 1,
      name: "Gói Thi Công Hồ Cá Koi Cơ Bản",
      description:
        "Gói thi công hồ cá koi cơ bản, bao gồm thiết kế hồ, hệ thống lọc cơ bản và lắp đặt cá koi.",
      price: 15000000,
      items: [
        {
          idPackageItem: "1",
          quantity: 1,
          description: "Thiết kế hồ cá koi cơ bản",
        },
        {
          idPackageItem: "2",
          quantity: 1,
          description: "Lắp đặt hệ thống lọc cơ bản",
        },
        {
          idPackageItem: "3",
          quantity: 10,
          description: "Lắp đặt 10 cá koi giống",
        },
      ],
    },
    {
      id: 2,
      name: "Gói Thi Công Hồ Cá Koi Tiêu Chuẩn",
      description:
        "Gói thi công hồ cá koi tiêu chuẩn, bao gồm thiết kế hồ, hệ thống lọc chất lượng và lắp đặt cá koi cao cấp.",
      price: 30000000,
      items: [
        {
          idPackageItem: "1",
          quantity: 1,
          description: "Thiết kế hồ cá koi tiêu chuẩn",
        },
        {
          idPackageItem: "2",
          quantity: 1,
          description: "Lắp đặt hệ thống lọc chất lượng",
        },
        {
          idPackageItem: "3",
          quantity: 15,
          description: "Lắp đặt 15 cá koi giống cao cấp",
        },
        {
          idPackageItem: "4",
          quantity: 1,
          description: "Lắp đặt đèn chiếu sáng hồ",
        },
      ],
    },
    {
      id: 3,
      name: "Gói Thi Công Hồ Cá Koi Premium",
      description:
        "Gói thi công hồ cá koi cao cấp, bao gồm thiết kế hồ, hệ thống lọc hiện đại, lắp đặt cá koi chất lượng cao và các tiện ích cao cấp.",
      price: 50000000,
      items: [
        {
          idPackageItem: "1",
          quantity: 1,
          description: "Thiết kế hồ cá koi cao cấp",
        },
        {
          idPackageItem: "2",
          quantity: 1,
          description: "Lắp đặt hệ thống lọc hiện đại",
        },
        {
          idPackageItem: "3",
          quantity: 20,
          description: "Lắp đặt 20 cá koi giống chất lượng cao",
        },
        {
          idPackageItem: "4",
          quantity: 1,
          description: "Lắp đặt đèn chiếu sáng hồ cao cấp",
        },
        {
          idPackageItem: "5",
          quantity: 1,
          description: "Lắp đặt hệ thống cấp nước tự động",
        },
      ],
    },
  ]);

  const [page, setPage] = useState(1);
  const itemsPerPage = data.length < 10 ? data.length : 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] = useState<PackageType | null>(null);

  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState(data);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearch(term);

    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleEdit = (item: PackageType) => {
    setSelectedItem(item);
    setInputValue(item.name);
    setIsModalOpen(true);
    console.log("Edit item:", item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: PackageType) => {
    confirmAlert({
      title: "Xác nhận xóa hạng mục",
      message: "Bạn có chắc chắn muốn xóa hạng mục ?",
      yes: () => {
        setData(data.filter((p) => p.id !== item.id));
      },
      no: () => {
        console.log("Không");
      },
    });
  };

  const handleSave = () => {
    if (selectedItem) {
      const updatedItems = data.map((item) =>
        item.id === selectedItem.id ? { ...item, name: inputValue } : item
      );
      setData(updatedItems);
    } else {
      const newItem = { id: data.length + 1, name: inputValue };
      // setData([...data, newItem]);
    }
    setIsModalOpen(false);
    setSelectedItem(null);
    setInputValue("");
  };

  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
      <Title name="Danh sách các gói thi công" />
      <Row className="flex flex-row justify-end items-center my-3">
        <Col>
          <FormControl variant="standard" className="w-[500px]">
            <Input
              id="standard-adornment-amount"
              placeholder="Tìm kiếm ..."
              value={search}
              onChange={handleSearch}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </Col>
      </Row>

      <Row onClick={() => setIsModalOpen(true)}>
        <Card
          children={
            <div>
              <img
                className="w-[300px] rounded-t-3xl p-28"
                src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
                alt="plus"
              />
            </div>
          }
          padding="none"
          hoverable
          className="mr-3 mt-3 flex justify-center items-center"
        />
        {data.map((pk, index) => (
          <Col key={index} onClick={() => setSelectedItem(true)}>
            <Card
              children={
                <div>
                  <img
                    className="w-[300px] rounded-t-3xl p-10"
                    src="https://cdn-icons-png.flaticon.com/512/18212/18212710.png"
                    alt={pk.name}
                  />
                  <div className="flex flex-row justify-center items-center mx-5 my-3">
                    <label className="text-gray-600 font-bold">
                      {" "}
                      {pk.name}
                    </label>
                  </div>
                </div>
              }
              padding="none"
              hoverable
              className="m-3"
            />
          </Col>
        ))}
      </Row>

      <Modal
        title={
          selectedItem ? "Thông tin về gói thi công" : "Tạo gói thi công mới"
        }
        desc="Vui lòng nhập đầy đủ thông tin"
        size="xl"
        visible={isModalOpen}
        onVisibleChange={setIsModalOpen}
        content={
          <div className="flex flex-col">
            <TextField
              required
              label="Tên gói thi công"
              value={inputValue}
              onChange={handleInputChange}
              className="m-2"
            />
            <div className="flex justify-end">
              <Button
                primary
                onClick={handleSave}
                title="Lưu"
                className="w-[100px] uppercase mt-3"
              />
            </div>
          </div>
        }
        backdrop={true}
        closeBtn={true}
      />
    </div>
  );
};

export default PackagePage;
