import { ReactElement } from "react";

interface IndexProps {
  Page: () => ReactElement;
}
const LayoutConsultant: React.FC<IndexProps> = ({ Page }) => {
  return (
    <>
      <Page />
    </>
  );
};

export default LayoutConsultant;
