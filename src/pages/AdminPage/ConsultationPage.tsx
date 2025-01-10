import { Button, Card ,confirmAlert} from "@/components";
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
      yes : () => {
        setTimeDemoLoading();
      },
      no : () => {
        console.log("No");
      }
      
    });
  }

    
  return (
    <div className="flex flex-col">
      <label>aaaaaa</label>
      <label>aaaaaa</label>
      <label>aaaaaa</label>

 
      <Card children={  <Button onClick={handleClick} title="Click Me" loading={loading}   primary  />}  padding="sm"/>

     
    </div>
  );
};

export default ConsultationPage;
