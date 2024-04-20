import { CanActivateFn } from '@angular/router';

export const deactiveGuard: CanActivateFn = (route, state) => {
  return true;
};
