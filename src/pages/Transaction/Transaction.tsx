import { getTransactions } from "@/api/payment";
import { Title } from "@/components";
import { TransactionType } from "@/models";
import { Pagination } from "@/models/Common";
import { formatDateVietNamese } from "@/utils/helpers";
import { Table, TableColumnsType } from "antd";
import { set } from "date-fns";
import React, { useEffect, useState } from "react";

const Transaction = () => {
  const [transactions, setTransactions] = useState<Pagination<TransactionType>>(
    {
      data: [],
      pageNumber: 1,
      pageSize: 10,
      totalPages: 1,
      totalRecords: 0,
    }
  );
  const [loading, setLoading] = useState(false);
  const columns: TableColumnsType<TransactionType> = [
    {
      title: "Nội dung",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Loại giao dịch",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Ngày giao dịch",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return (
          <a>
            {formatDateVietNamese(
              text ? new Date(text).toISOString() : new Date().toISOString()
            )}
          </a>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
  ];
  const fetchTransaction = async (pageNumber: number, pageSize: number) => {
    const res = await getTransactions({ pageNumber, pageSize });
    console.log(res);

    if (res.isSuccess) {
      setTransactions(res);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchTransaction(transactions.pageNumber, transactions.pageSize);
    setLoading(false);
  }, []);
  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
      <Title name="Lịch sử giao dịch" />
      <div className="flex flex-col gap-4">
        <Table
          columns={columns}
          dataSource={transactions.data}
          pagination={{
            total: transactions.totalRecords,
            pageSize: transactions.pageSize,
            current: transactions.pageNumber,
            onChange: (page, pageSize) => {
              fetchTransaction(page, pageSize);
            },
          }}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Transaction;
