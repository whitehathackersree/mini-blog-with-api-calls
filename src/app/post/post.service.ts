import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, OperatorFunction } from 'rxjs';
import { Post } from './post.model';
import { StorageService } from '../helpers/storage.service';
import { AuthService } from '../auth/auth.service';
import { flatMap, map, tap } from 'rxjs/operators';
import { UserService } from '../auth/user.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postsSubject: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>(this.storage.get("posts") || []);
  public posts$: Observable<Post[]> = this.postsSubject.asObservable();

  constructor(
    private storage: StorageService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  public get posts(): Post[]{
    return this.postsSubject.value;
  }

  public set posts(posts){
    this.storage.set("posts", posts);
    this.postsSubject.next(posts);
  }

  create$(post: Post): Observable<Post>{
    let user = this.authService.userValue;
    post.user = user.id;
    post.id = this.posts.length+1;
    post.created_at = new Date();
    this.posts = [post, ...this.posts];
    return of(post)
  }

  update$(post: Post): Observable<Post>{
    let posts = [...this.posts];
    let post_ = posts.filter(p=>p.id==post.id)[0];
    post = Object.assign(post_, post);
    this.posts = [post, ...this.posts.filter(p=>p.id!=post.id)];
    return of(post)
  }


  get$(id: number): Observable<Post>{
    let postq = this.posts.filter(p=>id==p.id);
    return postq?of(postq[0]):of(null);
  }

  query$(): Observable<Post[]>{
    return this.posts$
  }

  delete(postId: number){
    this.posts = [...this.posts.filter(p=>p.id!=postId)];
  }

  attachUser = (): OperatorFunction<Post, Post> => {
    let post_:Post;
    return input$ => input$.pipe(
      tap(post=>post_=Object.assign({}, post)),
      flatMap((post: Post)=>this.userService.get$(post.user).pipe(
          map(user=>{
            post_.user = user;
            return post_;
          })
        )
      )
    );
  }
}
