import {ChangeDetectorRef, Component, EventEmitter, inject, Input, Output, signal} from '@angular/core';
import {SelectData} from '../../../../core/types/select.types';
import {FormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-select-component',
  standalone: true,
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './select-component.html',
  styleUrl: './select-component.scss'
})
export class SelectComponent {
  @Input() label: string = '';
  @Input() options: Array<SelectData> = [];
  @Input() selectedValue: string = '';
  @Output() valueChange: EventEmitter<SelectData> = new EventEmitter<SelectData>();

  private cd: ChangeDetectorRef = inject(ChangeDetectorRef);

  public showOptions = signal(false);
  public searchTerm: string = '';

  public handleInputChange(value: string): void {
    this.searchTerm = value;
  }

  public getOptions(): Array<SelectData> {
    if (!this.searchTerm) { return this.options; }

    const filtered = this.options.filter((option: SelectData) => {
      return option.displayValue.toLowerCase().includes(this.searchTerm.toLowerCase());
    });

    if (!filtered.length) {
      setTimeout(() => {
        this.selectedValue = '';
        this.searchTerm = '';
        this.cd.markForCheck();
      });

      return this.options;
    }

    return filtered;
  }

  public selectOption(option: SelectData): void {
    this.selectedValue = option.displayValue;
    this.valueChange.emit(option);
    this.closeOptions();
  }

  public onBlur(): void {
    this.closeOptions();
  }

  public toggleOptions(): void {
    this.showOptions.update(show => !show);
  }

  private closeOptions(): void {
    this.showOptions.set(false);
  }
}
