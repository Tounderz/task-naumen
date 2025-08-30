import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button-component',
  imports: [],
  templateUrl: './button-component.html',
  styleUrl: './button-component.scss'
})
export class ButtonComponent {
  @Input() label?: string = 'Нажми меня';
  @Output() handleClickBtn: EventEmitter<void> = new EventEmitter<void>();

  public handleClick(): void {
    this.handleClickBtn.emit();
  }
}
