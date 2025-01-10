import { Button, Card, confirmAlert, TableComponent } from "@/components";
import { useState } from "react";

const ConsultationPage = () => {
  const [loading, setLoading] = useState(false);
  const setTimeDemoLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
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
  const [page , setPage] = useState<number>(1)
  const [totalPages, setTotalePage] = useState<number>(10)
  

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
    </div>
  );
};

export default ConsultationPage;
