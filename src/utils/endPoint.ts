import { assignConsultant } from "@/api/project";

const baseURL = "https://kpcos.vinhuser.one/api/";
const socketURL = "http://34.81.244.146:3333";
const endPoint = {
  auth: {
    login: "/auth/signin",
  },
  packageItem: {
    createPackageItem: "/packageitems",
    getPagingPackageItem: "/packageitems",
    getPackageItem: (id: string) => `/packageitems/${id}`,
    updatePackageItem: (id: string) => `/packageitems/${id}`,
    deletePackageItem: (id: string) => `/packageitems/${id}`,
  },

  equipment: {
    createEquipment: "/equipments",
    getPagingEquipment: "/equipments",
    getEquipment: (id: string) => `/equipments/${id}`,
    updateEquipment: (id: string) => `/equipments/${id}`,
    deleteEquipment: (id: string) => `/equipments/${id}`,
  },

  service: {
    createService: "/services",
    getPagingService: "/services",
    getService: (id: string) => `/services/${id}`,
    updateService: (id: string) => `/services/${id}`,
    deleteService: (id: string) => `services/${id}`,
  },

  staff: {
    createStaff: "/staff",
    getPagingStaff: "/staff",
    getPagingConsutanStaff: "/staff/consultant",
    getPagingManagerStaff: "/staff/manager",
    getPagingDesignerStaff: "/staff/designer",
    // getStaff: (id: string) => `/staff/${id}`,
    // updateStaff: (id: string) => `/staff/${id}`,
    // deleteStaff: (id: string) => `staff/${id}`,
  },

  package: {
    createPackage: "/packages",
    getPagingPackage: "/packages",
    getPackage: (id: string) => `/packages/${id}`,
    updatePackage: (id: string) => `/packages/${id}`,
    deletePackage: (id: string) => `/packages/${id}`,
  },

  templateConstruction: {
    createTemplateConstruction: "/templatecontructions",
    getTemplateConstructions: "/templatecontructions",
    getTemplateConstruction: (id: string) => `/templatecontructions/${id}`,
    createTemplateConstructionItem: "/templatecontructions/items",
  },

  project: {
    createProject: "/projects",
    getPagingProjects: "/projects/consultation",
    // getPagingProjects: "/projects               ",
    getProject: (id: string) => `/projects/${id}`,
    assignConsultant: (id: string) => `/projects/${id}/assignconsultant`,
    getQuotation: (id: string) => `/projects/${id}/quotation`,
    requestProject: "/projects",
    getProjectDesign: `/projects/design`,
  },

  quotation: {
    createQuotation: "/quotation",
    getAllQuotation: "/quotation",
    getQuotationDetail: (id: string) => `/quotation/${id}`,
    rejectQuotation: (id: string) => `/quotation/${id}/reject-accept`,
    approveQuotation: (id: string) => `/quotation/${id}/approve-edit`,
    editQuotation: (id: string) => `/quotation/${id}/edit`,
    rewriteQuotation: (id: string) => `/quotation/${id}/rewrite`,
  },

  design: {
    getDesign: (id: string) => `/design/${id}`,
  }
};

export { baseURL, endPoint, socketURL };
