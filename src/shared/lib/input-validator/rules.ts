import { type ValidationFunction, ValidationRule } from './types';

export const rules: { [key in ValidationRule]?: ValidationFunction } = {
  [ValidationRule.After](value: string, referenceDate: string): boolean | string {
    return new Date(value) > new Date(referenceDate) || `Дата должна быть после ${referenceDate}`;
  },

  [ValidationRule.Alpha](value: string): boolean | string {
    return /^[A-Za-zА-Яа-яЁё]+$/.test(value) || 'Только буквы допустимы';
  },

  [ValidationRule.AlphaDash](value: string): boolean | string {
    return /^[A-Za-zА-Яа-яЁё0-9_-]+$/.test(value) || 'Разрешены только буквы, цифры, дефисы и подчеркивания';
  },

  [ValidationRule.AlphaNum](value: string): boolean | string {
    return /^[A-Za-zА-Яа-яЁё0-9]+$/.test(value) || 'Разрешены только буквы и цифры';
  },

  [ValidationRule.AlphaSpaces](value: string): boolean | string {
    return /^[A-Za-zА-Яа-яЁё\s]+$/.test(value) || 'Разрешены только буквы и пробелы';
  },

  [ValidationRule.Before](value: string, referenceDate: string): boolean | string {
    return new Date(value) < new Date(referenceDate) || `Дата должна быть до ${referenceDate}`;
  },

  [ValidationRule.Between](value: string, min: string, max: string): boolean | string {
    const actualValue = Number(value);
    return (actualValue >= Number(min) && actualValue <= Number(max)) || `Значение должно быть между ${min} и ${max}`;
  },

  [ValidationRule.Confirmed](value: string, confirmedValue: string): boolean | string {
    return value === confirmedValue || 'Значения не совпадают';
  },

  [ValidationRule.CreditCard](value: string): boolean | string {
    return /^\d{4}-\d{4}-\d{4}-\d{4}$/.test(value) || 'Неверный формат номера кредитной карты';
  },

  [ValidationRule.DateBetween](value: string, startDate: string, endDate: string): boolean | string {
    return (
      new Date(value) >= new Date(startDate) && new Date(value) <= new Date(endDate)
    ) || `Дата должна быть между ${startDate} и ${endDate}`;
  },

  [ValidationRule.Decimal](value: string): boolean | string {
    return /^\d+(\.\d{1,2})?$/.test(value) || 'Неверный формат числа';
  },

  [ValidationRule.Digits](value: string): boolean | string {
    return /^\d+$/.test(value) || 'Только цифры допустимы';
  },

  [ValidationRule.Image](file: File): boolean | string {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const extension = file.name.split('.').pop()?.toLowerCase();
    return allowedExtensions.includes(extension || '') || 'Разрешены только файлы изображений (jpg, jpeg, png, gif)';
  },

  [ValidationRule.Included](value: string, list: string[]): boolean | string {
    return list.includes(value) || 'Значение не включено в список';
  },

  [ValidationRule.Integer](value: string): boolean | string {
    return Number.isInteger(Number(value)) || 'Должно быть целым числом';
  },

  [ValidationRule.IP](value: string): boolean | string {
    return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(value) || 'Неверный формат IP-адреса';
  },

  [ValidationRule.IPOrFQDN](value: string): boolean | string {
    const ipRegex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return ipRegex.test(value) || domainRegex.test(value) || 'Неверный формат IP-адреса или доменного имени';
  },

  [ValidationRule.Is](value: string, comparisonValue: string): boolean | string {
    return value === comparisonValue || 'Значение не соответствует требуемому';
  },

  [ValidationRule.IsNot](value: string, comparisonValue: string): boolean | string {
    return value !== comparisonValue || 'Значение совпадает с запрещенным';
  },

  [ValidationRule.Length](value: string, length: string | number): boolean | string {
    return value.length === Number(length) || `Длина должна быть равной ${length}`;
  },

  [ValidationRule.Max](value: number, maxValue: number): boolean | string {
    return value <= maxValue || `Значение должно быть меньше или равно ${maxValue}`;
  },

  [ValidationRule.Min](value: number, minValue: number): boolean | string {
    return value >= minValue || `Значение должно быть больше или равно ${minValue}`;
  },

  [ValidationRule.Mimes](file: File, types: string): boolean | string {
    const allowedTypes = types.split(',');
    const extension = file.name.split('.').pop()?.toLowerCase();
    return (
      allowedTypes.includes(file.type) || allowedTypes.includes(extension || '') || `Допустимые типы файлов: ${types}`
    );
  },

  [ValidationRule.Numeric](value: string): boolean | string {
    return (!Number.isNaN(parseFloat(value)) && Number.isFinite(Number(value))) || 'Должно быть числом';
  },

  [ValidationRule.Regex](value: string, regex: RegExp): boolean | string {
    return regex.test(value) || 'Неверный формат';
  },

  [ValidationRule.Required](value: string): boolean | string {
    return !!value || 'Обязательное поле';
  },

  [ValidationRule.RequiredIf](value: string, conditionValue: boolean): boolean | string {
    return conditionValue ? !!value || 'Обязательное поле' : true;
  },

  [ValidationRule.Size](file: File, maxSize: number): boolean | string {
    return file.size <= maxSize || `Размер файла должен быть не более ${maxSize} байт`;
  },

  [ValidationRule.URL](value: string): boolean | string {
    return /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\\/?%&=]*)?$/.test(value) || 'Неверный формат URL-адреса';
  },
};
