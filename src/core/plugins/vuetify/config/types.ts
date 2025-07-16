export enum VuetifyVariant {
  FILLED = 'filled',
  OUTLINED = 'outlined',
  PLAIN = 'plain',
  UNDERLINED = 'underlined',
  SOLO = 'solo',
  SOLO_INVERTED = 'solo-inverted',
  SOLO_FILLED = 'solo-filled'
}

export enum VuetifyDensity {
  DEFAULT = 'default',
  COMFORTABLE = 'comfortable',
  COMPACT = 'compact'
}

export enum VuetifyColor {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  SURFACE = 'surface',
  SURFACE_VARIANT = 'surface-variant',
  ON_SURFACE = 'on-surface',
  ON_SURFACE_VARIANT = 'on-surface-variant'
}

export enum VuetifyRounded {
  NONE = 0,
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  PILL = 'pill',
  CIRCLE = 'circle'
}

// types/form-config.ts
export interface VuetifyBaseStyles {
  variant?: VuetifyVariant;
  density?: VuetifyDensity;
  flat?: boolean;
  rounded?: VuetifyRounded | boolean | string | number;
  color?: VuetifyColor | string;
  bgColor?: VuetifyColor | string;
}

export type FormInputType =
  | 'textField'
  | 'textarea'
  | 'select'
  | 'autocomplete'
  | 'combobox'
  | 'checkbox'
  | 'radio'
  | 'switch'
  | 'fileInput'
  | 'slider'
  | 'rangeSlider'
  | 'rating'
  | 'otp'
  | 'datePicker'
  | 'timePicker'
  | 'colorPicker';

export interface FormInputsConfig {
  global: VuetifyBaseStyles;
  textField: VuetifyBaseStyles;
  textarea: VuetifyBaseStyles;
  select: VuetifyBaseStyles;
  autocomplete: VuetifyBaseStyles;
  combobox: VuetifyBaseStyles;
  checkbox: VuetifyBaseStyles;
  radio: VuetifyBaseStyles;
  switch: VuetifyBaseStyles;
  fileInput: VuetifyBaseStyles;
  slider: VuetifyBaseStyles;
  rangeSlider: VuetifyBaseStyles;
  rating: VuetifyBaseStyles;
  otp: VuetifyBaseStyles;
  datePicker: VuetifyBaseStyles;
  timePicker: VuetifyBaseStyles;
  colorPicker: VuetifyBaseStyles;
}
