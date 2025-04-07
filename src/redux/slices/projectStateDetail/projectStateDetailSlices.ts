import {
  ContractType,
  DesignType,
  IssueProjectType,
  TemplateConstructionItemType,
} from "@/models";
import { Filter, Pagination } from "@/models/Common";
import { DocsProjectType } from "@/models/DocsType";
import { ProjectStatus } from "@/models/enums/Status";
import { ProjectDetailType } from "@/models/ProjectType";
import { TaskType } from "@/models/TaskType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProjectStateDetail {
  project: {
    loading: boolean;
    detail: ProjectDetailType;
  };
  design: {
    loading: boolean;
    designs: DesignType[];
  };
  construction: {
    loading: boolean;
    constructions: TemplateConstructionItemType[];
  };

  contract: {
    loading: boolean;
    contracts: ContractType[];
  };
  task: {
    loading: boolean;
    tasks: Pagination<TaskType>;
  };
  issue: {
    loading: boolean;
    issues: IssueProjectType[];
  };
  docs: {
    loading: boolean;
    docs: Pagination<DocsProjectType>;
  };
}

const initialState: ProjectStateDetail = {
  project: {
    loading: false,
    detail: {
      id: "",
      name: "",
      address: "",
      area: 0,
      depth: 0,
      phone: "",
      customerName: "",
      staff: [],
      standOut: false,
      email: "",
      note: "",
      package: null,
      status: ProjectStatus.CONSTRUCTING,
    },
  },
  design: {
    loading: false,
    designs: [],
  },
  construction: {
    loading: false,
    constructions: [],
  },
  contract: {
    loading: false,
    contracts: [],
  },
  task: {
    loading: false,
    tasks: {
      data: [],
      pageNumber: 1,
      pageSize: 5,
      totalPages: 0,
      totalRecords: 0,
    },
  },
  issue: {
    loading: false,
    issues: [],
  },
  docs: {
    loading: false,
    docs: {
      data: [],
      pageNumber: 1,
      pageSize: 5,
      totalPages: 0,
      totalRecords: 0,
    },
  },
};

export const projectStateDetailSlice = createSlice({
  name: "projectStateDetail",
  initialState: initialState,
  reducers: {
    fetchProjectDetail(state, action: PayloadAction<string>) {
      state.project.loading = true;
    },
    fetchProjectDetailSuccess(state, action: PayloadAction<ProjectDetailType>) {
      state.project.detail = action.payload;
      state.project.loading = false;
    },
    fetchProjectDetailFailed(state) {
      state.project.loading = false;
    },
    fetchDesigns(state, action: PayloadAction<string>) {
      state.design.loading = true;
    },
    fetchDesignsSuccess(state, action: PayloadAction<DesignType[]>) {
      state.design.designs = action.payload;
      state.design.loading = false;
    },
    fetchDesignsFailed(state) {
      state.design.loading = false;
    },
    fetchConstructions(state, action: PayloadAction<string>) {
      state.construction.loading = true;
    },
    fetchConstructionsSuccess(
      state,
      action: PayloadAction<TemplateConstructionItemType[]>
    ) {
      state.construction.constructions = action.payload;
      state.construction.loading = false;
    },
    fetchConstructionsFailed(state) {
      state.construction.loading = false;
    },
    fetchContracts(state, action: PayloadAction<string>) {
      state.contract.loading = true;
    },
    fetchContractsSuccess(state, action: PayloadAction<ContractType[]>) {
      state.contract.contracts = action.payload;
      state.contract.loading = false;
    },
    fetchContractsFailed(state) {
      state.contract.loading = false;
    },
    fetchTasks(state, action: PayloadAction<{ id: string; filter: Filter }>) {
      state.task.loading = true;
    },
    fetchTasksSuccess(state, action: PayloadAction<Pagination<TaskType>>) {
      state.task.tasks = action.payload;
      state.task.loading = false;
    },
    fetchTasksFailed(state) {
      state.task.loading = false;
    },
    fetchIssues(state, action: PayloadAction<string>) {
      state.contract.loading = true;
    },
    fetchIssuesSuccess(state, action: PayloadAction<IssueProjectType[]>) {
      state.issue.issues = action.payload;
      state.issue.loading = false;
    },
    fetchIssuesFailed(state) {
      state.issue.loading = false;
    },
    fetchIssueConstructionItem(
      state,
      action: PayloadAction<{
        idProject: string;
        idConstructionItem: string;
      }>
    ) {
      state.issue.loading = true;
    },
    fetchDocs(state, action: PayloadAction<{ id: string; filter: Filter }>) {
      state.docs.loading = true;
    },
    fetchDocsSuccess(
      state,
      action: PayloadAction<Pagination<DocsProjectType>>
    ) {
      state.docs.docs = action.payload;
      state.docs.loading = false;
    },
    fetchDocsFailed(state) {
      state.docs.loading = false;
    },
    publicDesignSuccess(
      state,
      action: PayloadAction<{ id: string; isPublic: boolean }>
    ) {
      const index = state.design.designs.findIndex(
        (design) => design.id === action.payload.id
      );
      if (index !== -1) {
        state.design.designs[index].isPublic = action.payload.isPublic;
      }
    },
  },
});

export const projectStateDetailActions = projectStateDetailSlice.actions;

export default projectStateDetailSlice.reducer;
