import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

/**
 * appConfig
 */
export const appConfig: ApplicationConfig = {
  /**
   * providers
   */
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
