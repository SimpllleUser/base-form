import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import { theme } from './theme';

export const vuetify = createVuetify({
  components,
  directives,
  theme,
});
