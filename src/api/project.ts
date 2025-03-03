import http from "@/utils/http";
import { ProjectRequest } from "@/models";
import {
  ApiResult,
  ApiResultWithAData,
  ApiResultWithData,
  ApiResultWithPagination,
} from "./../models/Common";
import { Filter } from "@/models/Common";
import { endPoint } from "@/utils/endPoint";
import {
  ProjectDetailType,
  ProjectType,
  QuotationProjectType,
} from "@/models/ProjectType";
import { ProjectStatus, QuotationStatus } from "@/models/enums/Status";
import { Position } from "@/models/enums/Position";

// const getPagingProject = async (
//   filter: Filter
// ): Promise<ApiResultWithPagination<ProjectType>> => {
//     const response = await http.get(
//       `${endPoint.project.getPagingProjects}?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}`
//     );

//     return response;
// };

// const getProject = async (
//     id: string
//   ): Promise<ApiResultWithData<ProjectDetailType>> => {
//     const response = await http.get(endPoint.project.getProject(id));

//     return response;
//   };

//   const createProject = async (
//     item: ProjectType
//   ): Promise<ApiResult> => {
//     const response = await http.post(
//       endPoint.project.createProject,
//       item
//     );
//     return response;
//   };

//   const assignConsultant = async (projectId: string): Promise<ApiResult> => {
//     const response = await http.post(
//       endPoint.project.assignConsultant(projectId)
//     );
//     return response;
//   };

//   const getQuotationProject = async (
//     projectId: string
//   ): Promise<ApiResultWithData<QuotationProjectType>> => {
//     const response = await http.get(endPoint.project.getQuotation(projectId));

//     return response;
//   };

const getPagingProject = async (
  filter: Filter
): Promise<ApiResultWithPagination<ProjectType>> => {
  const res: ApiResultWithPagination<ProjectType> = {
    isSuccess: true,
    pageNumber: filter.pageNumber,
    pageSize: filter.pageSize,
    totalPages: 20,
    totalRecords: 20,
    message: "",
    statusCode: 1,
    data: [
      {
        id: "21313123",
        address: "123 Example St.",
        customerName: "John Doe",
        phone: "123-456-7890",
        email: "johndoe@example.com",
        area: 250,
        depth: 10,
        packageName: "Premium Package",
        standOut: true,
        note: "High priority project.",
        status: ProjectStatus.REQUESTING,
        createdDate: "01/01/2025",
        updatedDate: "01/01/2025",
      },
    ],
  };
  return res;
};

const getProject = async (
  projectId: string
): Promise<ApiResultWithAData<ProjectDetailType>> => {
  const res: ApiResultWithAData<ProjectDetailType> = {
    isSuccess: true,
    statusCode: 1,
    message: "",
    data: {
      id: projectId,
      customerName: "John Doe",
      address:
        "Số nhà 123/45/67, đường Nguyễn Văn Cừ, tổ dân phố số 5, thôn Đại Hưng, xã Thịnh Quang, huyện Mê Linh, thành phố Hà Nội, Việt Nam.",
      phone: "123-456-7890",
      email: "johndoe@example.com",
      area: 250,
      depth: 10,
      packageName: "Premium Package",
      standOut: true,
      note: "Quá trình thi công hồ cá koi yêu cầu sự chuẩn bị kỹ lưỡng và tuân thủ các bước chi tiết để đảm bảo hồ cá hoạt động tốt và môi trường sống của cá koi luôn được duy trì ổn định. Đầu tiên, cần kiểm tra địa điểm thi công để xác định độ sâu và diện tích phù hợp cho hồ, đồng thời phải bảo đảm rằng vị trí không bị ảnh hưởng bởi yếu tố bên ngoài như ánh sáng mặt trời quá mức hay gió mạnh. Sau khi đã xác định vị trí, tiến hành đào móng và xây dựng phần nền móng vững chắc, đồng thời lắp đặt hệ thống lọc và máy bơm để đảm bảo chất lượng nước trong hồ luôn được làm sạch và tuần hoàn.",
      status: ProjectStatus.REQUESTING,
      createdDate: "01/01/2025",
      updatedDate: "01/01/2025",

      staff: [
        {
          id: "1",
          fullName: "Staff 1",
          email: "staff@gmail.com",
          position: Position.CONSULTANT,
        },
      ],
      packageDetail: {
        id: "1",
        name: "Package 1",
        description: "Description 1",
        isActive: true,
        price: [100, 200, 300],
        items: [
          {
            idPackageItem: "1",
            quantity: 1,
            description: "description 11",
            name: "package item 1",
          },
          {
            idPackageItem: "2",
            quantity: 1,
            description: "description 11",
            name: "package item 1",
          },
          {
            idPackageItem: "3",
            quantity: 1,
            description: "description 11",
            name: "package item 1",
          },
          {
            idPackageItem: "4",
            quantity: 1,
            description: "description 11",
            name: "package item 1",
          },
          {
            idPackageItem: "5",
            quantity: 1,
            description: "description 11",
            name: "package item 1",
          },
          {
            idPackageItem: "6",
            quantity: 1,
            description: "description 11",
            name: "package item 1",
          },
          {
            idPackageItem: "7",
            quantity: 1,
            description: "description 11",
            name: "package item 1",
          },
          {
            idPackageItem: "8",
            quantity: 1,
            description: "description 11",
            name: "package item 1",
          },
          {
            idPackageItem: "9",
            quantity: 1,
            description: "description 11",
            name: "package item 1",
          },
          {
            idPackageItem: "10",
            quantity: 1,
            description: "description 11",
            name: "package item 1",
          },
        ],
      },
    },
  };

  console.log("res: ", res);

  return res;
};

const assignConsultant = async (projectId: string): Promise<ApiResult> => {
  const response = await http.post(
    endPoint.project.assignConsultant(projectId)
  );
  return response;
};

const getQuotationProject = async (
  projectId: string
): Promise<ApiResultWithData<QuotationProjectType>> => {
  const response: ApiResultWithPagination<QuotationProjectType> = {
    isSuccess: true,
    statusCode: 1,
    message: "",
    data: [
      {
        id: "1",
        projectId: projectId,
        templateConstructionId: "1",
        version: 1,
        createdDate: "01/01/2025",
        updatedDate: "01/01/2025",
        status: QuotationStatus.OPEN,
        reason: "reason",
      },
      {
        id: "2",
        projectId: projectId,
        templateConstructionId: "1",
        version: 2,
        createdDate: "01/01/2025",
        updatedDate: "01/01/2025",
        status: QuotationStatus.OPEN,
        reason:
          "Quá trình thi công hồ cá koi yêu cầu sự chuẩn bị kỹ lưỡng và tuân thủ các bước chi tiết để đảm bảo hồ cá hoạt động tốt và môi trường sống của cá koi luôn được duy trì ổn định. Đầu tiên, cần kiểm tra địa điểm thi công để xác định độ sâu và diện tích phù hợp cho hồ, đồng thời phải bảo đảm rằng vị trí không bị ảnh hưởng bởi yếu tố bên ngoài như ánh sáng mặt trời quá mức hay gió mạnh. Sau khi đã xác định vị trí, tiến hành đào móng và xây dựng phần nền móng vững chắc, đồng thời lắp đặt hệ thống lọc và máy bơm để đảm bảo chất lượng nước trong hồ luôn được làm sạch và tuần hoàn.",
      },
    ],
    pageNumber: 1,
    pageSize: 10,
    totalPages: 1,
    totalRecords: 2,
  };

  return response;
};
const requestProject = async (request: ProjectRequest): Promise<ApiResult> => {
  const response = await http.post(endPoint.project.requestProject, request);
  return response;
};

export {
  getPagingProject,
  getProject,
  assignConsultant,
  getQuotationProject,
  requestProject,
};
