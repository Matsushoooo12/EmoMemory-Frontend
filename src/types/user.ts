import { Post } from "./post";

export type User = {
  id: number;
  name: string;
  email: string;
  emotion: string;
  password: string;
  passwordConfirmation: string;
  posts: Pick<Post, "id" | "content" | "emotion" | "likes" | "createdAt">;
  likes: number;
};
