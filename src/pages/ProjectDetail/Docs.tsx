import { acceptDocs, postDocs, verifyDocs } from "@/api/docs";
import { getDocsType } from "@/api/docsType";
import { CountdownTime, messageError, Uploader } from "@/components";
import useForm from "@/hooks/useForm";
import { DocsProjectType, DocsType } from "@/models/DocsType";
import { DocsRequest } from "@/models/Request/DocsRequest";
import { projectStateDetailActions } from "@/redux/slices/projectStateDetail/projectStateDetailSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { validateDocs } from "@/validations/validate";
import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Select,
  Table,
  TableProps,
  Statistic,
} from "antd";
import { set } from "date-fns";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const { Countdown } = Statistic;
const Docs = () => {
  const { id } = useParams();
  const docs = useAppSelector((state) => state.projectStateDetail.docs);
  const [docsType, setDocsType] = useState<DocsType[]>([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      projectStateDetailActions.fetchDocs({
        id: id,
        filter: { pageNumber: 1, pageSize: 5 },
      })
    );
  }, []);
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [openVerify, setOpenVerify] = useState(false);
  const [loading, setLoading] = useState(false);
  const conlumns: TableProps<DocsProjectType>["columns"] = [
    {
      title: "Tên tài liệu",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Loại tài liệu",
      dataIndex: "docType",
      key: "docType",
      render: (type) => {
        return type.name;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "Hình ảnh tài liệu",
      dataIndex: "url",
      key: "url",
      render: (url) => {
        return <Image src={url} width={50} height={50} />;
      },
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return (
          <>
            {record.status === "PROCESSING" && (
              <Button
                loading={loading}
                type="primary"
                onClick={async () => {
                  setLoading(true);
                  const res = await acceptDocs(record.id);
                  if (res.isSuccess) {
                    setOpenVerify(true);
                    setOpt({ ...opt, idDocs: record.id });
                    //  set dealine 5 minutes

                    setDeadline(new Date(Date.now() + 5 * 60000));
                  }
                  setLoading(false);
                }}
              >
                Duyệt
              </Button>
            )}
          </>
        );
      },
    },
  ];
  const [opt, setOpt] = useState({
    idDocs: "",
    otp: "",
  });

  return (
    <div>
      <Table<DocsProjectType>
        columns={conlumns}
        dataSource={docs.docs.data}
        pagination={
          docs.docs.totalRecords > 2
            ? {
                total: docs.docs.totalRecords,
                pageSize: docs.docs.pageSize,
                current: docs.docs.pageNumber,
                onChange: (page) => {
                  dispatch(
                    projectStateDetailActions.fetchDocs({
                      id: id,
                      filter: { pageNumber: page, pageSize: 5 },
                    })
                  );
                },
              }
            : false
        }
      />
      <Modal
        title="Xác nhận tài liệu"
        open={openVerify}
        onCancel={() => setOpenVerify(false)}
        onClose={() => setOpenVerify(false)}
        onOk={() => setOpenVerify(false)}
        footer={false}
      >
        <div className="flex flex-col justify-between h-[200px]">
          <label>Mã OTP đã được gửi qua gmail của bạn</label>
          <span>Vui lòng nhập OTP</span>
          <Input
            placeholder="Vui lòng nhập mã xác thực"
            onChange={(e) => setOpt({ ...opt, otp: e.target.value })}
          />
          <Countdown
            value={deadline?.getTime()}
            onFinish={() => setOpenVerify(false)}
          />
          <Button
            onClick={async () => {
              const res = await verifyDocs(opt.idDocs, opt.otp);

              if (res.isSuccess) {
                setOpenVerify(false);
                setOpt({ ...opt, otp: "" });
                dispatch(
                  projectStateDetailActions.fetchDocs({
                    id: id,
                    filter: { pageNumber: 1, pageSize: 5 },
                  })
                );
              } else {
                messageError(res.message);
              }
            }}
            type="primary"
          >
            Xác nhận
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Docs;
