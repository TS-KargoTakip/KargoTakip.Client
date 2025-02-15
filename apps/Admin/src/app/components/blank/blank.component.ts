import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: "app-blank",
  imports: [],
  templateUrl: './blank.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class BlankComponent {
  readonly pageTitle = input.required<string>();
}
