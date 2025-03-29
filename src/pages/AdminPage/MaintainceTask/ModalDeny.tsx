import { updateMaintenancesTask } from "@/api/maintennances";
import { messageError } from "@/components";
import useForm from "@/hooks/useForm";
import { maintainceTaskActions } from "@/redux/slices/maintenanceTask/maintenanceTaskSlices";
import { useAppDispatch } from "@/redux/store/hook";
import { validateDeny } from "@/validations/validate";
import { Form, Input, Modal } from "antd";
import React from "react";

const ModalDeny = ({
  idTask,
  idParent,
  visible,
  setVisible,
}: {
  idTask: string;
  idParent: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const { formik, loading, regField, regHandleSubmit } = useForm({
    onSubmit: async (values) => {
      const res = await updateMaintenancesTask(idTask, {
        reason: values.reason,
      });
      if (res.isSuccess) {
        setVisible(false);
        dispatch(maintainceTaskActions.fetchChildTask(idParent));
      } else {
        messageError(res.message);
      }
    },
    values: {
      reason: "",
    },
    validationSchema: validateDeny,
  });
  return (
    <Modal
      visible={visible}
      onCancel={() => setVisible(false)}
      onOk={regHandleSubmit}
      confirmLoading={loading}
      title="Từ chối công việc"
    >
      <Form layout="vertical">
        <Form.Item
          label="Lý do từ chối"
          help={regField("reason").error}
          validateStatus={regField("reason").error ? "error" : "success"}
        >
          <Input {...regField("reason")} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalDeny;
