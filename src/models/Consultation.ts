export interface ConsultationType {
    id: string,
    customerName: string,
    address: string,
    phone: string,
    email: string,
    area: number,
    depth: number,
    packageName: string,
    standOut: boolean,
    note: string,
    status: string
}

export interface ConsultationStaff {
    staffId: string
}