import { TableComponent } from "@/components";
import { PackageItemType } from "@/models";

const DetailPackageRequest = ({ detail }) => {
  return (
    <div>
      <TableComponent<PackageItemType>
        columns={["Danh mục", "Mô tả", "Số lượng"]}
        data={detail.items}
        props={["name", "description", "quantity"]}
        actions={false}
        enablePagination={false}
      />
    </div>
  );
};

export default DetailPackageRequest;
