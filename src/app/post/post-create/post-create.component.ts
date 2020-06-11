import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  form: FormGroup = this.fb.group({
    title: [null, Validators.required],
    body: [null, Validators.required]
  });

  post: Post;

  constructor(
    public dialogRef: MatDialogRef<PostCreateComponent>,
    private fb: FormBuilder,
    private postService: PostService,
    @Inject(MAT_DIALOG_DATA) data: Post
  ) {
    this.post = data;
  }

  ngOnInit(): void {
    if(this.post){
      this.form.controls.title.setValue(this.post.title);
      this.form.controls.body.setValue(this.post.body);
    }
  }

  submit(){
    this.postService.create$(this.form.value).subscribe(r=>{
      this.dialogRef.close(r);
    })
  }

  update(){
    let payload = this.form.value;
    payload.id = this.post.id;
    this.postService.update$(<Post>payload).subscribe(r=>{
      this.dialogRef.close(r);
    })
  }

}
