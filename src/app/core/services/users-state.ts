import { computed, Injectable, signal } from '@angular/core';
import { UserParams } from '../types/user-params.types';

@Injectable({
  providedIn: 'root'
})
export class UsersState {
  private _usersState = signal<Array<UserParams>>([]);
  private _rawSearch = signal<string>('');
  private _rawStatus = signal<string>('all');
  private _debouncedSearch = signal<string>('');
  private _debouncedStatus = signal<string>('all');

  public filteredUsers = computed(() => {
    const users = this._usersState();
    const search = this._debouncedSearch();
    const status = this._debouncedStatus();

    return users
      .filter(user => status === 'all' ||
        (status === 'active' && user.active) ||
        (status === 'inactive' && !user.active))
      .filter(user => !search || user.name.toLowerCase().includes(search.toLowerCase()));
  });

  public setUsersState(usersState: Array<UserParams>): void {
    this._usersState.set(usersState);
  }

  public setSearchFilter(searchValue: string): void {
    this._rawSearch.set(searchValue);
  }

  public setStatusFilter(statusValue: string): void {
    this._rawStatus.set(statusValue);
  }

  public getRawSearch(): string {
    return this._rawSearch();
  }

  public getRawStatus(): string {
    return this._rawStatus();
  }

  public setDebouncedSearch(searchValue: string): void {
    this._debouncedSearch.set(searchValue);
  }

  public setDebouncedStatus(statusValue: string): void {
    this._debouncedStatus.set(statusValue);
  }
}
