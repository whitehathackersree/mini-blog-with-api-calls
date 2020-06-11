import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root"
})
export class StorageService{
  constructor(){

  }

  set(name: string, value: any) {
    localStorage.setItem(name, JSON.stringify(value))
  }

  get(name, exact: boolean=false) {
    return JSON.parse(localStorage.getItem(name))
  }

  remove(name) {
      localStorage.removeItem(name)
  }

  removeAll() {
    window.localStorage.clear();
  }
}
