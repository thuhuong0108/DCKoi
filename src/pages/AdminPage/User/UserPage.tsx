import { confirmAlert, messageSuccess, Title } from "@/components";
import { useEffect, useState } from "react";

const ManagementUser = () => {
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
  const sortby = [
    {
      value: "date",
      label: "Date",
    },
    {
      value: "name",
      label: "Name",
    },
  ];

  const dataConsultation = [
    {
      fullname: "Hoang Xuan Viet",
      date: "Wed, December 11, 2024",
      time: "11:00 AM",
      phone: "0123 456 789",
      address: "10/5, 106 Street, Tang Nhon Phu A Ward, Thu Duc City",
      basepackage: "Basic package",
      status: "pending",
    },
    {
      fullname: "Hoang Xuan Viet",
      date: "Wed, December 11, 2024",
      time: "11:00 AM",
      phone: "0123 456 789",
      address: "10/5, 106 Street, Tang Nhon Phu A Ward, Thu Duc City",
      basepackage: "Basic package",
      status: "cancel",
    },
    {
      fullname: "Hoang Xuan Viet",
      date: "Wed, December 11, 2024",
      time: "11:00 AM",
      phone: "0123 456 789",
      address: "10/5, 106 Street, Tang Nhon Phu A Ward, Thu Duc City",
      basepackage: "Basic package",
      status: "done",
    },
    {
      fullname: "Hoang Xuan Viet",
      date: "Wed, December 11, 2024",
      time: "11:00 AM",
      phone: "0123 456 789",
      address: "10/5, 106 Street, Tang Nhon Phu A Ward, Thu Duc City",
      basepackage: "Basic package",
      status: "pending",
    },
    {
      fullname: "Hoang Xuan Viet",
      date: "Wed, December 11, 2024",
      time: "11:00 AM",
      phone: "0123 456 789",
      address: "10/5, 106 Street, Tang Nhon Phu A Ward, Thu Duc City",
      basepackage: "Basic package",
      status: "pending",
    },
  ];
  // const handSearch= () => {

  // }
  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 h-full">
      <Title name="User" />
    </div>
  );
};

export default ManagementUser;
