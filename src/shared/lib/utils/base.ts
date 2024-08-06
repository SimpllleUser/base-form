export const isBoolean = (value: unknown): boolean => {
  if (typeof value !== 'string') {
    return false;
  }
  return value === 'true' || value === 'false';
};

export const isString = (value: unknown): boolean => typeof value === 'string';
