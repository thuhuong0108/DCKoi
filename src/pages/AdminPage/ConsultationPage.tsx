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
} from "@/components";
import { PlusCircleFilled, PlusCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

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
      <label>aaaaaa</label>
      <label>aaaaaa</label>
      <label>aaaaaa</label>

      <Card
        children={
          <Button
            onClick={handleClick}
            title="Click Me"
            loading={loading}
            primary
          />
        }
        padding="sm"
      />

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
            <Button title="Click Me" onClick={handleClick} primary />
          </>
        }
      />

      <Switch
        className="shrink-0"
        checked={projectSetting}
        onChange={() => setProjectSetting(!projectSetting)}
      />

      <Timeline
        month={1}
        year={2025}
        items={tasks}
        onChange={handleDateChange}
        height="3rem"
      >
        {(item) => (
          <div className="p-2 text-white bg-blue-500 rounded">{item.title}</div>
        )}
      </Timeline>
    </div>
  );
};

export default ConsultationPage;
