export enum ActionForm {
  Update = 'Update',
  Create = 'Create',
  None = 'None',
}
export interface OnSubmitParams {
  isValid: boolean;
  action?: ActionForm
}

export interface FormParams {
  action?: ActionForm
}
