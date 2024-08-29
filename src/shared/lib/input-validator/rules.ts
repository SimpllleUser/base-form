import {
  DefaultParam,
  DefaultParamWith,
  ValidationFunctionMap,
  ValidationResult,
} from './types';

export const rules: ValidationFunctionMap = {
  after: (
    {
      value,
      after,
    }: DefaultParamWith <{ after: string }>,
  ): ValidationResult => new Date(value) > new Date(after) || `Дата должна быть после ${after}`,

  alpha: (
    { value }: DefaultParam,
  ): ValidationResult => /^[A-Za-zА-Яа-яЁё]+$/.test(value) || 'Только буквы допустимы',

  alphaDash: ({
    value,
  }: DefaultParam) => /^[A-Za-zА-Яа-яЁё0-9_-]+$/.test(value) || 'Разрешены только буквы, цифры, дефисы и подчеркивания',

  alphaNum: (
    { value }: DefaultParam,
  ): ValidationResult => /^[A-Za-zА-Яа-яЁё0-9]+$/.test(value) || 'Разрешены только буквы и цифры',

  alphaSpaces: (
    { value }: DefaultParam,
  ): ValidationResult => /^[A-Za-zА-Яа-яЁё\s]+$/.test(value) || 'Разрешены только буквы и пробелы',

  before: ({
    value,
    before,
  }: DefaultParamWith<{ before: string }>) => new Date(value) < new Date(before) || `Дата должна быть до ${before}`,

  between: ({ value, min, max }: DefaultParamWith<{ min: number | string; max: number | string }>) => {
    const actualValue = Number(value);
    return (actualValue >= Number(min) && actualValue <= Number(max)) || `Значение должно быть между ${min} и ${max}`;
  },

  confirmed: (
    {
      value,
      confirmed,
    }: DefaultParamWith<{ confirmed: string }>,
  ) => value === confirmed || 'Значения не совпадают',

  creditCard: (
    { value }: DefaultParam,
  ) => /^\d{4}-\d{4}-\d{4}-\d{4}$/.test(value) || 'Неверный формат номера кредитной карты',

  dateBetween: ({ value, startDate, endDate }: DefaultParamWith<{startDate: string, endDate: string}>) => (
    new Date(value) >= new Date(startDate) && new Date(value) <= new Date(endDate)
  ) || `Дата должна быть между ${startDate} и ${endDate}`,

  decimal: ({ value }: DefaultParam): ValidationResult => /^\d+(\.\d{1,2})?$/.test(value) || 'Неверный формат числа',

  digits: ({ value }: DefaultParam): ValidationResult => /^\d+$/.test(value) || 'Только цифры допустимы',

  image: ({ value }: { value: File }): ValidationResult => {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const extension = value.name.split('.').pop()?.toLowerCase();
    return allowedExtensions
      .includes(extension || '') || 'Разрешены только файлы изображений (jpg, jpeg, png, gif)';
  },

  included: ({
    value,
    list,
  }: DefaultParamWith<{ list: Array<string> }>): ValidationResult => list.includes(value) || 'Значение не включено в список',

  integer: ({
    value,
  }: DefaultParam<string | number>): ValidationResult => Number.isInteger(Number(value)) || 'Должно быть целым числом',

  ip: ({ value }: DefaultParam) => /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(value) || 'Неверный формат IP-адреса',

  ipOrFqdn: ({ value }: DefaultParam): ValidationResult => {
    const ipRegex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return ipRegex.test(value) || domainRegex.test(value) || 'Неверный формат IP-адреса или доменного имени';
  },

  is: ({
    value,
    is,
  }: DefaultParamWith<{ is: string }>): ValidationResult => value === is || 'Значение не соответствует требуемому',

  isNot: ({ value, isNot }: DefaultParamWith<{ isNot: string }>) => value !== isNot || 'Значение совпадает с запрещенным',

  length: ({
    value,
    length,
  }: DefaultParamWith<{ length: number }>): ValidationResult => value
    .length === Number(length) || `Длина должна быть равной ${length}`,

  max: ({
    value,
    max,
  }: DefaultParam<string | number> & { max: number
  }) => Number(value) <= max || `Значение должно быть меньше или равно ${max}`,

  min: ({
    value,
    min,
  }: DefaultParam<string | number> & { min: number}) => value >= min || `Значение должно быть больше или равно ${min}`,

  mimes: ({ value, mimes }: DefaultParam<File> & {mimes: string }) => {
    const allowedTypes = mimes.split(',');
    const extension = value.name.split('.').pop()?.toLowerCase();
    return (
      allowedTypes.includes(value.type) || allowedTypes.includes(extension || '') || `Допустимые типы файлов: ${mimes}`
    );
  },

  numeric: ({
    value,
  }: DefaultParam<string>): ValidationResult => (!Number
    .isNaN(parseFloat(value)) && Number.isFinite(Number(value))) || 'Должно быть числом',

  regex: ({ value, regex }: DefaultParamWith<{ regex: RegExp }>): ValidationResult => regex.test(value) || 'Неверный формат',

  required: ({ value }: DefaultParam): ValidationResult => !!value || 'Обязательное поле',

  requiredIf: ({
    value,
    requiredIf,
  }: DefaultParamWith<{ requiredIf: boolean }>): ValidationResult => (requiredIf ? !!value || 'Обязательное поле' : true),

  size: ({
    value,
    size,
  }: DefaultParam<File> & { size: number }) => value.size <= size || `Размер файла должен быть не более ${size} байт`,

  url: ({
    value,
  }: DefaultParam): ValidationResult => /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\\/?%&=]*)?$/
    .test(value) || 'Неверный формат URL-адреса',
};
