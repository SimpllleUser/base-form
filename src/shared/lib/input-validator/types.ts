// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type ValidationFunction = (...params: any) => boolean | string;

export enum ValidationRule {
  After = 'after',
  Alpha = 'alpha',
  AlphaDash = 'alpha_dash',
  AlphaNum = 'alpha_num',
  AlphaSpaces = 'alpha_spaces',
  Before = 'before',
  Between = 'between',
  Confirmed = 'confirmed',
  CreditCard = 'credit_card',
  DateBetween = 'date_between',
  Decimal = 'decimal',
  Digits = 'digits',
  Image = 'image',
  Included = 'included',
  Integer = 'integer',
  IP = 'ip',
  IPOrFQDN = 'ip_or_fqdn',
  Is = 'is',
  IsNot = 'is_not',
  Length = 'length',
  Max = 'max',
  Min = 'min',
  Mimes = 'mimes',
  Numeric = 'numeric',
  Regex = 'regex',
  Required = 'required',
  RequiredIf = 'required_if',
  Size = 'size',
  URL = 'url'
}
