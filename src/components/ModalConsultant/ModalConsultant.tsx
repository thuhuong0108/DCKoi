import { ConsultationStaff } from "@/models/Consultation";
import { consultantAvailableActions, selectConsultantAvailable, selectLoading } from "@/redux/slices/consultantAvailable/consultantAvailableSlice";
import { consultationActions } from "@/redux/slices/consultation/consultationSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { Modal } from "antd";
import { useEffect } from "react";

const ModalConsultant = ({ isOpen, onClose, projectId }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectLoading);
  const consultantAvailable = useAppSelector(selectConsultantAvailable);

  useEffect(() => {
    dispatch(consultantAvailableActions.fetchConsultantAvailable(
      { pageNumber: 1, pageSize: 10 }
    ));
  }, []);

  const handleAssignConsultant = (staff: ConsultationStaff) => {
    dispatch(consultationActions.assignConsultant({ projectId, staff }));
    onClose();
  };

  return (
    <div>
      <Modal title="Consultant" loading={isLoading} open={isOpen} onCancel={onClose} footer={null}>
        <div className="p-4">
          {consultantAvailable.data.length === 0 ? (
            <p>No consultants available</p>
          ) : (
            <ul className="space-y-2">
              {consultantAvailable.data.map((consultant) => (
                <li key={consultant.id} className="flex justify-between items-center border-b p-2">
                  <span>{consultant.fullName}</span>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => handleAssignConsultant({ staffId: consultant.id })}>
                    Add
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default ModalConsultant;
