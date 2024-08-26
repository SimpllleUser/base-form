export enum ActionForm {
  Update = 'Update',
  Create = 'Create',
  None = 'None',
}
export interface FormParams {
  action?: ActionForm
}

export type OnSubmitPayload<T = unknown> = { value: T, isValid: boolean, action: ActionForm, isActionNone: boolean }
