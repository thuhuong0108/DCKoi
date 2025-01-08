import { Button } from "@/components";
import { useState } from "react";

const ConsultationPage = () => {
  const [loading, setLoading] = useState(false);
  const setTimeDemoLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  return (
    <div className="flex flex-col">
      <label>aaaaaa</label>
      <label>aaaaaa</label>
      <label>aaaaaa</label>

      <Button onClick={setTimeDemoLoading} title="Click Me" loading={loading} />
    </div>
  );
};

export default ConsultationPage;
