import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-input-component',
  imports: [],
  templateUrl: './input-component.html',
  styleUrl: './input-component.scss'
})
export class InputComponent {
  @Input() label?: string;
  @Output() handleChangeInput: EventEmitter<string> = new EventEmitter<string>();

  public handleChange(event: Event): void {
    const value: string = (event.target as HTMLInputElement).value;
    this.handleChangeInput.emit(value);
  }
}
