import { TableComponent, Title } from "@/components";
import { ContractProjectType } from "@/models";
import { ContractStatus } from "@/models/enums/Status";
import {
  contractActions,
  selectedContract,
} from "@/redux/slices/contract/contractSlices";
import {
  contractProjectActions,
  selectedContractProject,
} from "@/redux/slices/contractProject/contractProjectSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { formatPrice, parseDate, parseStatusContract } from "@/utils/helpers";
import { Alert, Modal } from "antd";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { useParams } from "react-router-dom";
import ContractDetail from "./ContractDetail";

const ContractPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [openDetail, setOpenDetail] = useState(false);

  const contracts = useAppSelector(selectedContractProject);
  const contract = useAppSelector(selectedContract);

  useEffect(() => {
    dispatch(
      contractProjectActions.fetchContractProject({
        filter: { pageNumber: 1, pageSize: 10 },
        id: id,
      })
    );
  }, [id]);

  const handleDetail = (contract: ContractProjectType) => {
    setOpenDetail(true);
    dispatch(contractActions.fetchContract(contract.id));
  };

  const parseValues = (
    value: ContractStatus | string | number,
    prop: string
  ) => {
    if (prop === "contractValue") {
      return formatPrice(value as number);
    }
    if (prop === "createdAt") {
      return parseDate(value as string);
    }
    if (prop === "status") {
      return parseStatusContract(value as ContractStatus);
    }
  };

  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
      <Title name="Hợp đồng thi công" />

      <Alert
        className="my-4"
        banner
        // action={
        //   <Space direction="vertical">
        //     <Button
        //       size="middle"
        //       type="primary"
        //       className="w-[100px]"
        //       onClick={handleVerify}
        //     >
        //       Xác nhận
        //     </Button>
        //   </Space>
        // }
        message={
          <Marquee pauseOnHover gradient={false}>
            Vui lòng xem xét kĩ trước khi xác nhận hợp đồng
          </Marquee>
        }
      />

      <h1 className="text-base font-semibold text-black my-4">
        Danh sách hợp đồng
      </h1>

      <TableComponent<ContractProjectType>
        columns={[
          "Tên hợp đồng",
          "khách hàng",
          "Giá trị hợp đồng",
          "Ngày tạo",
          "Trạng thái",
        ]}
        data={contracts.data}
        props={["name", "customerName", "contractValue", "createdAt", "status"]}
        formatValue={parseValues}
        actions={true}
        actionTexts={["Chi tết"]}
        actionFunctions={[handleDetail]}
        enablePagination={true}
        page={contracts.pageNumber}
        setPage={(page) => {
          dispatch(
            contractProjectActions.fetchContractProject({
              filter: { pageNumber: page, pageSize: 10 },
              id: id,
            })
          );
        }}
        itemsPerPage={contracts.pageSize}
        totalPages={contracts.totalPages}
      />

      <Modal
        title={`Thông tin chi tiêt về ${contract.name}`}
        open={openDetail}
        width={1500}
        onCancel={() => setOpenDetail(false)}
        onClose={() => setOpenDetail(false)}
        onOk={() => setOpenDetail(false)}
        footer={false}
      >
        <ContractDetail id={contract.id} setOpenDetail={setOpenDetail} />
      </Modal>
    </div>
  );
};

export default ContractPage;
