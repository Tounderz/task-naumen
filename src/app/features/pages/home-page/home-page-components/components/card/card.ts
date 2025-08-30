import {Component, inject, Input} from '@angular/core';
import {UserParams} from '../../../../../../core/types/user-params.types';
import {defaultUserParams} from '../../../configs/default-user-params';
import {ToasterState} from '../../../../../../core/services/toaster-state';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card {
  @Input({ required: true }) user: UserParams = defaultUserParams;

  private toasterState: ToasterState = inject(ToasterState);

  public showEmail = false;

  public handleClickBtn(): void {
    if (!this.user.email) {
      this.toasterState.showToast({
        type: 'error',
        message: 'У данного пользователя нет email!',
        duration: 5000
      });

      return;
    }

    this.showEmail = !this.showEmail;
  }

  public getUserEmail(): string {
    return this.user.email || 'Нет';
  }

  public getButtonLabel(): string {
    return this.showEmail ? 'Скрыть email' : 'Получить email';
  }
}
