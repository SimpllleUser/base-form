import {
  FormInputsConfig,
  VuetifyBaseStyles,
  VuetifyColor,
  VuetifyDensity,
  VuetifyRounded,
  VuetifyVariant
} from './types';

export const vuetifyFormStylesConfig: FormInputsConfig = {
  global: {
    variant: VuetifyVariant.OUTLINED,
    density: VuetifyDensity.DEFAULT,
    flat: false,
    rounded: VuetifyRounded.SM,
    color: VuetifyColor.SUCCESS
  },

  textField: {
    variant: VuetifyVariant.OUTLINED,
    density: VuetifyDensity.DEFAULT,
    flat: false,
    rounded: VuetifyRounded.SM,
    color: VuetifyColor.PRIMARY
  },

  textarea: {
    variant: VuetifyVariant.OUTLINED,
    density: VuetifyDensity.DEFAULT,
    flat: false,
    rounded: VuetifyRounded.SM,
    color: VuetifyColor.PRIMARY
  },

  select: {
    variant: VuetifyVariant.OUTLINED,
    density: VuetifyDensity.DEFAULT,
    flat: false,
    rounded: VuetifyRounded.SM,
    color: VuetifyColor.PRIMARY
  },

  autocomplete: {
    variant: VuetifyVariant.OUTLINED,
    density: VuetifyDensity.DEFAULT,
    flat: false,
    rounded: VuetifyRounded.SM,
    color: VuetifyColor.PRIMARY
  },

  combobox: {
    variant: VuetifyVariant.OUTLINED,
    density: VuetifyDensity.DEFAULT,
    flat: false,
    rounded: VuetifyRounded.SM,
    color: VuetifyColor.PRIMARY
  },

  checkbox: {
    density: VuetifyDensity.DEFAULT,
    color: VuetifyColor.PRIMARY
  },

  radio: {
    density: VuetifyDensity.DEFAULT,
    color: VuetifyColor.PRIMARY
  },

  switch: {
    density: VuetifyDensity.DEFAULT,
    color: VuetifyColor.PRIMARY
  },

  fileInput: {
    variant: VuetifyVariant.OUTLINED,
    density: VuetifyDensity.DEFAULT,
    flat: false,
    rounded: VuetifyRounded.SM,
    color: VuetifyColor.PRIMARY
  },

  slider: {
    density: VuetifyDensity.DEFAULT,
    color: VuetifyColor.PRIMARY
  },

  rangeSlider: {
    density: VuetifyDensity.DEFAULT,
    color: VuetifyColor.PRIMARY
  },

  rating: {
    density: VuetifyDensity.DEFAULT,
    color: VuetifyColor.PRIMARY
  },

  otp: {
    variant: VuetifyVariant.OUTLINED,
    density: VuetifyDensity.DEFAULT,
    flat: false,
    rounded: VuetifyRounded.SM,
    color: VuetifyColor.PRIMARY
  },

  datePicker: {
    variant: VuetifyVariant.OUTLINED,
    density: VuetifyDensity.DEFAULT,
    flat: false,
    rounded: VuetifyRounded.SM,
    color: VuetifyColor.PRIMARY
  },

  timePicker: {
    variant: VuetifyVariant.OUTLINED,
    density: VuetifyDensity.DEFAULT,
    flat: false,
    rounded: VuetifyRounded.SM,
    color: VuetifyColor.PRIMARY
  },

  colorPicker: {
    variant: VuetifyVariant.OUTLINED,
    density: VuetifyDensity.DEFAULT,
    flat: false,
    rounded: VuetifyRounded.SM,
    color: VuetifyColor.PRIMARY
  }
};

export function getFormInputStyles<T extends keyof Omit<FormInputsConfig, 'global'>>(
  component: T,
  overrides?: Partial<VuetifyBaseStyles>
): VuetifyBaseStyles {
  const globalStyles = vuetifyFormStylesConfig.global;
  const componentStyles = vuetifyFormStylesConfig[component];

  const mergedStyles = {
    ...globalStyles,
    ...componentStyles
  };

  if (!overrides) {
    return mergedStyles;
  }

  return {
    ...mergedStyles,
    ...overrides
  };
}

export function getGlobalFormStyles(overrides?: Partial<VuetifyBaseStyles>): VuetifyBaseStyles {
  const globalStyles = vuetifyFormStylesConfig.global;

  if (!overrides) {
    return globalStyles;
  }

  return {
    ...globalStyles,
    ...overrides
  };
}

export function updateGlobalFormStyles(newStyles: Partial<VuetifyBaseStyles>): void {
  Object.assign(vuetifyFormStylesConfig.global, newStyles);
}

export function useFormStyles() {
  const getStyles = <T extends keyof Omit<FormInputsConfig, 'global'>>(
    component: T,
    overrides?: Partial<VuetifyBaseStyles>
  ): VuetifyBaseStyles => {
    return getFormInputStyles(component, overrides);
  };

  const getGlobalStyles = (overrides?: Partial<VuetifyBaseStyles>): VuetifyBaseStyles => {
    return getGlobalFormStyles(overrides);
  };

  const updateGlobalStyles = (newStyles: Partial<VuetifyBaseStyles>): void => {
    updateGlobalFormStyles(newStyles);
  };

  return {
    getStyles,
    getGlobalStyles,
    updateGlobalStyles,
    config: vuetifyFormStylesConfig,
    enums: {
      VuetifyVariant,
      VuetifyDensity,
      VuetifyColor,
      VuetifyRounded
    }
  };
}
