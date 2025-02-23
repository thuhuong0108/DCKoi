
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
  project: {
    getPagingProject: "/projects",
    getProjectById: (id: string) => `/projects/${id}`,
    createProject: "/projects",
  },
  package: {
    getPagingPackage: "/packages",
    createPackage: "/packages",
    getPackage: (id: string) => `packages/${id}`,
    updatePackage: (id: string) => `packages/${id}`,
    deletePackage: (id: string) => `packages/${id}`
  }
};

export { baseURL, endPoint, socketURL };
