import { User } from "./user";

export interface Users {
  items: User[];
  total_count: number;
  incomplete_results: boolean;
}
