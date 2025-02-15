import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjI1MGIwNjY0LTE3YzEtNGEyMS05NzZlLTc5NTUxNWM3ZDViMSIsIm5iZiI6MTczOTY0NDU3NSwiZXhwIjoxNzQyMDYzNzc1LCJpc3MiOiJUYW5lciBTYXlkYW0iLCJhdWQiOiJUYW5lciBTYXlkYW0ifQ.AYcFX-YQppVOOGni7KiKlfj-nRAVK9D69oXbmXAWswKy4ODuBurRD-yJwopXgxTluOK9yC2SqN-GCT2jrmOgiA";

  const cloneReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  })
  return next(cloneReq);
};
