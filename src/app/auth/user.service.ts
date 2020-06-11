import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { StorageService } from '../helpers/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.storage.get("users") || []);
  public users$: Observable<User[]> = this.usersSubject.asObservable();

  constructor(
    private storage: StorageService
  ) { }

  public get users(): User[]{
    return this.usersSubject.value;
  }

  public set users(users){
    this.storage.set("users", users);
    this.usersSubject.next(users);
  }

  create$(user: User): Observable<User>{
    return this.query$().pipe(
      map(users=>{
        if(this.users.filter(u=>u.email==user.email).length>0){
          throw new Error("User with that email address already exists.");
        }else{
          user.id = this.users.length+1;
          users = [...this.users, user]
        }
        this.users = users;
        return user;
      })
    );
  }

  get$(id: number): Observable<User>{
    let userq = this.users.filter(u=>id==u.id);
    return userq?of(userq[0]):of(null);
  }

  query$(): Observable<User[]>{
    return of(this.users)
  }

}
