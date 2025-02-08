import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, resource, signal, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ODataModel } from '../../models/odata.model';
import { FlexiGridModule, FlexiGridService, StateModel } from 'flexi-grid';

@Component({
  imports: [RouterLink, FlexiGridModule],
  templateUrl: './kargolar.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class KargolarComponent {
  token = signal<string>("eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjI1MGIwNjY0LTE3YzEtNGEyMS05NzZlLTc5NTUxNWM3ZDViMSIsIm5iZiI6MTczOTA0MzQ4MiwiZXhwIjoxNzM5MTI5ODgyLCJpc3MiOiJUYW5lciBTYXlkYW0iLCJhdWQiOiJUYW5lciBTYXlkYW0ifQ.qcRhf_69mRIqOzs6FOTN5uefvxSmlZ6oJtFdRmj-QMJZiv1tTu2u-_Bw3AHyGNgl_tWzOycdT9z_RuNPX90LLA");
  result = resource({
    request: () => this.state(),
    loader:async ()=> {
      let endpoint = "https://localhost:7213/odata/kargolar?$count=true";
      const odataEndpoint = this.#grid.getODataEndpoint(this.state());
      endpoint += "&" + odataEndpoint;
      var res = await lastValueFrom(this.#http.get<ODataModel<any[]>>(endpoint,{
        headers: {"Authorization":"bearer " + this.token()}
      }));

      return res;
    }
  });
  data = computed(() => this.result.value()?.value);
  total = computed(() => this.result.value()?.['@odata.count']);
  loading = computed(() => this.result.isLoading());
  state = signal<StateModel>(new StateModel());

  #http = inject(HttpClient);
  #grid = inject(FlexiGridService);

  dataStateChange(event: StateModel){
    this.state.set(event);    
  }
}
