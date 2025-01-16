import {
  Button,
  Card,
  confirmAlert,
  Dialog,
  messageInfo,
  Modal,
  TableComponent,
  messageSuccess,
  Scrollbar,
  Switch,
  Timeline,
  Logo,
  Menu,
} from "@/components";
import { PlusCircleOutlined } from "@ant-design/icons";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ArticleIcon from "@mui/icons-material/Article";
import { Row } from "antd";
import { useEffect, useState } from "react";
import { MenuItem } from "@mui/material";
import { Label } from "@mui/icons-material";

const ConsultationPage = () => {
  const [loading, setLoading] = useState(false);
  const setTimeDemoLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      messageSuccess("Time demo loading completed.");
    }, 1000);
  };
  const handleClick = () => {
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
  interface User {
    id: number;
    name: string;
    email: string;
    balance: string;
  }
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalePage] = useState<number>(10);
  const [projectSetting, setProjectSetting] = useState(false);

  const data: User[] = [
    { id: 1, name: "Alice", email: "alice@example.com", balance: "1200.4567" },
    { id: 2, name: "Bob", email: "bob@example.com", balance: "300" },
    { id: 1, name: "Alice", email: "alice@example.com", balance: "1200.4567" },
    { id: 2, name: "Bob", email: "bob@example.com", balance: "300" },
    { id: 1, name: "Alice", email: "alice@example.com", balance: "1200.4567" },
    { id: 2, name: "Bob", email: "bob@example.com", balance: "300" },
    { id: 1, name: "Alice", email: "alice@example.com", balance: "1200.4567" },
    { id: 2, name: "Bob", email: "bob@example.com", balance: "300" },
    { id: 1, name: "Alice", email: "alice@example.com", balance: "1200.4567" },
    { id: 2, name: "Bob", email: "bob@example.com", balance: "300" },
  ];

  const columns = ["Name", "Email", "Balance"];
  const props = ["name", "email", "balance"] as const;

  const formatValue = (value: string, prop: string, item: User) => {
    if (prop === "balance") {
      return `$${parseFloat(value).toFixed(2)}`;
    }
  };
  const [visible, setVisible] = useState(false);

  const tasks = [
    {
      id: "1",
      title: "Project A",
      start: new Date(2025, 0, 5), // 5 Jan 2025
      end: new Date(2025, 0, 10), // 10 Jan 2025
    },
    {
      id: "2",
      title: "Project B",
      start: new Date(2025, 0, 15),
      end: new Date(2025, 0, 20),
    },
  ];

  const handleDateChange = ({ id, start, end }) => {
    console.log(`Task ${id} updated:`, start, end);
  };
  return (
    <div className="flex flex-col">
      <Row>
        <Button info onClick={handleClick} title="aaaaa" loading={loading} />
        <Button primary onClick={handleClick} title="aaaaa" loading={loading} />
        <Button danger onClick={handleClick} title="aaaaa" loading={loading} />
      </Row>

      <Card
        children={
          <div>
            <img src="/logo.png" alt="logo" />
            <Button
              onClick={handleClick}
              title="Click Me"
              loading={loading}
              primary
            />
          </div>
        }
        padding="sm"
      />
      <Row>
        <Card
          className="shadow-inner-top p-4 w-[500px] m-2"
          padding="sm"
          bordered={true}
          inner={true}
          hoverable={true}
        >
          <Card.Header className="custom-header">
            <label className="text-xl font-weight-bold">Hoang Xuan Viet</label>
          </Card.Header>
          <Card.Body className="custom-body">
            <div className="p-2 flex flex-row justify-between items-center text-gray-400 border-b-2 ">
              <label>Wed, December 11, 2024</label>
              <label>11:00 AM</label>
            </div>
            <div className="p-2 flex flex-row justify-start items-center">
              <LocalPhoneIcon className="mr-2 " />
              <label className="text-black">0123 456 789</label>
            </div>

            <div className="p-2 flex flex-row justify-start items-center">
              <LocationOnIcon className="mr-2 " />
              <label className="text-black">
                10/5, 106 Street, Tang Nhon Phu A Ward, Thu Duc City
              </label>
            </div>
            <div className="p-2 flex flex-row justify-start items-center">
              <ArticleIcon className="mr-2 " />
              <label className="text-black">Construction</label>
            </div>
          </Card.Body>
          <Card.Footer className="custom-footer flex flex-row justify-between">
            <Button
              info
              onClick={handleClick}
              title="Detail"
              loading={loading}
              className="w-[220px]"
            />
            <Button
              danger
              onClick={handleClick}
              title="Add staff"
              loading={loading}
              className="w-[220px] uppercase"
            />
          </Card.Footer>
        </Card>

        <Card
          className="shadow-inner-top p-4 w-[500px] m-2"
          padding="sm"
          bordered={true}
          inner={true}
          hoverable={true}
        >
          <Card.Header className="custom-header">
            <button>Click me!</button>
          </Card.Header>
          <Card.Body className="custom-body">
            <p>This is some content inside the card body.</p>
          </Card.Body>
          <Card.Footer className="custom-footer">
            <Button
              info
              onClick={handleClick}
              title="Detail"
              loading={loading}
              className="w-[200px]"
            />
            <Button
              danger
              onClick={handleClick}
              title="Add staff"
              loading={loading}
              className="w-[200px]"
            />
          </Card.Footer>
        </Card>

        <Card
          className="shadow-inner-top p-4 w-[500px] m-2"
          padding="sm"
          bordered={true}
          inner={true}
          hoverable={true}
        >
          <Card.Header className="custom-header">
            <label>Hoang Xuan Viet</label>
          </Card.Header>
          <Card.Body className="custom-body">
            <div className="p-2 flex flex-row justify-start items-center">
              <LocalPhoneIcon className="mr-2 " />
              <label className="text-gray-500">0123 456 789</label>
            </div>

            <div className="p-2 flex flex-row justify-start items-center">
              <LocationOnIcon className="mr-2 " />
              <label className="text-gray-500">
                10/5, 106 Street, Tang Nhon Phu A Ward, Thu Duc City
              </label>
            </div>
            <div className="p-2 flex flex-row justify-start items-center">
              <ArticleIcon className="mr-2 " />
              <label className="text-gray-500">Construction</label>
            </div>
          </Card.Body>
          <Card.Footer className="custom-footer">
            <Button
              info
              onClick={handleClick}
              title="Detail"
              loading={loading}
              className="w-[200px]"
            />
            <Button
              danger
              onClick={handleClick}
              title="Add staff"
              loading={loading}
              className="w-[200px]"
            />
          </Card.Footer>
        </Card>
      </Row>

      {/* <Dialog.Root open={visible} onOpenChange={setVisible}>
        <Dialog.Trigger>
          <div className="project-view-item">
            <PlusCircleFilled />
            <span>View</span>
          </div>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Content size="lg">
            <TableComponent<User>
              loading={loading}
              columns={columns}
              data={data}
              props={props}
              formatValue={formatValue}
              sortableProps={["name", "balance"]}
              noContentProps={{ text: "No users available at the moment." }}
              enablePagination
              setPage={setPage}
              totalPages={totalPages}
              page={page}
              itemsPerPage={20}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root> */}

      <Modal
        visible={visible}
        onVisibleChange={setVisible}
        title="Add a new task"
        triggerBy={
          <div>
            <Button
              primary
              leadingIcon={<PlusCircleOutlined />}
              title="Create task"
              className="fixed-craete-btn"
            />
          </div>
        }
        content={
          <>
            <Button title="Add" onClick={handleClick} primary />
          </>
        }
      />

      {/* <Switch
        className="shrink-0"
        checked={projectSetting}
        onChange={() => setProjectSetting(!projectSetting)}
      /> */}

      {/* <Timeline
        month={1}
        year={2025}
        items={tasks}
        onChange={handleDateChange}
        height="3rem"
      >
        {(item) => (
          <div className="p-2 text-white bg-blue-500 rounded">{item.title}</div>
        )}
      </Timeline> */}
    </div>
  );
};

export default ConsultationPage;
