import { Component, OnInit } from '@angular/core';
import { PostService } from '../post/post.service';
import { Post } from '../post/post.model';
import { combineLatest, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { PostCreateComponent } from '../post/post-create/post-create.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../auth/user.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{

  authUser: User;
  posts: Post[];

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private dialog: MatDialog
  ) {
    this.authService.user$.subscribe(user=>this.authUser=user);
    this.postService.query$().pipe(
      flatMap(
        posts => combineLatest(...posts.map(post=>of(post).pipe(
          this.postService.attachUser(),
        ))
      ))
    ).subscribe(posts=>this.posts=posts);
  }

  openEditPostModal(post: Post){
    const dialogRef = this.dialog.open(PostCreateComponent, {
      width: '600px',
      data: post
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deletePost(postId: number){
    this.postService.delete(postId);
  }

}
