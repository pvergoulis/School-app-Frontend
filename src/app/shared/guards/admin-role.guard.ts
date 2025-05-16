import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const adminRoleGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService)
  const router = inject(Router)


  const userRoles = userService.user$()?.roles
  const hasPermision = userRoles?.includes('ADMIN')
  console.log('Admin role guard', userRoles, hasPermision)
  
  if(userService.user$() && hasPermision){
    return true;
  } 

  return router.navigate(['no-permision'])

};
