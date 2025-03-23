import { Table } from "antd";

const columns = [
  {
    title: "Giai đoạn thi công",
    dataIndex: "index",
    key: "index",
    width: "20%",
    render: (_, __, index) => <a>Giai đoạn {index + 1}</a>,
  },
  {
    title: "Hạng mục",
    dataIndex: "name",
    key: "name",
    width: "20%",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
    width: "30%",
  },
  {
    title: "Công việc",
    dataIndex: "child",
    key: "child",
    width: "30%",
    render: (child) => (
      <ul>
        {child?.map((item) => (
          <li key={item.id}>
            {item.name} - {item.description}
          </li>
        ))}
      </ul>
    ),
  },
];

const TableStage = ({ template }) => (
  <Table
    dataSource={template}
    columns={columns}
    pagination={false}
    rowKey="id"
  />
);

export default TableStage;
