import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FlexiButtonComponent } from 'flexi-button';
import { api } from '../../constants';
import { ResultModel } from '../../models/result.model';
import { FlexiToastService } from 'flexi-toast';
import { lastValueFrom } from 'rxjs';

@Component({
  imports: [RouterLink, FormsModule, FlexiButtonComponent],
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LoginComponent {
  readonly request = signal<{userNameOrEmail: string, password: string}>({userNameOrEmail: "", password: ""});
  readonly loading = signal<boolean>(false);

  readonly #http = inject(HttpClient);
  readonly #router = inject(Router);
  readonly #toast = inject(FlexiToastService);

  async login(){
    if(!this.loading()){
      this.loading.set(true);
      const res = await lastValueFrom(this.#http.post<ResultModel<any>>(`${api}/auth/login`,this.request()));
      this.loading.set(false);
      localStorage.setItem("accessToken", res.data!.accessToken);
      this.#router.navigateByUrl("/");

      // this.loading.set(false);
      //   this.#toast.showToast("Hata!","Giriş bilgileri hatalı","error");
    }
  }
}
