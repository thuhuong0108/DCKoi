import { DesignCard } from "@/components";
import { Search } from "@mui/icons-material";
import { Pagination } from "@mui/material";
import { Input, Row, Select } from "antd";
import { useState } from "react";

const DesignerPage = () => {
    const [sortOrder, setSortOrder] = useState<string>("newest");

    return (
        <div className="bg-white w-full p-5 m-5 shadow-md rounded-lg space-y-8">
            <div className="flex justify-between">
                <h1 className="font-bold text-xl">Design</h1>
                <div className="flex space-x-6">
                    <Input size="large" placeholder="Search" prefix={<Search />} className="bg-gray-100" />
                    <Select
                        defaultValue={sortOrder}
                        value={`Sort by: ${sortOrder === "newest" ? "Newest" : "Oldest"}`}
                        options={[
                            { value: "newest", label: "Newest" },
                            { value: "oldest", label: "Oldest" },
                        ]}
                        onChange={(value) => setSortOrder(value)}
                        className="w-72 h-full bg-gray-100" />
                </div>
            </div>

            {/* Design Product Card */}
            <div className="">
                <Row>
                    <DesignCard />
                    <DesignCard />
                    <DesignCard />
                </Row>
            </div>

             <div className="flex justify-end">
                <Pagination count={50} color="primary" shape="rounded"/>
             </div>
        </div>
    )
}

export default DesignerPage
