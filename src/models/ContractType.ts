export interface ContractType {
    id?: string;
    projectId: string;
    quotationId: string;
    name: string;
    contractValue: number;
    url: string;
    note?: string;
}

export interface ContractOTP {
    otpCode: string;
}