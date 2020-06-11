import { Resource } from "../resource.model";

export class Post extends Resource{
  user: any;
  title: string;
  body: string;
  created_at: Date;
}
