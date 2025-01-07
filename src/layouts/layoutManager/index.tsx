import { ReactElement } from "react";

interface IndexProps {
  Page: () => ReactElement;
}
const LayoutManager: React.FC<IndexProps> = ({ Page }) => {
  return (
    <>
      <Page />
    </>
  );
};

export default LayoutManager;
