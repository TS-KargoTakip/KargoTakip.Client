import { ChangeDetectionStrategy, Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { KargoModel } from '../../../models/kargo.model';
import { FormsModule, NgForm } from '@angular/forms';
import BlankComponent from '../../../components/blank/blank.component';
import { BreadcrumbService } from '../../../services/breadcrumb.service';
import { FlexiStepperModule } from 'flexi-stepper';
import { FormValidateDirective } from 'form-validate-angular';
import { NgxMaskDirective } from 'ngx-mask';
import { api } from '../../../constants';
import { HttpClient } from '@angular/common/http';
import { ResultModel } from '../../../models/result.model';
import { FlexiToastService } from 'flexi-toast';
import { Location } from '@angular/common';

@Component({
  imports: [FormsModule, BlankComponent, FlexiStepperModule, FormValidateDirective, NgxMaskDirective],
  templateUrl: './create-kargo.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class CreateKargoComponent {
  data = signal<KargoModel>(new KargoModel());
  loading = signal<boolean>(false);

  #breadcrumb = inject(BreadcrumbService);
  #http = inject(HttpClient);
  #toast = inject(FlexiToastService);
  #location = inject(Location);

  constructor() {
    this.#breadcrumb.reset();
    this.#breadcrumb.add("Kargolar", "/kargolar", "package_2")
    this.#breadcrumb.add("Ekle", "/kargolar/ekle", "add")
  }

  save(form:NgForm){
    if(form.valid){
      const endpoint = `${api}/kargolar`;
      this.loading.set(true);
      this.#http.post<ResultModel<string>>(endpoint, this.data()).subscribe(res => {
        this.#toast.showToast("Başarılı",res.data!,"success");
        this.loading.set(false);
        this.#location.back();
      });
    }else{
      this.#toast.showToast("Uyarı","Zorunlu alanları doldurun","warning");
    }
  }
}
