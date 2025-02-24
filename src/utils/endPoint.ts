import { templateConstructionActions } from "@/redux/slices/templateConstruction/templateContrutionSlices";
import { create } from "@mui/material/styles/createTransitions";

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
};

export { baseURL, endPoint, socketURL };
