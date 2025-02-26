import { ApiResult, ApiResultWithPagination, Filter } from "@/models/Common";
import { ConsultationStaff, ConsultationType } from "@/models/Consultation";
import { endPoint } from "@/utils/endPoint";
import http from "@/utils/http";

const getProjectForConsultation = async (
    filter: Filter
): Promise<ApiResultWithPagination<ConsultationType>> => {
    const response = await http.get(
        `${endPoint.consultation.getProjectForConsultation}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}`
    );
    return response;
};

const assignConsultant = async (projectId: string, staff: ConsultationStaff): Promise<ApiResult> => {
    const response = await http.post(
        endPoint.consultation.assignConsultant(projectId), staff
    );
    return response;
}

export { getProjectForConsultation, assignConsultant };
