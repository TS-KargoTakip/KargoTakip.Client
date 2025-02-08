import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  imports: [],
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HomeComponent {

}
