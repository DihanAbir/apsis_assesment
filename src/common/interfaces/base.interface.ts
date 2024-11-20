export interface IBase {
    readonly isActive?: boolean;
    readonly isDeleted?: boolean;
    readonly createdAt?: number;
    readonly createdBy?: string;
    readonly updatedAt?: number;
    readonly updatedBy?: string;
    readonly timezone?: string;
}
