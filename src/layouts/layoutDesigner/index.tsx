import { ReactElement } from "react";

interface IndexProps {
  Page: () => ReactElement;
}
const LayoutDesigner: React.FC<IndexProps> = ({ Page }) => {
  return (
    <>
      <Page />
    </>
  );
};

export default LayoutDesigner;
