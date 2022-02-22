import { Like } from "./like";
import { User } from "./user";

export type Post = {
  id: number;
  content: string;
  emotion: string;
  createdAt: string;
  updatedAt: Date;
  user: Pick<User, "id" | "name" | "email">;
  likes: Like[];
};
