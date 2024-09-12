import { createVuetify } from 'vuetify';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import { theme } from './theme';

export const vuetify = createVuetify({
  components,
  directives,
  theme,
});
