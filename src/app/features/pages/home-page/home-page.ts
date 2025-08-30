import {
  Component,
  effect,
  EffectRef,
  inject,
  Injector, OnDestroy,
  OnInit,
  runInInjectionContext
} from '@angular/core';
import { users } from './mocks/users-mock';
import { HomePageComponentsModule } from './home-page-components/home-page-components-module';
import { InputComponent } from '../../../shared/components/ui/input-component/input-component';
import { UsersState } from '../../../core/services/users-state';
import { SelectComponent } from '../../../shared/components/ui/select-component/select-component';
import { filterOptions } from './configs/filter-data';
import { SelectData } from '../../../core/types/select.types';
import {ToasterState} from '../../../core/services/toaster-state';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HomePageComponentsModule,
    InputComponent,
    SelectComponent
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage implements OnInit, OnDestroy {
  private usersState: UsersState = inject(UsersState);
  private injector: Injector = inject(Injector);
  private toasterState: ToasterState = inject(ToasterState);
  private searchEffectRef: EffectRef | null = null;
  private statusEffectRef: EffectRef | null = null;
  private toastEffectRef: EffectRef | null = null;

  public readonly filterOptions = filterOptions;
  public filteredUsers = this.usersState.filteredUsers;

  public ngOnInit(): void {
    this.usersState.setUsersState(users);
    this.initializeEffects();
  }

  public ngOnDestroy(): void {
    this.searchEffectRef?.destroy();
    this.statusEffectRef?.destroy();
    this.toastEffectRef?.destroy();
  }

  public handleChangeFilter(option: SelectData): void {
    this.usersState.setStatusFilter(option.value);
  }

  public handleChangeSearch(searchValue: string): void {
    this.usersState.setSearchFilter(searchValue);
  }

  private initializeEffects(): void {
    this.initializeSearchEffect();
    this.initializeStatusEffect();
    this.initializeToastEffect();
  }

  private initializeSearchEffect(): void {
    this.searchEffectRef = runInInjectionContext(this.injector, () => {
      return effect(() => {
        const searchValue = this.usersState.getRawSearch();
        const timeout = setTimeout(() => {
          this.usersState.setDebouncedSearch(searchValue);
        }, 300);
        return () => clearTimeout(timeout);
      });
    });
  }

  private initializeStatusEffect(): void {
    this.statusEffectRef = runInInjectionContext(this.injector, () => {
      return effect(() => {
        const statusValue = this.usersState.getRawStatus();
        const timeout = setTimeout(() => {
          this.usersState.setDebouncedStatus(statusValue);
        }, 300);
        return () => clearTimeout(timeout);
      });
    });
  }

  private initializeToastEffect(): void {
    this.toastEffectRef = runInInjectionContext(this.injector, () => {
      return effect(() => {
        const users = this.filteredUsers();
        if (users.length === 0) {
          this.toasterState.showToast({
            type: 'error',
            message: 'По данным критериям пользователи не найдены',
            duration: 5000
          });
        }
      });
    });
  }
}
