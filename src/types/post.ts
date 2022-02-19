import { User } from "./user";

export type Post = {
  id: number;
  content: string;
  emotion: string;
  createdAt: Date;
  updatedAt: Date;
  user: Pick<User, "id" | "name" | "email">;
};
