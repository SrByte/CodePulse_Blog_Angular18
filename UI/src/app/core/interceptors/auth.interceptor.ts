import { HttpInterceptorFn } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const cookieService = inject(CookieService);

  const shouldInterceptRequest = req.urlWithParams.indexOf('addAuth=true', 0) > -1 ? true : false;

  if (shouldInterceptRequest) {
    const authToken = cookieService.get("Authorization");

    const authReq = req.clone({
      setHeaders: {
        'Authorization': authToken
      }
    });

    // Pass the cloned request with the updated header to the next handler
    return next(authReq);
  }
  return next(req);
};
