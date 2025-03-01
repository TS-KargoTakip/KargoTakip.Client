import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal, resource, signal, ViewEncapsulation } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { FlexiSelectModule } from 'flexi-select';
import { CityModel, TownModel } from '../../../models/citiy.model';

@Component({
  imports: [
    FormsModule,
    BlankComponent,
    FlexiStepperModule,
    FormValidateDirective,
    NgxMaskDirective,
    FlexiSelectModule
  ],
  templateUrl: './create-kargo.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class CreateKargoComponent {
  readonly id = signal<string>("");
  readonly pageTitle = computed(() => this.id() ? "Kargo Güncelle" : "Kargo Ekle")
  readonly result = resource({
    request: () => this.id(),
    loader: async({request}) => {
      if(this.id()){
        const res = await lastValueFrom(this.#http.get<ResultModel<KargoModel>>(`${api}/kargolar/${this.id()}`));
        return res.data!;
      }

      return undefined;
    }
  });
  readonly data = linkedSignal(() => this.result?.value() ?? new KargoModel());
  readonly loading = linkedSignal(() => this.result?.isLoading() ?? false);
  readonly cities = signal<CityModel[]>([]);
  readonly towns = signal<TownModel[]>([]);

  readonly #breadcrumb = inject(BreadcrumbService);
  readonly #http = inject(HttpClient);
  readonly #toast = inject(FlexiToastService);
  readonly #location = inject(Location);
  readonly #activated = inject(ActivatedRoute);

  constructor() {
    this.getCities();
    this.#breadcrumb.reset();
    this.#breadcrumb.add("Kargolar", "/kargolar", "package_2");

    this.#activated.params.subscribe(res => {
      if(res["id"]){
        this.id.set(res["id"]);
        this.#breadcrumb.add(this.id(), `/kargolar/edit/${this.id()}`, "edit")
      }else{
        this.#breadcrumb.add("Ekle", "/kargolar/create", "add")
      }
    })
  }

  getCities(){
    this.#http.get<any[]>("/il-ilce.json").subscribe(res => {
      this.cities.set(res);
    });
  }

  save(form:NgForm){
    if(form.valid){
      const endpoint = `${api}/kargolar`;
      this.loading.set(true);

      if(this.id()){
        this.#http.put<ResultModel<string>>(endpoint, this.data()).subscribe(res => {
          this.#toast.showToast("Başarılı",res.data!,"info");
          this.loading.set(false);
          this.#location.back();
        });
      }else{
        this.#http.post<ResultModel<string>>(endpoint, this.data()).subscribe(res => {
          this.#toast.showToast("Başarılı",res.data!,"success");
          this.loading.set(false);
          this.#location.back();
        });
      }
    }else{
      this.#toast.showToast("Uyarı","Zorunlu alanları doldurun","warning");
    }
  }

  getTowns(event:any){
    const town = this.cities().find(p => p.il_adi === event);
    if(town !== undefined){
      this.towns.set(town.ilceler)
    }
  }
}
