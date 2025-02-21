const baseURL = "https://kpcos.vinhuser.one/api/";
const socketURL = "http://34.81.244.146:3333";
const endPoint = {
  auth: {
    login: "/auth/signin",
  },
  packageItem: {
    getPagingPackageItem: "/packageitems",
  },
};

export { baseURL, endPoint, socketURL };
