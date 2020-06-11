import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { PostCreateComponent } from './post/post-create/post-create.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mini-blog';

  constructor(
    private authService: AuthService,
    private dialog: MatDialog
    ){

  }

  openCreatePostModal(){
    const dialogRef = this.dialog.open(PostCreateComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logout(){
    this.authService.logout();
  }
}
