const baseURL = "https://kpcos.vinhuser.one/api/";
// const baseURL = "http://localhost:5113/api/";
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
    activeTemplateConstructionDetail: (id: string) =>
      `/templatecontructions/${id}/active`,
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
    getIssuesProject: (id: string) => `/projects/${id}/project-issue`,
    getDocs: (id: string) => `/projects/${id}/docs`,
    finish: (id: string) => `/projects/${id}/finish`,
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

  issue: {
    createIssue: (id: string) => `project-issues/${id}`,
    updateIssue: (id: string) => `project-issues/${id}`,
    deleteIssue: (id: string) => `project-issues/images/${id}`,
    confirmIssue: (id: string) => `project-issues/${id}/confirm`,
  },

  issueType: {
    createIssueType: "issuetype",
    getAllIssueType: `issuetype`,
    updateIssueType: (id: string) => `issuetype/${id}`,
    deleteIssueType: (id: string) => `issuetype/${id}`,
  },

  holiday: {
    getHolidays: "/holiday",
  },

  maintancePackage: {
    getMaintancePackage: "/maintenance-packages",
  },
  maintenances: {
    maintenances: "/maintenances",
    getMaintenancesById: (id: string) => `/maintenances/${id}`,
    updateMaintenancesTask: (id: string) => `/maintenances/tasks/${id}`,
    getTasks: `/maintenances/task`,
    getTask: (id: string) => `/maintenances/tasks/${id}`,
  },

  docsType: {
    getDocsType: "/docstype",
  },
  feedback: {
    createFeedback: "/feedbacks",
    getFeedback: "/feedbacks",
    getFeedbackById: (id: string) => `/feedbacks/${id}`,
    updateFeedback: (id: string) => `/feedbacks/${id}`,
    deleteFeedback: (id: string) => `/feedbacks/${id}`,
  },
  docs: {
    getDocs: "/docs",
    postDocs: "/docs",
    acceptDocs: (id: string) => `/docs/${id}/accept`,
    verifyDocs: (id: string) => `/docs/${id}/verify`,
  },
  blogs: {
    getBlogs: "/blogs",
    getBlog: (id: string) => `/blogs/${id}`,
    createBlog: "/blogs",
    updateBlog: (id: string) => `/blogs/${id}`,
    deleteBlog: (id: string) => `/blogs/${id}`,
  },
};

export { baseURL, endPoint, socketURL };
