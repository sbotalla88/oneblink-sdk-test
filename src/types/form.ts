export interface IFormCreationParam {
    name?: string;
    formsAppEnvironmentId?: number;
    description?: string;
    organisationId?: string;
    elements?: any[];
    isAuthenticated?: boolean;
    submissionEvents?: any[];
    postSubmissionAction?: string;
    formsAppIds?: number[];
}
export interface IFormUpdateParam extends IFormCreationParam {
    id: number;
}