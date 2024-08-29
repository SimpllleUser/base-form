export type ValidationResult = boolean | string;

export interface ValidationParams {
  after: string;
  alpha?: ''
  alphaDash?: ''
  alphaNum?: ''
  alphaSpaces: string,
  before: string
  between: { min: string; max: string }
  confirmed?: string
  creditCard: { startDate: string; endDate: string }
  dateBetween?: string
  decimal?: string
  digits: File
  image: string[]
  included?: string
  integer?: string
  ip?: string
  ipOrFqdn: string
  is: string
  isNot: string | number
  length: number
  max: number
  min: number
  mimes?: string
  numeric: RegExp
  regex?: string
  required: boolean
  requiredIf: boolean
  size: { value: string }
}

export interface ValidationFunctionMap {
  after: (args: { value: string; after: string }) => ValidationResult;
  alpha: (args: { value: string }) => ValidationResult;
  alphaDash: (args: { value: string }) => ValidationResult;
  alphaNum: (args: { value: string }) => ValidationResult;
  alphaSpaces: (args: { value: string }) => ValidationResult;
  before: (args: { value: string; before: string }) => ValidationResult;
  between: (args: { value: string; min: string; max: string }) => ValidationResult;
  confirmed: (args: { value: string; confirmed: string }) => ValidationResult;
  creditCard: (args: { value: string }) => ValidationResult;
  dateBetween: (args: { value: string; startDate: string; endDate: string }) => ValidationResult;
  decimal: (args: { value: string }) => ValidationResult;
  digits: (args: { value: string }) => ValidationResult;
  image: (args: { value: File }) => ValidationResult;
  included: (args: { value: string; list: string[] }) => ValidationResult;
  integer: (args: { value: string | number }) => ValidationResult;
  ip: (args: { value: string }) => ValidationResult;
  ipOrFqdn: (args: { value: string }) => ValidationResult;
  is: (args: { value: string; is: string }) => ValidationResult;
  isNot: (args: { value: string; isNot: string }) => ValidationResult;
  length: (args: { value: string; length: number }) => ValidationResult;
  max: (args: { value: number | string; max: number }) => ValidationResult;
  min: (args: { value: number | string; min: number }) => ValidationResult;
  mimes: (args: { value: File; mimes: string }) => ValidationResult;
  numeric: (args: { value: string }) => ValidationResult;
  regex: (args: { value: string; regex: RegExp }) => ValidationResult;
  required: (args: { value: string }) => ValidationResult;
  requiredIf: (args: { value: string; requiredIf: boolean }) => ValidationResult;
  size: (args: { value: File; size: number }) => ValidationResult;
  url: (args: { value: string }) => ValidationResult;
}

export type DefaultParam<T = string> = { value: T }
export type DefaultParamWith<T> = DefaultParam & T;
