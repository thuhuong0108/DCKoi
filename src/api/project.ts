import { ApiResult, ApiResultWithData, Filter } from "@/models/Common";
import { ProjectType } from "@/models/Project";
import { endPoint } from "@/utils/endPoint";
import http from "@/utils/http";

const createProject = async (project: ProjectType): Promise<ApiResult> => {
    const response = await http.post(endPoint.project.createProject, project);
    console.log(response);
    return response;
}

const getPagingProject = async (
    filter: Filter
): Promise<ApiResultWithData<ProjectType>> => {
    const response = await http.get(
        `${endPoint.project.getPagingProject}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}`
    );
    return response;
};

const getProjectById = async (id: string): Promise<ApiResultWithData<ProjectType>> => {
    const response = await http.get(
        endPoint.project.getProjectById(id)
    );
    return response;
};

export { createProject, getPagingProject, getProjectById };