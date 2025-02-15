import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal, resource, signal, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ODataModel } from '../../models/odata.model';
import { FlexiGridFilterDataModel, FlexiGridModule, FlexiGridService, StateModel } from 'flexi-grid';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { BreadCrumbModel } from '../../models/breadcrumb.model';
import BlankComponent from '../../components/blank/blank.component';
import { api } from '../../constants';
import { KargoModel } from '../../models/kargo.model';
import { FlexiToastService } from 'flexi-toast';
import { ResultModel } from '../../models/result.model';
import { CommonModule } from '@angular/common';

@Component({
  imports: [RouterLink, FlexiGridModule, BlankComponent, CommonModule],
  templateUrl: './kargolar.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class KargolarComponent {  
  result = resource({
    request: () => this.state(),
    loader:async ()=> {
      let endpoint = `${api}/odata/kargolar?$count=true`;
      const odataEndpoint = this.#grid.getODataEndpoint(this.state());
      endpoint += "&" + odataEndpoint;
      var res = await lastValueFrom(this.#http.get<ODataModel<any[]>>(endpoint));

      return res;
    }
  });
  readonly data = computed(() => this.result.value()?.value ?? []);
  readonly total = computed(() => this.result.value()?.['@odata.count'] ?? 0);
  readonly loading = linkedSignal(() => this.result.isLoading());
  readonly state = signal<StateModel>(new StateModel());
  readonly durumFilterData = signal<FlexiGridFilterDataModel[]>([
    {
      name: "Bekliyor",
      value: 0
    },
    {
      name: "Araca Teslim Edildi",
      value: 1
    }
  ])

  #http = inject(HttpClient);
  #grid = inject(FlexiGridService);
  #breadcrumb = inject(BreadcrumbService);  
  #toast = inject(FlexiToastService);

  constructor(){
    this.#breadcrumb.reset();
    this.#breadcrumb.add("Kargolar", "/kargolar",  "package_2")
  }

  dataStateChange(event: StateModel){
    this.state.set(event);    
  }

  async exportExcel(){
    let endpoint = `${api}/odata/kargolar?$count=true`;
    var res = await lastValueFrom(this.#http.get<ODataModel<any[]>>(endpoint));
    this.#grid.exportDataToExcel(res.value, "Kargo Listesi");
  }

  delete(item: KargoModel){
    const endpoint = `${api}/kargolar/${item.id}`;
    this.#toast.showSwal("Kargoyu Sil?",`Aşağıdaki bilgilere ait kargoyu silmek istiyor musunuz?<br/><b>Gönderen:</b> ${item.gonderenFullName}<br/><b>Alıcı:</b> ${item.aliciFullName}`,()=> {
      this.loading.set(true);
      this.#http.delete<ResultModel<string>>(endpoint).subscribe(res => {
        this.#toast.showToast("Bilgilendirme",res.data!,"info");
        this.result.reload();
      });
    })
  }

  getDurumClass(durum: string){
    if(durum === "Bekliyor"){
      return "alert-warning"
    }

    return "";
  }
}
