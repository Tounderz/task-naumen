import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToasterState} from '../../../../core/services/toaster-state';

@Component({
  selector: 'app-toaster-component',
  imports: [
    CommonModule
  ],
  templateUrl: './toaster-component.html',
  styleUrl: './toaster-component.scss'
})
export class ToasterComponent {
  public toasterState: ToasterState = inject(ToasterState);

  public handleClose(): void {
    this.toasterState.hideToast();
  }
}
