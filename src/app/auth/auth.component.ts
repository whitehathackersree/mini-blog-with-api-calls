import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit{

  form: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required],
  });
  errorMsg: string;

  signIn: boolean = true;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.route.queryParamMap.pipe(
      map(paramMap=>paramMap["params"]['signUp']),
      tap(_=>this.signIn=!_)
    ).subscribe(r=>{
      if(!this.signIn){
        this.form.addControl('username', new FormControl(null, Validators.required))
      }else{
        this.form.removeControl('username')
      };
    })
  }

  ngOnInit(){

  }

  login(){
    this.authService.loginWithEmailPassword$(this.form.value).subscribe(result=>{
      console.log(result)
      if(result)this.router.navigate(['/']);
    }, err=>{
      this.errorMsg = err.message;
    })
  }

  register(){
    this.authService.register$(this.form.value).subscribe(result=>{
      if(result){
        this.login();
      }
    }, err=>{
      this.errorMsg = err.message;
    })
  }

}
