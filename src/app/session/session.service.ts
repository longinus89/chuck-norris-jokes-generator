import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

@Injectable()
export class SessionService {

  private id: string;
  private prefix = 'ChuckNorrisJokesGenerator';
  private _userName: string;
  private _favoriteIds: string;

  get userName(): string {
    return this._userName;
  }

  set userName(userName) {
    this._userName = userName;
  }

  get favoritesIds(): number[] {
    return (!this._favoriteIds) ? [] : <number[]> this._favoriteIds.split(',').map(entry => parseInt(entry, 10));
  }

  set favoritesIds(list: number[]) {
    this._favoriteIds = list.join(',');
    this.store();
  }

  isActive(): boolean {
    return [null, undefined, 'null'].indexOf(this.id) === -1;
  }

  create(userName: string): void {
    this.id = uuid();
    this.userName = userName;
    this.favoritesIds = [];
    this.store();
  }

  destroy(): void {
    this.id = null;
    this.userName = null;
    this.store();
  }

  private store(): void {
    localStorage.setItem(this.prefix + 'Id', this.id);
    localStorage.setItem(this.prefix + 'UserName', this.userName);
    localStorage.setItem(this.prefix + 'FavoritesIds', this._favoriteIds);
  }

  load(): void {
    this.id = localStorage.getItem(this.prefix + 'Id');
    this.userName = localStorage.getItem(this.prefix + 'UserName');
    this._favoriteIds = localStorage.getItem(this.prefix + 'FavoritesIds');
  }
}
