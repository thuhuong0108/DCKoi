const baseURL = "https://kpcos.vinhuser.one/api/";
const socketURL = "http://34.81.244.146:3333";
const cloudinaryURL = "https://api.cloudinary.com/v1_1/dulapxpnp/upload";
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
    getPagingConstructionStaff: "/staff/constructor",
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
    getProject: (id: string) => `/projects/${id}`,
    assignConsultant: (id: string) => `/projects/${id}/assignconsultant`,
    getQuotation: (id: string) => `/projects/${id}/quotation`,
    getQuotationActive: (id: string) =>
      `/projects/${id}/quotation?Status=CONFIRMED`,
    requestProject: "/projects",
    getProjectDesign: `/projects/design`,
    getDesignOfProject: (id: string) =>
      `/projects/${id}/design?PageNumber=1&PageSize=100`,
    getcontractOfProject: (id: string) => `projects/${id}/contract`,
    getContractActive: (id: string) =>
      `/projects/${id}/contract??PageNumber=1&PageSize=100`,
    check3Dconfirm: (id: string) => `/projects/${id}/design/3d-confirmed`,
    getAllDesignForSpecificProject: (id: string) => `/projects/${id}/design`,
    getConstruction: (id: string) =>
      `/projects/${id}/construction?PageNumber=1&PageSize=100&SortColumn=estimateAt&SortDir=Asc`,
    getProjects: "/projects",
    getConstructor: (id: string) =>
      `/projects/${id}/staff?Position=CONSTRUCTOR`,
    getConstuctorTask: (id: string) => `/projects/${id}/construction-task`,
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
    postDesign: "/designs",
    getDesign: (id: string) => `/designs/${id}`,
    putDesign: (id: string) => `/designs/${id}`,
    rejectDesign: (id: string) => `/designs/${id}/reject`,
    acceptDesign: (id: string) => `/designs/${id}/accept`,
    requestEditDesign: (id: string) => `/designs/${id}/request-edit`,
  },

  construction: {
    createConstruction: "/constructions",
    getItembyIdItem: (id: string) => `/constructions/item/${id}`,
    getTaskbyIdItem: (id: string) =>
      `/constructions/task?ConstructionItemId=${id}`,
    createTaskwithIdItem: (id: string) => `/constructions/task/${id}`,
    getTaskById: (id: string) => `/constructions/task/${id}`,
    assignStaff: (id: string) => `/constructions/task/${id}`,
    confirmTask: (id: string) => `/constructions/task/${id}/confirm`,
  },

  contract: {
    createContract: "contracts",
    getContract: (id: string) => `contracts/${id}`,
    rejectContract: (id: string) => `contracts/${id}/reject`,
    acceptContract: (id: string) => `contracts/${id}/accept`,
    verifyContract: (id: string) => `contracts/${id}/verify`,
  },

  payment: {
    createPayment: "/payments",
    paymentCallback: "/payments/vnpay-callback",
    getPayment: (id: string) => `payments/${id}`,
  },
};

export { baseURL, endPoint, socketURL };
