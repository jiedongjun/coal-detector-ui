import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, of, switchMap} from 'rxjs';
import {KeyService} from "../service/key.service";
import {DialogService} from "ng-devui";

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {

  config = {
    id: 'dialog-service',
    width: '346px',
    maxHeight: '600px',
    zIndex: 1050,
    backdropCloseable: true,
    html: true,
  };

  constructor(private keyService: KeyService, private dialogService: DialogService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.url.includes('/key/auth')){
      return next.handle(request);
    }
    return this.keyService.auth().pipe(
      switchMap((res: any) => {
        if ((res && res.valid)) {
          this.keyService._auth = res.auth;
          return next.handle(request);
        } else {
          this.openDialog('warning', '有效期已过,请联系管理员!');
          return of();
        }
      })
    );;
  }

  openDialog(dialogType: string, message: string) {
    const results = this.dialogService.open({
      ...this.config,
      dialogtype: dialogType,
      content: message,
      buttons: [
        {
          cssClass: 'primary',
          text: '关闭',
          handler: ($event: Event) => {
            results.modalInstance.hide();
          },
        },
      ],
    });
  }
}
