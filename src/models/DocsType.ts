export interface DocsType {
  id: string;
  name: string;
}

export interface DocsProjectType {
  id: string;
  name: string;
  url: string;
  status: string;
  docType: {
    id: string;
    name: string;
  };
}
