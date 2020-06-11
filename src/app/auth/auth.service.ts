import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { User } from './user.model';
import { UserService } from './user.service';
import { StorageService } from '../helpers/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public user$: Observable<User> = this.userSubject.asObservable();

  constructor(
    private router: Router,
    private storage: StorageService,
    private userService: UserService
  ) {
    this.userSubject.next(new User(this.storage.get('user')));
  }

  public get userValue(): User{
    return this.userSubject.value;
  }

  public set userValue(user){
    if(user)user = new User(user);
    this.storage.set("user", user);
    this.userSubject.next(user);
  }

  public get userIsAuthenticated$(): Observable<boolean>{
    return this.user$.pipe(
      map(user=>{
        return !!user.id
      })
    )
  }

  register$(obj: User): Observable<User>{
    return this.userService.create$(obj)
  }

  loginWithEmailPassword$(obj: {email: string, password: string}): Observable<User>{

    if(obj.email === undefined){
      throw new Error("Missing parameter: Email");
    }
    if(obj.password === undefined){
      throw new Error("Missing parameter: Password");
    }

    return this.userService.query$().pipe(
      map(users=>{
        let userq = users.filter(u=>u.email==obj.email).filter(u=>u.password==obj.password);
        return userq?userq[0]:null;
      }),
      tap(user=>{
        if(user){
          this.userValue = user;
        }else{
          throw new Error('Invalid Credentials');
        }
      })
    )
  }

  logout(){
    this.storage.remove("user");
    this.userSubject.next(null);
    location.reload();
  }

}
